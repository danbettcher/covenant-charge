import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { customerConfirmationEmail, ownerNotificationEmail } from "@/lib/emails";

const schema = z.object({
  institutionName: z.string().min(2),
  institutionType: z.string().min(1),
  contactName:     z.string().min(2),
  email:           z.string().email(),
  phone:           z.string().optional(),
  city:            z.string().min(2),
  state:           z.string().min(2),
  parkingSpaces:   z.string().optional(),
  message:         z.string().optional(),
  services:        z.array(z.string()),
});

const FROM = "Covenant Charge <info@covenantcharge.com>";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const data = result.data;
  const supabase = getSupabaseAdmin();

  const { error: dbError } = await supabase.from("leads").insert({
    institution_name: data.institutionName,
    institution_type: data.institutionType,
    contact_name:     data.contactName,
    email:            data.email,
    phone:            data.phone ?? null,
    city:             data.city,
    state:            data.state,
    parking_spaces:   data.parkingSpaces ?? null,
    message:          data.message ?? null,
    services:         data.services,
  });

  if (dbError) {
    console.error("Supabase insert error:", JSON.stringify(dbError));
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await Promise.allSettled([
    resend.emails.send({
      from:    FROM,
      to:      data.email,
      subject: "We received your request — Covenant Charge",
      html:    customerConfirmationEmail(data),
    }),
    resend.emails.send({
      from:    FROM,
      to:      "info@covenantcharge.com",
      subject: `New lead: ${data.institutionName} (${data.city}, ${data.state})`,
      html:    ownerNotificationEmail(data),
    }),
  ]).then((results) => {
    results.forEach((r, i) => {
      if (r.status === "rejected") console.error(`Email ${i} failed:`, r.reason);
    });
  });

  return NextResponse.json({ success: true });
}
