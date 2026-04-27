import type { AssessmentData } from "@/app/assessment/types";

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
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
           style="max-width:600px;width:100%;background:${C.white};border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:${C.blue};padding:28px 40px;">
          <p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.green};font-weight:600;">Covenant Charge</p>
          <p style="margin:6px 0 0;font-family:Georgia,serif;font-size:18px;font-weight:bold;color:${C.white};line-height:1.3;">New Site Assessment Submission</p>
        </td>
      </tr>
      <tr><td style="padding:36px 40px 28px;">${content}</td></tr>
      <tr>
        <td style="background:${C.navy};padding:20px 40px;border-top:3px solid ${C.green};">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;">
            Covenant Charge &nbsp;|&nbsp;
            <a href="https://covenantcharge.com" style="color:${C.green};text-decoration:none;">covenantcharge.com</a>
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string | undefined | null): string {
  return `<tr>
    <td style="padding:7px 12px 7px 0;font-size:12px;font-weight:600;color:${C.muted};vertical-align:top;white-space:nowrap;width:160px;">${label}</td>
    <td style="padding:7px 0;font-size:13px;color:${C.text};vertical-align:top;border-bottom:1px solid #E5E7EB;">${value || '—'}</td>
  </tr>`;
}

function section(title: string, rows: string): string {
  return `
    <p style="margin:24px 0 8px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};font-weight:600;">${title}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;">
      ${rows}
    </table>`;
}

export function assessmentNotificationEmail(
  data: AssessmentData,
  submissionId: string,
  uploadUrls: string[],
): string {
  const services = (data.sec_0_1 as string[]).join(', ') || '—';
  const uploadLinks = uploadUrls.length > 0
    ? uploadUrls.map((u, i) => `<a href="${u}" style="color:${C.green};text-decoration:none;">Uploaded file ${i + 1}</a>`).join('<br/>')
    : '—';

  const studioLink = `https://supabase.com/dashboard/project/_/editor`;

  const content = `
    <h2 style="margin:0 0 4px;font-family:Georgia,serif;font-size:20px;font-weight:bold;color:${C.blue};">
      ${data.sec_1_6 || 'Unknown Institution'}
    </h2>
    <p style="margin:0 0 24px;font-size:14px;color:${C.muted};">${data.sec_2_2 || ''} &nbsp;|&nbsp; ${services}</p>

    ${section('Contact', `
      ${row('Name', data.sec_1_1)}
      ${row('Title', data.sec_1_2)}
      ${row('Email', data.sec_1_3 ? `<a href="mailto:${data.sec_1_3}" style="color:${C.green};text-decoration:none;">${data.sec_1_3}</a>` : '')}
      ${row('Phone', data.sec_1_4)}
      ${row('Best time', data.sec_1_5)}
    `)}

    ${section('Organization', `
      ${row('Institution', data.sec_1_6)}
      ${row('Type', data.sec_1_7 + (data.sec_1_8 ? ` — ${data.sec_1_8}` : ''))}
      ${row('Affiliation', data.sec_1_9)}
      ${row('Attendance', data.sec_1_10)}
    `)}

    ${section('Property', `
      ${row('Address', data.sec_2_1)}
      ${row('City / State / ZIP', data.sec_2_2)}
      ${row('Ownership', data.sec_2_3)}
      ${row('Relocation plans', data.sec_2_8)}
    `)}

    ${section('Services & Decision', `
      ${row('Services', services)}
      ${row('Priority', data.sec_0_2)}
      ${row('Timeline', data.sec_10_4)}
      ${row('Decision authority', data.sec_10_1)}
      ${row('Board vote required', data.sec_10_2)}
    `)}

    ${section('Mission', `
      ${row('Primary mission', data.sec_11_1)}
      ${row('Revenue would fund', data.sec_11_3)}
      ${row('How heard', data.sec_11_5)}
    `)}

    ${section('Uploaded Files', `
      <tr><td colspan="2" style="padding:8px 0;font-size:13px;color:${C.text};">${uploadLinks}</td></tr>
    `)}

    <p style="margin:24px 0 0;font-size:13px;color:${C.muted};line-height:1.6;">
      Submission ID: <code style="font-family:monospace;font-size:12px;background:#F1F5F9;padding:2px 6px;border-radius:3px;">${submissionId}</code><br/>
      <a href="${studioLink}" style="color:${C.green};text-decoration:none;">View full record in Supabase Studio →</a>
    </p>`;

  return shell(content);
}

export function resumeLinkEmail(resumeUrl: string, institutionName: string): string {
  const content = `
    <h2 style="margin:0 0 16px;font-family:Georgia,serif;font-size:20px;font-weight:bold;color:${C.blue};">
      Your assessment is saved.
    </h2>
    <p style="margin:0 0 20px;font-size:15px;color:${C.text};line-height:1.7;">
      Here is your resume link for the Covenant Charge site assessment${institutionName ? ` for <strong>${institutionName}</strong>` : ''}.
      Click it to pick up exactly where you left off.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="background:${C.cream};border-radius:6px;margin:0 0 28px;">
      <tr><td style="padding:20px 24px;text-align:center;">
        <a href="${resumeUrl}"
           style="display:inline-block;background:${C.green};color:white;font-size:14px;font-weight:bold;padding:12px 28px;border-radius:6px;text-decoration:none;">
          Resume My Assessment
        </a>
        <p style="margin:12px 0 0;font-size:11px;color:${C.muted};">Or copy this link: ${resumeUrl}</p>
      </td></tr>
    </table>
    <p style="margin:0;font-size:13px;color:${C.muted};line-height:1.6;">
      Your answers are saved automatically as you work. This link can be used from any device.
    </p>`;

  return shell(content);
}
