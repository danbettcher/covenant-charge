"use client";

import { useState, useMemo } from "react";
import { z } from "zod";
import { LogoMark } from "@/components/ui/LogoMark";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

// ─── Schema ──────────────────────────────────────────────────────────────────

const schema = z.object({
  contact_name:            z.string().min(2, "Full name is required"),
  contact_title:           z.string().optional(),
  contact_email:           z.string().email("Please enter a valid email address"),
  contact_phone:           z.string().regex(/^\+?[\d\s\-().]{7,}$/, "Please enter a valid phone number"),
  best_time_to_reach:      z.string().optional(),
  organization_name:       z.string().min(2, "Organization name is required"),
  organization_type:       z.string().min(1, "Please select an organization type"),
  organization_type_other: z.string().optional(),
  property_address:        z.string().min(5, "Street address is required"),
  property_city_state_zip: z.string().min(5, "City, State, ZIP is required"),
  property_ownership:      z.string().min(1, "Please select an ownership status"),
  decision_authority:      z.string().min(1, "Please select your decision authority"),
  timeline:                z.string().min(1, "Please select a timeline"),
  known_blockers:          z.string().optional(),
  how_heard_about_cc:      z.string().min(1, "Please let us know how you heard about us"),
});

// ─── Static options ───────────────────────────────────────────────────────────

const SERVICES = [
  { id: "EV Charging",      label: "EV Charging" },
  { id: "Solar",            label: "Solar" },
  { id: "Battery Storage",  label: "Battery Storage" },
  { id: "Not sure yet",     label: "Not sure yet — open to learning more" },
];

const ORG_TYPES = [
  "Church / Congregation",
  "Christian school or academy",
  "Seminary or Bible college",
  "Nonprofit ministry or parachurch org",
  "Faith-based community center",
  "Recovery center or rehabilitation ministry",
  "Multi-site campus",
  "Other",
];

const BEST_TIMES = [
  { value: "Morning (before noon)",  label: "Morning (before noon)" },
  { value: "Afternoon (noon–5pm)",   label: "Afternoon (noon–5pm)" },
  { value: "Evening (after 5pm)",    label: "Evening (after 5pm)" },
  { value: "Anytime",                label: "Anytime" },
];

const OWNERSHIP_OPTIONS = [
  "Owned outright",
  "Owned with mortgage",
  "Leased from a third party",
  "Shared-use agreement with another organization",
  "Other / unsure",
];

const AUTHORITY_OPTIONS = [
  "I have direct authority",
  "I have authority to explore, but final decision requires board/leadership",
  "I am gathering information on behalf of leadership",
  "Unsure",
];

const TIMELINE_OPTIONS = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "More than 12 months",
  "Just exploring — no specific timeline",
];

const HOW_HEARD_OPTIONS = [
  "Referred by someone I know",
  "Online search",
  "Social media",
  "Industry event or conference",
  "Direct outreach from Covenant Charge",
  "Other",
];

// ─── Types ────────────────────────────────────────────────────────────────────

type FormFields = {
  contact_name: string;
  contact_title: string;
  contact_email: string;
  contact_phone: string;
  best_time_to_reach: string;
  organization_name: string;
  organization_type: string;
  organization_type_other: string;
  property_address: string;
  property_city_state_zip: string;
  property_ownership: string;
  decision_authority: string;
  timeline: string;
  known_blockers: string;
  how_heard_about_cc: string;
};

type Errors = Partial<Record<keyof FormFields | "services_interested" | "consent_given", string>>;

const EMPTY: FormFields = {
  contact_name: "",
  contact_title: "",
  contact_email: "",
  contact_phone: "",
  best_time_to_reach: "",
  organization_name: "",
  organization_type: "",
  organization_type_other: "",
  property_address: "",
  property_city_state_zip: "",
  property_ownership: "",
  decision_authority: "",
  timeline: "",
  known_blockers: "",
  how_heard_about_cc: "",
};

// ─── Section heading component ────────────────────────────────────────────────

function SectionHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-covenant-blue flex items-center justify-center font-sans font-bold text-xs text-white">
        {number}
      </span>
      <h2 className="font-serif font-semibold text-lg text-covenant-blue">{title}</h2>
      <div className="flex-1 h-px bg-covenant-blue/15" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QualifyPage() {
  const [form, setForm] = useState<FormFields>(EMPTY);
  const [services, setServices] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function set(field: keyof FormFields, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function toggleService(id: string) {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setErrors((e) => ({ ...e, services_interested: undefined }));
  }

  // Progress: count of required fields that are filled
  const progress = useMemo(() => {
    const checks = [
      form.contact_name.length >= 2,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email),
      form.contact_phone.length >= 7,
      form.organization_name.length >= 2,
      form.organization_type.length > 0,
      services.length > 0,
      form.property_address.length >= 5,
      form.property_city_state_zip.length >= 5,
      form.property_ownership.length > 0,
      form.decision_authority.length > 0,
      form.timeline.length > 0,
      form.how_heard_about_cc.length > 0,
      consent,
    ];
    const filled = checks.filter(Boolean).length;
    return Math.round((filled / checks.length) * 100);
  }, [form, services, consent]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);

    const newErrors: Errors = {};

    const result = schema.safeParse(form);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormFields;
        if (!newErrors[key]) newErrors[key] = issue.message;
      });
    }

    if (services.length === 0) {
      newErrors.services_interested = "Please select at least one service";
    }

    if (!consent) {
      newErrors.consent_given = "You must confirm consent to submit";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = document.querySelector("[data-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-qualifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services_interested: services, consent_given: consent }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Submission failed");
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setApiError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us at info@covenantcharge.com."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ─── Success state ──────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen bg-covenant-light font-sans">
        <div className="h-1 bg-covenant-gold" />
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-covenant-green/15 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <LogoMark size="sm" showWordmark className="justify-center mb-8" />
          <h1 className="font-serif font-bold text-3xl text-covenant-blue mb-4">
            Thank you for reaching out.
          </h1>
          <p className="font-sans text-lg text-covenant-muted leading-relaxed mb-8">
            We received your qualifier submission. Our team will review your information and
            be in touch within 2 business days to confirm whether your site is a strong candidate
            for a full assessment.
          </p>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 text-left">
            <p className="font-sans text-xs tracking-widest uppercase text-covenant-muted font-semibold mb-4">
              What happens next
            </p>
            {[
              "We review your submission and research your property.",
              "A Covenant Charge advisor contacts you to confirm fit.",
              "If it is a match, we schedule a no-cost on-site assessment.",
            ].map((step, i) => (
              <div key={i} className="flex gap-3 mb-3 last:mb-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-covenant-green flex items-center justify-center font-sans font-bold text-xs text-white">
                  {i + 1}
                </span>
                <p className="font-sans text-sm text-covenant-dark leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          <p className="font-sans text-sm text-covenant-muted mt-8">
            Questions? Email us at{" "}
            <a href="mailto:info@covenantcharge.com" className="text-covenant-green underline underline-offset-2">
              info@covenantcharge.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  // ─── Form ───────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-covenant-light font-sans">
      {/* Gold authority bar */}
      <div className="h-1 bg-covenant-gold" />

      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <LogoMark size="sm" showWordmark />
          <p className="font-sans text-xs text-covenant-muted hidden sm:block">
            Site Qualification Form
          </p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {/* Page title */}
        <div className="mb-8">
          <p className="font-sans text-xs tracking-widest uppercase text-covenant-green font-semibold mb-2">
            Step 1 of Your Journey
          </p>
          <h1 className="font-serif font-bold text-3xl text-covenant-blue leading-tight mb-3">
            Is Your Site a Fit?
          </h1>
          <p className="font-sans text-base text-covenant-muted leading-relaxed">
            This short form helps us determine whether your property is a strong candidate for
            EV charging, solar, or battery storage. It takes about 5 minutes. We will follow up
            within 2 business days.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <p className="font-sans text-xs font-semibold text-covenant-muted uppercase tracking-widest">
              Progress
            </p>
            <p className="font-sans text-xs font-semibold text-covenant-green">{progress}% complete</p>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-covenant-green rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-10">

            {/* ── Section 1: Contact ── */}
            <section>
              <SectionHeading number={1} title="Contact Information" />
              <div className="space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div data-error={errors.contact_name ? true : undefined}>
                    <FormField
                      label="Primary contact name"
                      required
                      value={form.contact_name}
                      onChange={(e) => set("contact_name", e.target.value)}
                      placeholder="Jane Smith"
                      error={errors.contact_name}
                    />
                  </div>
                  <div>
                    <FormField
                      label="Your title or role"
                      value={form.contact_title}
                      onChange={(e) => set("contact_title", e.target.value)}
                      placeholder="e.g., Senior Pastor, Facilities Manager"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div data-error={errors.contact_email ? true : undefined}>
                    <FormField
                      label="Email address"
                      required
                      type="email"
                      value={form.contact_email}
                      onChange={(e) => set("contact_email", e.target.value)}
                      placeholder="jane@organization.org"
                      error={errors.contact_email}
                    />
                  </div>
                  <div data-error={errors.contact_phone ? true : undefined}>
                    <FormField
                      label="Phone number"
                      required
                      type="tel"
                      value={form.contact_phone}
                      onChange={(e) => set("contact_phone", e.target.value)}
                      placeholder="(555) 555-5555"
                      error={errors.contact_phone}
                    />
                  </div>
                </div>

                <div className="sm:w-1/2">
                  <FormField
                    as="select"
                    label="Best time to reach you"
                    value={form.best_time_to_reach}
                    onChange={(e) => set("best_time_to_reach", e.target.value)}
                  >
                    <option value="">Select a time (optional)</option>
                    {BEST_TIMES.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </FormField>
                </div>

              </div>
            </section>

            {/* ── Section 2: Organization ── */}
            <section>
              <SectionHeading number={2} title="Organization" />
              <div className="space-y-5">

                <div data-error={errors.organization_name ? true : undefined}>
                  <FormField
                    label="Organization name"
                    required
                    value={form.organization_name}
                    onChange={(e) => set("organization_name", e.target.value)}
                    placeholder="Grace Community Church"
                    error={errors.organization_name}
                  />
                </div>

                <div data-error={errors.organization_type ? true : undefined}>
                  <FormField
                    as="select"
                    label="Organization type"
                    required
                    value={form.organization_type}
                    onChange={(e) => set("organization_type", e.target.value)}
                    error={errors.organization_type}
                  >
                    <option value="">Select a type</option>
                    {ORG_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </FormField>
                </div>

                {form.organization_type === "Other" && (
                  <div>
                    <FormField
                      label="If Other, please describe"
                      value={form.organization_type_other}
                      onChange={(e) => set("organization_type_other", e.target.value)}
                      placeholder="Describe your organization type"
                    />
                  </div>
                )}

              </div>
            </section>

            {/* ── Section 3: Service Interest ── */}
            <section>
              <SectionHeading number={3} title="Service Interest" />
              <div>
                <p className="font-sans text-sm font-medium text-covenant-dark mb-3">
                  Which services are you interested in exploring?
                  <span className="text-covenant-green ml-1">*</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => {
                    const checked = services.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                          checked
                            ? "border-covenant-green bg-covenant-green/5"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleService(s.id)}
                          className="mt-0.5 accent-covenant-green flex-shrink-0"
                        />
                        <span className="font-sans text-sm text-covenant-dark leading-snug">{s.label}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.services_interested && (
                  <p className="font-sans text-xs text-red-500 mt-2" data-error>{errors.services_interested}</p>
                )}
              </div>
            </section>

            {/* ── Section 4: Property ── */}
            <section>
              <SectionHeading number={4} title="Property" />
              <div className="space-y-5">

                <div data-error={errors.property_address ? true : undefined}>
                  <FormField
                    label="Property street address"
                    required
                    value={form.property_address}
                    onChange={(e) => set("property_address", e.target.value)}
                    placeholder="123 Faith Avenue"
                    error={errors.property_address}
                  />
                </div>

                <div data-error={errors.property_city_state_zip ? true : undefined}>
                  <FormField
                    label="City, State, ZIP"
                    required
                    value={form.property_city_state_zip}
                    onChange={(e) => set("property_city_state_zip", e.target.value)}
                    placeholder="Nashville, TN 37201"
                    error={errors.property_city_state_zip}
                  />
                </div>

                <div data-error={errors.property_ownership ? true : undefined}>
                  <FormField
                    as="select"
                    label="Property ownership status"
                    required
                    value={form.property_ownership}
                    onChange={(e) => set("property_ownership", e.target.value)}
                    error={errors.property_ownership}
                  >
                    <option value="">Select ownership status</option>
                    {OWNERSHIP_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </FormField>
                </div>

              </div>
            </section>

            {/* ── Section 5: Decision-Making ── */}
            <section>
              <SectionHeading number={5} title="Decision-Making and Timeline" />
              <div className="space-y-5">

                <div data-error={errors.decision_authority ? true : undefined}>
                  <FormField
                    as="select"
                    label="Do you have authority to evaluate and pursue this opportunity?"
                    required
                    value={form.decision_authority}
                    onChange={(e) => set("decision_authority", e.target.value)}
                    error={errors.decision_authority}
                  >
                    <option value="">Select your authority level</option>
                    {AUTHORITY_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </FormField>
                </div>

                <div data-error={errors.timeline ? true : undefined}>
                  <FormField
                    as="select"
                    label="What is your ideal timeline for moving forward if this is a fit?"
                    required
                    value={form.timeline}
                    onChange={(e) => set("timeline", e.target.value)}
                    error={errors.timeline}
                  >
                    <option value="">Select a timeline</option>
                    {TIMELINE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </FormField>
                </div>

                <div>
                  <FormField
                    as="textarea"
                    label="Are there any known blockers or concerns at this stage?"
                    value={form.known_blockers}
                    onChange={(e) => set("known_blockers", e.target.value)}
                    placeholder="e.g., lease restrictions, governance hurdles, recent property decisions, budget constraints (optional)"
                  />
                </div>

              </div>
            </section>

            {/* ── Section 6: Source and Consent ── */}
            <section>
              <SectionHeading number={6} title="Source and Consent" />
              <div className="space-y-5">

                <div data-error={errors.how_heard_about_cc ? true : undefined}>
                  <FormField
                    as="select"
                    label="How did you first hear about Covenant Charge?"
                    required
                    value={form.how_heard_about_cc}
                    onChange={(e) => set("how_heard_about_cc", e.target.value)}
                    error={errors.how_heard_about_cc}
                  >
                    <option value="">Select an option</option>
                    {HOW_HEARD_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </FormField>
                </div>

                <div
                  className={`rounded-xl border-2 p-5 transition-colors ${
                    consent ? "border-covenant-green bg-covenant-green/5" : "border-slate-200"
                  }`}
                  data-error={errors.consent_given ? true : undefined}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setErrors((err) => ({ ...err, consent_given: undefined }));
                      }}
                      className="mt-1 accent-covenant-green flex-shrink-0"
                    />
                    <span className="font-sans text-sm text-covenant-dark leading-relaxed">
                      By submitting this form, I confirm that I have the authority to initiate this
                      inquiry or have done so with the awareness of appropriate leadership, and I
                      consent to Covenant Charge using this information to prepare a preliminary
                      site assessment.
                      <span className="text-covenant-green ml-1">*</span>
                    </span>
                  </label>
                  {errors.consent_given && (
                    <p className="font-sans text-xs text-red-500 mt-2 ml-7">{errors.consent_given}</p>
                  )}
                </div>

              </div>
            </section>

          </div>

          {/* API error */}
          {apiError && (
            <div className="mt-5 rounded-xl bg-red-50 border border-red-200 p-4">
              <p className="font-sans text-sm text-red-700">{apiError}</p>
            </div>
          )}

          {/* Submit */}
          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit Qualifier"}
            </Button>
            <p className="font-sans text-xs text-covenant-muted text-center mt-3">
              Required fields are marked with an asterisk (<span className="text-covenant-green">*</span>).
              Your information is used only to evaluate fit and will never be sold or shared.
            </p>
          </div>

        </form>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-2">
          <LogoMark size="sm" showWordmark />
          <p className="font-sans text-xs text-covenant-muted">
            covenantcharge.com &nbsp;|&nbsp; info@covenantcharge.com
          </p>
        </div>

      </div>
    </div>
  );
}
