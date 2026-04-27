import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { assessmentNotificationEmail } from "@/lib/assessment-emails";
import type { AssessmentData } from "@/app/assessment/types";

const FROM    = "Covenant Charge <info@covenantcharge.com>";
const BUCKET  = "site-assessment-uploads";

const REQUIRED: Array<keyof AssessmentData> = [
  "sec_0_1", "sec_1_1", "sec_1_3", "sec_1_4",
  "sec_1_6", "sec_1_7", "sec_2_1", "sec_2_2", "sec_2_3",
];

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { submissionId, data } = body as { submissionId: string; data: AssessmentData };

  if (!submissionId) {
    return NextResponse.json({ error: "submissionId required" }, { status: 400 });
  }

  // Validate required fields
  const missing: string[] = [];
  for (const field of REQUIRED) {
    const v = data[field];
    if (!v || (Array.isArray(v) && v.length === 0)) missing.push(field);
  }
  if (!data.sec_10_5) missing.push("sec_10_5");
  if (missing.length > 0) {
    return NextResponse.json({ error: "Missing required fields", fields: missing }, { status: 422 });
  }

  const supabase = getSupabaseAdmin();

  // Generate signed URLs for any uploaded files
  const uploadUrls: string[] = [];
  if (data.sec_4_4?.path) {
    const { data: signed } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(data.sec_4_4.path, 86400); // 24h
    if (signed?.signedUrl) uploadUrls.push(signed.signedUrl);
  }

  // Mark as submitted
  const { error: dbError } = await supabase
    .from("site_assessments")
    .upsert(
      {
        submission_id: submissionId,
        ...data,
        status: "submitted",
        submitted_at: new Date().toISOString(),
        updated_at:   new Date().toISOString(),
      },
      { onConflict: "submission_id" }
    );

  if (dbError) {
    console.error("Submit DB error:", JSON.stringify(dbError));
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Send notification email
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from:     FROM,
    to:       "dan@covenantcharge.com",
    cc:       ["clint@covenantcharge.com"],
    replyTo:  data.sec_1_3,
    subject:  `New Site Assessment — ${data.sec_1_6 ?? "Unknown Institution"}`,
    html:     assessmentNotificationEmail(data, submissionId, uploadUrls),
  }).catch(err => console.error("Notification email failed:", err));

  return NextResponse.json({ success: true, submissionId });
}
