import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { submissionId, data } = body as { submissionId: string; data: Record<string, unknown> };

  if (!submissionId || typeof submissionId !== "string") {
    return NextResponse.json({ error: "submissionId required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("site_assessments").upsert(
    { submission_id: submissionId, ...data, updated_at: new Date().toISOString() },
    { onConflict: "submission_id" }
  );

  if (error) {
    console.error("Autosave error:", JSON.stringify(error));
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }

  return NextResponse.json({ savedAt: new Date().toISOString() });
}
