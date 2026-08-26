import * as React from "react";

type ContactEmailProps = {
  name: string;
  email: string;
  phone: string;
  address?: string;
  projectType: string;
  budget: string;
  message: string;
};

/** Plain HTML email body — no @react-email dependency */
export default function ContactEmail(props: ContactEmailProps) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#16302A", lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 20 }}>New enquiry — Rigid Landscaping</h1>
      <p>
        <strong>Name:</strong> {props.name}
        <br />
        <strong>Email:</strong> {props.email}
        <br />
        <strong>Phone:</strong> {props.phone}
        <br />
        {props.address ? (
          <>
            <strong>Address:</strong> {props.address}
            <br />
          </>
        ) : null}
        <strong>Project:</strong> {props.projectType}
        <br />
        <strong>Budget:</strong> {props.budget}
      </p>
      <p>
        <strong>Message</strong>
        <br />
        {props.message}
      </p>
    </div>
  );
}

export function ContactAutoReplyEmail({ name }: { name: string }) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#16302A", lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 20 }}>Thanks, {name}</h1>
      <p>
        We received your enquiry and will be in touch shortly.
        <br />— Rigid Landscaping
      </p>
    </div>
  );
}
