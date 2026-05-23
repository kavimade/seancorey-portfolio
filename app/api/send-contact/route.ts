import { type NextRequest, NextResponse } from "next/server";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_ELAPSED_MS = 3_000;
const LOOPS_API = "https://app.loops.so/api/v1";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch (err) {
    console.error("Failed to parse request body:", err);
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name        = body.name        as string | undefined;
  const email       = body.email       as string | undefined;
  const projectType = body.projectType as string | undefined;
  const message     = body.message     as string | undefined;
  const honeypot    = body.honeypot    as string | undefined;
  const loadTime    = body.loadTime    as number | undefined;

  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  if (!loadTime || Date.now() - loadTime < MIN_ELAPSED_MS) {
    return NextResponse.json({ error: "Submission too fast." }, { status: 400 });
  }

  if (
    typeof name    !== "string" || name.trim().length    < 2  ||
    typeof email   !== "string" || !emailRe.test(email.trim()) ||
    typeof message !== "string" || message.trim().length < 20
  ) {
    return NextResponse.json({ error: "Invalid fields." }, { status: 400 });
  }

  const loopsHeaders = {
    Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
    "Content-Type": "application/json",
  };

  const trimmedName    = name.trim();
  const trimmedEmail   = email.trim();
  const trimmedMessage = message.trim();

  const emailRes = await fetch(`${LOOPS_API}/transactional`, {
    method: "POST",
    headers: loopsHeaders,
    body: JSON.stringify({
      transactionalId: process.env.LOOPS_TRANSACTIONAL_ID,
      email:           "sean@seancorey.net",
      dataVariables: {
        DATA_VARIABLEname:        trimmedName,
        DATA_VARIABLEemail:       trimmedEmail,
        DATA_VARIABLEprojectType: projectType ?? "",
        DATA_VARIABLEmessage:     trimmedMessage,
      },
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    console.error("Loops transactional error:", err);
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

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
  }

  return NextResponse.json({ success: true });
}
