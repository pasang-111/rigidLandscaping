"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Soft Disney-title treatment — warm light sweep.
 * VFX attaches only after hydration to avoid mismatch.
 */
const SHADER = `
precision highp float;
uniform vec2 resolution;
uniform vec2 offset;
uniform float time;
uniform sampler2D src;
uniform float energy;

float inside(vec2 uv) {
  float ax = 1.0 - smoothstep(0.48, 0.52, abs(uv.x - 0.5));
  float ay = 1.0 - smoothstep(0.48, 0.52, abs(uv.y - 0.5));
  return ax * ay;
}

vec4 readTex(vec2 uv) {
  return texture2D(src, uv) * inside(uv);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;
  float floatY = sin(time * 0.9 + uv.x * 3.0) * 0.006 * energy;
  vec4 base = readTex(uv + vec2(0.0, floatY));
  float sweep = uv.x + uv.y * 0.15 - fract(time * 0.12);
  float band = smoothstep(0.0, 0.08, sweep) * smoothstep(0.22, 0.08, sweep);
  band *= energy;
  vec3 gold = vec3(1.0, 0.92, 0.55);
  vec3 col = base.rgb + gold * band * 0.55 * base.a;
  col = mix(col, col * vec3(1.05, 1.0, 0.92), 0.25 * energy);
  gl_FragColor = vec4(col, base.a);
}
`;

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
};

export default function VFXMotto({ children, className = "", as = "h1" }: Props) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>(null);
  const startRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let vfxInstance: { remove: (e: HTMLElement) => void } | null = null;
    startRef.current = performance.now();

    // Defer one frame past hydration
    const id = requestAnimationFrame(async () => {
      try {
        const { VFX } = await import("@vfx-js/core");
        if (disposed || !ref.current) return;
        const vfx = new VFX();
        vfxInstance = vfx;
        vfx.add(ref.current, {
          shader: SHADER,
          overflow: 40,
          uniforms: {
            energy: () => {
              const t = (performance.now() - startRef.current) / 1000;
              if (t < 0.8) return t / 0.8;
              return 0.65 + 0.15 * Math.sin(t * 0.5);
            },
          },
        });
      } catch {
        /* plain text */
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(id);
      try {
        if (vfxInstance && el) vfxInstance.remove(el as HTMLElement);
      } catch {
        /* noop */
      }
    };
  }, [mounted]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
