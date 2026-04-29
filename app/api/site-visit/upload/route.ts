import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const BUCKET = "site-visit-photos";
const MAX_BYTES = 15 * 1024 * 1024; // 15 MB — phone HEIC can be 8–12 MB

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg":  "jpg",
  "image/png":  "png",
  "image/heic": "heic",
  "image/heif": "heif",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  let formData: FormData;
  try { formData = await request.formData(); }
  catch { return NextResponse.json({ error: "Invalid form data" }, { status: 400 }); }

  const file      = formData.get("file") as File | null;
  const sessionId = formData.get("sessionId") as string | null;
  const photoId   = formData.get("photoId") as string | null;

  if (!file || !sessionId || !photoId) {
    return NextResponse.json({ error: "file, sessionId, and photoId are required" }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds 15 MB limit" }, { status: 400 });
  }

  const timestamp = Date.now();
  const filename  = `${photoId}-${timestamp}.${ext}`;
  const path      = `site-visit/${sessionId}/${filename}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Photo upload error:", JSON.stringify(error));
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  return NextResponse.json({ path, filename });
}
