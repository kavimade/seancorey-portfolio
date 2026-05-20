import type { Context } from "@netlify/functions";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_ELAPSED_MS = 3_000;

const LOOPS_API = "https://app.loops.so/api/v1";

export default async (req: Request, _context: Context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // ── Origin check — only accept requests from this domain ──────────────────
  const origin = req.headers.get("origin") ?? "";
  const allowed = [
    process.env.URL,
    "http://localhost:3000",
  ].filter(Boolean);
  if (allowed.length && !allowed.some(o => origin.startsWith(o!))) {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await req.json();
  const { name, email, projectType, message, honeypot, loadTime } = body;

  // ── Honeypot — bots fill this; humans never see it ────────────────────────
  if (honeypot) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Timing check — under 3 s almost certainly a bot ──────────────────────
  if (!loadTime || Date.now() - loadTime < MIN_ELAPSED_MS) {
    return new Response(JSON.stringify({ error: "Submission too fast." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Server-side field validation ──────────────────────────────────────────
  if (
    typeof name    !== "string" || name.trim().length    < 2  ||
    typeof email   !== "string" || !emailRe.test(email.trim()) ||
    typeof message !== "string" || message.trim().length < 20
  ) {
    return new Response(JSON.stringify({ error: "Invalid fields." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const loopsHeaders = {
    Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    "Content-Type": "application/json",
  };

  const trimmedName    = name.trim();
  const trimmedEmail   = email.trim();
  const trimmedMessage = message.trim();

  // ── Send transactional notification email via Loops ───────────────────────
  const emailRes = await fetch(`${LOOPS_API}/transactional`, {
    method: "POST",
    headers: loopsHeaders,
    body: JSON.stringify({
      transactionalId: process.env.LOOPS_TRANSACTIONAL_ID,
      email:           "sean@seancorey.net",
      dataVariables: {
        name:        trimmedName,
        email:       trimmedEmail,
        projectType: projectType ?? "",
        message:     trimmedMessage,
      },
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    console.error("Loops transactional error:", err);
    return new Response(JSON.stringify({ error: "Failed to send." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── Add inquirer to Loops mailing list (non-blocking on failure) ──────────
  const [firstName, ...rest] = trimmedName.split(" ");
  const lastName = rest.join(" ") || undefined;

  const listRes = await fetch(`${LOOPS_API}/contacts/update`, {
    method: "PUT",
    headers: loopsHeaders,
    body: JSON.stringify({
      email:     trimmedEmail,
      firstName,
      lastName,
      source:    "Portfolio Contact Form",
      mailingLists: {
        [process.env.LOOPS_LIST_ID!]: true,
      },
    }),
  });

  if (!listRes.ok) {
    const err = await listRes.text();
    console.error("Loops contact upsert error:", err);
    // Don't surface this to the user — email already sent successfully
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
