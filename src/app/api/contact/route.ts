import { profile } from "@/data/profile";
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = (body ?? {}) as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    message.trim().length < 10
  ) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields." }, { status: 400 });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO || profile.email;
  // onboarding@resend.dev works without verifying a custom domain, but Resend
  // will only deliver it to the email address on the Resend account itself.
  // Once a real domain is verified, set CONTACT_EMAIL_FROM to an address on it.
  const from = process.env.CONTACT_EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Contact form is not configured yet (missing RESEND_API_KEY)." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio contact: ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
