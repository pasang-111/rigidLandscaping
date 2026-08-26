"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight WebGL fluid-style distortion overlay.
 * Soft noise warp — luxury atmosphere, not a heavy simulation.
 * Respects prefers-reduced-motion and falls back silently.
 */
export default function FluidDistort({ intensity = 0.018 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = `
      attribute vec2 a;
      void main(){ gl_Position = vec4(a, 0.0, 1.0); }
    `;
    const fs = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uRes;
      uniform float uIntensity;
      // Simple value noise
      float hash(vec2 p){
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f*f*(3.0-2.0*f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        for(int i=0;i<4;i++){
          v += a * noise(p);
          p *= 2.05;
          a *= 0.5;
        }
        return v;
      }
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        // Gentle fluid-like displacement field
        float t = uTime * 0.08;
        vec2 q = vec2(
          fbm(uv * 2.2 + vec2(t, t * 0.7)),
          fbm(uv * 2.2 + vec2(-t * 0.6, t * 0.9))
        );
        float n = fbm(uv * 3.0 + q * 1.4 + t * 0.3);
        // Soft vignette + warm gold tint at low alpha
        float vig = smoothstep(1.15, 0.35, length(uv - 0.5));
        float a = n * uIntensity * vig;
        // Gold-ish highlight streaks
        vec3 col = mix(vec3(0.05, 0.12, 0.1), vec3(0.94, 0.82, 0.39), n);
        gl_FragColor = vec4(col, a * 0.55);
      }
    `;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uIntensity = gl.getUniformLocation(prog, "uIntensity");

    let raf = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform1f(uIntensity, intensity);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-80"
    />
  );
}
