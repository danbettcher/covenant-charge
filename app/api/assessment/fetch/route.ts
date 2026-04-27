import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("site_assessments")
    .select("*")
    .eq("submission_id", id)
    .single();

  if (error || !data) return NextResponse.json(null);

  return NextResponse.json(data);
}
