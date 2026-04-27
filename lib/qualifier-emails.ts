interface QualifierData {
  contact_name: string;
  contact_title?: string;
  contact_email: string;
  contact_phone: string;
  best_time_to_reach?: string;
  organization_name: string;
  organization_type: string;
  organization_type_other?: string;
  services_interested: string[];
  property_address: string;
  property_city_state_zip: string;
  property_ownership: string;
  decision_authority: string;
  timeline: string;
  known_blockers?: string;
  how_heard_about_cc: string;
}

const C = {
  blue:  "#1B4F72",
  green: "#27AE60",
  gold:  "#D4AC0D",
  navy:  "#0F2D45",
  cream: "#F9F3DC",
  muted: "#64748B",
  white: "#FFFFFF",
  text:  "#374151",
};

function shell(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:${C.cream};font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"
           style="max-width:560px;width:100%;background:${C.white};border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:${C.blue};padding:32px 40px 28px;">
          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.green};font-weight:600;">Covenant Charge</p>
          <p style="margin:6px 0 0;font-family:Georgia,serif;font-size:20px;font-weight:bold;color:${C.white};line-height:1.3;">EV Fast Charging for Faith Institutions</p>
        </td>
      </tr>
      <tr><td style="padding:40px 40px 32px;">${content}</td></tr>
      <tr>
        <td style="background:${C.navy};padding:24px 40px;border-top:3px solid ${C.green};">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.55);line-height:1.6;">
            Covenant Charge &nbsp;|&nbsp;
            <a href="https://covenantcharge.com" style="color:${C.green};text-decoration:none;">covenantcharge.com</a>
            &nbsp;|&nbsp;
            <a href="mailto:info@covenantcharge.com" style="color:${C.green};text-decoration:none;">info@covenantcharge.com</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px 8px 0;font-size:13px;font-weight:600;color:${C.muted};vertical-align:top;white-space:nowrap;width:160px;">${label}</td>
    <td style="padding:8px 0;font-size:14px;color:${C.text};vertical-align:top;border-bottom:1px solid #E5E7EB;">${value || "—"}</td>
  </tr>`;
}

export function qualifierConfirmationEmail(data: QualifierData): string {
  const firstName = data.contact_name.split(" ")[0];
  const services = data.services_interested.join(", ");

  const content = `
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;font-weight:bold;color:${C.blue};">Thank you, ${firstName}.</h2>
    <p style="margin:0 0 20px;font-size:15px;color:${C.text};line-height:1.7;">
      We received your qualifier submission on behalf of <strong>${data.organization_name}</strong>.
      Our team will review your information and be in touch within 2 business days.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:${C.cream};border-radius:6px;margin:0 0 28px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 12px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:600;">What happens next</p>
        ${["We review your submission and research your property.",
           "A Covenant Charge advisor contacts you to confirm fit.",
           "If it is a match, we schedule a no-cost on-site assessment."]
          .map((s, i) => `
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
            <tr>
              <td style="vertical-align:top;padding-right:10px;">
                <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${C.green};color:white;font-size:12px;font-weight:bold;text-align:center;line-height:22px;">${i + 1}</span>
              </td>
              <td style="font-size:14px;color:${C.text};line-height:1.5;vertical-align:top;padding-top:3px;">${s}</td>
            </tr>
          </table>`).join("")}
      </td></tr>
    </table>
    <p style="margin:0 0 10px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:600;">Your submission summary</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${row("Organization", data.organization_name)}
      ${row("Type", data.organization_type)}
      ${row("Location", data.property_city_state_zip)}
      ${row("Services", services)}
      ${row("Timeline", data.timeline)}
    </table>
    <p style="margin:28px 0 0;font-size:14px;color:${C.muted};line-height:1.6;">
      Questions in the meantime? Reply to this email or reach us at
      <a href="mailto:info@covenantcharge.com" style="color:${C.green};text-decoration:none;">info@covenantcharge.com</a>.
    </p>`;

  return shell(content);
}

export function qualifierNotificationEmail(data: QualifierData): string {
  const services = data.services_interested.join(", ");

  const content = `
    <h2 style="margin:0 0 4px;font-family:Georgia,serif;font-size:20px;font-weight:bold;color:${C.blue};">New Qualifier Submission</h2>
    <p style="margin:0 0 24px;font-size:14px;color:${C.muted};">${data.organization_name} — ${data.property_city_state_zip}</p>
    <p style="margin:0 0 12px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:600;">Contact</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      ${row("Name", data.contact_name)}
      ${row("Title", data.contact_title ?? "")}
      ${row("Email", `<a href="mailto:${data.contact_email}" style="color:${C.green};text-decoration:none;">${data.contact_email}</a>`)}
      ${row("Phone", data.contact_phone)}
      ${row("Best time", data.best_time_to_reach ?? "")}
    </table>
    <p style="margin:0 0 12px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:600;">Organization</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      ${row("Name", data.organization_name)}
      ${row("Type", data.organization_type + (data.organization_type_other ? ` — ${data.organization_type_other}` : ""))}
      ${row("Services", services)}
    </table>
    <p style="margin:0 0 12px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:600;">Property</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      ${row("Address", data.property_address)}
      ${row("City/State/ZIP", data.property_city_state_zip)}
      ${row("Ownership", data.property_ownership)}
    </table>
    <p style="margin:0 0 12px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:600;">Decision-Making</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
      ${row("Authority", data.decision_authority)}
      ${row("Timeline", data.timeline)}
      ${row("Blockers", data.known_blockers ?? "")}
    </table>
    <p style="margin:0 0 12px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:600;">Source</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${row("How they heard", data.how_heard_about_cc)}
    </table>`;

  return shell(content);
}
