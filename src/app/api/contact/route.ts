import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Resend } from "resend";

// Runs on the Cloudflare Worker runtime via OpenNext.
export const runtime = "nodejs";
// Never prerender — this route reads request body + secrets at request time.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  message?: string;
};

// Resend requires a `from` on a verified domain. Until a custom domain is
// verified in Resend, `onboarding@resend.dev` works out of the box. Override
// via the CONTACT_FROM_EMAIL env var once a domain is set up.
const DEFAULT_FROM = "Huddle <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // In the Worker runtime secrets live on the Cloudflare env; under `next dev`
  // they come from `.env`/`process.env`. Read env first, fall back to process.
  const { env } = getCloudflareContext();
  const RESEND_API_KEY = env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
  const CONTACT_EMAIL = env.CONTACT_EMAIL ?? process.env.CONTACT_EMAIL;
  const FROM_EMAIL =
    env.CONTACT_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM;

  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_EMAIL is not set.");
    return Response.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const role = body.role?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  // Mirror the client-side validation so the endpoint is safe on its own.
  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Name cannot be empty";
  if (!email || !EMAIL_RE.test(email)) fieldErrors.email = "Invalid email";
  if (!company) fieldErrors.company = "Company cannot be empty";
  if (!role) fieldErrors.role = "Role cannot be empty";
  if (Object.keys(fieldErrors).length > 0) {
    return Response.json({ error: "Validation failed", fieldErrors }, {
      status: 400,
    });
  }

  const resend = new Resend(RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [CONTACT_EMAIL],
    replyTo: email,
    subject: `New demo request from ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Role: ${role}`,
      "",
      "Message:",
      message || "(none)",
    ].join("\n"),
    html: `
      <h2 style="margin:0 0 16px;font-family:sans-serif;">New demo request</h2>
      <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
        <tr><td style="padding:4px 12px 4px 0;color:#667;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#667;">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#667;">Company</td><td>${escapeHtml(company)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#667;">Role</td><td>${escapeHtml(role)}</td></tr>
      </table>
      <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px;">${
        message ? escapeHtml(message) : "<em>(no message)</em>"
      }</p>
    `,
  });

  if (error) {
    console.error("Resend send failed:", error);
    return Response.json({ error: "Failed to send email." }, { status: 502 });
  }

  return Response.json({ ok: true, id: data?.id });
}
