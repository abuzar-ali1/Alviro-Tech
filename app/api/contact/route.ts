import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const maxDuration = 60;

const RECIPIENT = "scale@alvirotech.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

const clean = (value: unknown, maximum: number) =>
  typeof value === "string" ? value.trim().slice(0, maximum) : "";

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);

const isRateLimited = (key: string) => {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return true;
  recent.push(now);
  requestLog.set(key, recent);
  return false;
};

export async function POST(request: Request) {
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return NextResponse.json({ error: "Please submit the contact form." }, { status: 415 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(payload.website, 100)) return NextResponse.json({ ok: true });

  const name = clean(payload.name, 80);
  const email = clean(payload.email, 160).toLowerCase();
  const message = clean(payload.message, 4000);

  if (name.length < 2 || !EMAIL_PATTERN.test(email) || message.length < 20) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email, and at least 20 characters about the project." },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT?.trim() || "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || user;

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !pass || !from) {
    console.error("Contact API has missing or invalid SMTP configuration.", {
      hostConfigured: Boolean(host),
      portValid: Number.isInteger(port) && port >= 1 && port <= 65535,
      userConfigured: Boolean(user),
      passwordConfigured: Boolean(pass),
      fromConfigured: Boolean(from),
    });
    return NextResponse.json(
      { error: "Email delivery is being configured. Please contact us directly at scale@alvirotech.com." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    name: "alvirotech.com",
    auth: { user, pass },
    // Fail within the function's execution budget if the mail server is unreachable.
    dnsTimeout: 5_000,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  const startedAt = Date.now();
  try {
    await transporter.sendMail({
      from: `Alviro Tech Website <${from}>`,
      to: RECIPIENT,
      replyTo: `${name} <${email}>`,
      subject: `New growth inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;padding:32px;background:#0d1117;color:#f8f8f3;border-radius:20px"><p style="color:#63e6ff;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Alviro Tech website inquiry</p><h1 style="font-size:30px;margin:16px 0">New growth inquiry</h1><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> <a style="color:#c8ff5a" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p><div style="margin-top:24px;padding:20px;background:#111820;border:1px solid rgba(255,255,255,.1);border-radius:14px;white-space:pre-wrap;line-height:1.65">${escapeHtml(message)}</div></div>`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const smtpError = error as {
      code?: string;
      command?: string;
      responseCode?: number;
      message?: string;
    } | null;
    console.error("Contact email delivery failed:", {
      host,
      port,
      secure: port === 465,
      elapsedMs: Date.now() - startedAt,
      code: smtpError?.code,
      command: smtpError?.command,
      responseCode: smtpError?.responseCode,
      message: smtpError?.message,
    });
    return NextResponse.json(
      { error: "We could not send your message right now. Please email scale@alvirotech.com directly." },
      { status: 502 },
    );
  }
}
