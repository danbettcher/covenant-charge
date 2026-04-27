import { NextResponse } from "next/server";
import { Resend } from "resend";
import { resumeLinkEmail } from "@/lib/assessment-emails";

const FROM = "Covenant Charge <info@covenantcharge.com>";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { email, submissionId, institutionName } = body as {
    email: string;
    submissionId: string;
    institutionName?: string;
  };

  if (!email || !submissionId) {
    return NextResponse.json({ error: "email and submissionId required" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://covenantcharge.com";
  const resumeUrl = `${baseUrl}/assessment?resume=${submissionId}`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from:    FROM,
    to:      email,
    subject: "Resume your Covenant Charge site assessment",
    html:    resumeLinkEmail(resumeUrl, institutionName ?? ""),
  });

  if (error) {
    console.error("Resume email error:", error);
    return NextResponse.json({ error: "Email failed to send" }, { status: 500 });
  }

  return NextResponse.json({ sent: true });
}
