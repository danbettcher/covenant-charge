import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { qualifierConfirmationEmail, qualifierNotificationEmail } from "@/lib/qualifier-emails";

const schema = z.object({
  contact_name:            z.string().min(2),
  contact_title:           z.string().optional(),
  contact_email:           z.string().email(),
  contact_phone:           z.string().min(7),
  best_time_to_reach:      z.string().optional(),
  organization_name:       z.string().min(2),
  organization_type:       z.string().min(1),
  organization_type_other: z.string().optional(),
  services_interested:     z.array(z.string()).min(1),
  property_address:        z.string().min(5),
  property_city_state_zip: z.string().min(5),
  property_ownership:      z.string().min(1),
  decision_authority:      z.string().min(1),
  timeline:                z.string().min(1),
  known_blockers:          z.string().optional(),
  how_heard_about_cc:      z.string().min(1),
  consent_given:           z.boolean().refine((v) => v === true),
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
    return NextResponse.json({ error: "Validation failed", issues: result.error.issues }, { status: 422 });
  }

  const data = result.data;
  const supabase = getSupabaseAdmin();

  const { error: dbError } = await supabase.from("qualifier_submissions").insert({
    contact_name:            data.contact_name,
    contact_title:           data.contact_title ?? null,
    contact_email:           data.contact_email,
    contact_phone:           data.contact_phone,
    best_time_to_reach:      data.best_time_to_reach ?? null,
    organization_name:       data.organization_name,
    organization_type:       data.organization_type,
    organization_type_other: data.organization_type_other ?? null,
    services_interested:     data.services_interested,
    property_address:        data.property_address,
    property_city_state_zip: data.property_city_state_zip,
    property_ownership:      data.property_ownership,
    decision_authority:      data.decision_authority,
    timeline:                data.timeline,
    known_blockers:          data.known_blockers ?? null,
    how_heard_about_cc:      data.how_heard_about_cc,
    consent_given:           data.consent_given,
  });

  if (dbError) {
    console.error("Supabase insert error:", JSON.stringify(dbError));
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await Promise.allSettled([
    resend.emails.send({
      from:    FROM,
      to:      data.contact_email,
      subject: "We received your qualifier submission — Covenant Charge",
      html:    qualifierConfirmationEmail(data),
    }),
    resend.emails.send({
      from:    FROM,
      to:      "info@covenantcharge.com",
      subject: `New qualifier: ${data.organization_name} (${data.property_city_state_zip})`,
      html:    qualifierNotificationEmail(data),
    }),
  ]).then((results) => {
    results.forEach((r, i) => {
      if (r.status === "rejected") console.error(`Qualifier email ${i} failed:`, r.reason);
    });
  });

  return NextResponse.json({ success: true });
}
