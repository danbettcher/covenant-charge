"use client";

import { useState } from "react";
import { z } from "zod";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  institutionName: z.string().min(2, "Institution name is required"),
  institutionType: z.string().min(1, "Please select an institution type"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  parkingSpaces: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

const SERVICES = [
  { id: "ev", label: "EV Fast Charging" },
  { id: "bess", label: "Battery Storage (BESS)" },
  { id: "solar", label: "Solar (PV)" },
  { id: "unsure", label: "Not Sure — Help Me Decide" },
];

export function InterestFormSection() {
  const [form, setForm] = useState<Partial<FormData>>({});
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function toggleService(id: string) {
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Errors = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0] as keyof FormData;
        errs[key] = err.message;
      });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, services }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setApiError("Something went wrong. Please try again or email us directly at info@covenantcharge.com.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="interest-form" className="bg-covenant-blue py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-covenant-green/20 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-serif font-bold text-3xl text-white mb-4">Thank you for reaching out.</h2>
          <p className="font-sans text-lg text-white/70 leading-relaxed">
            We will be in touch within 2 business days to schedule your no-cost site assessment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="interest-form" className="bg-covenant-blue py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div className="text-white">
            <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-4">
              No cost. No obligation.
            </p>
            <h2 className="font-serif font-bold text-4xl md:text-5xl leading-tight">
              Ready to Explore a Partnership?
            </h2>
            <p className="mt-6 font-sans text-lg text-white/70 leading-relaxed">
              Tell us about your institution and we will schedule a no-obligation site assessment. Most institutions receive a preliminary revenue projection within two weeks.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Free site assessment — no commitment required",
                "Preliminary revenue projection within 2 weeks",
                "We evaluate EV, solar, and storage potential together",
                "No pressure, no jargon — just a clear picture of what is possible",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/70">
                  <span className="text-covenant-green mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="font-serif font-semibold text-2xl text-covenant-blue mb-6">
              Request a Site Assessment
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              <FormField
                label="Institution Name"
                required
                placeholder="St. John's Community Church"
                value={form.institutionName ?? ""}
                onChange={(e) => set("institutionName", (e.target as HTMLInputElement).value)}
                error={errors.institutionName}
              />
              <FormField
                as="select"
                label="Institution Type"
                required
                value={form.institutionType ?? ""}
                onChange={(e) => set("institutionType", (e.target as HTMLSelectElement).value)}
                error={errors.institutionType}
              >
                <option value="">Select type...</option>
                <option>Church / Congregation</option>
                <option>School / University</option>
                <option>Ministry / Nonprofit</option>
                <option>Synagogue / Jewish Community</option>
                <option>Mosque / Islamic Center</option>
                <option>Other Faith Organization</option>
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Contact Name"
                  required
                  placeholder="Jane Smith"
                  value={form.contactName ?? ""}
                  onChange={(e) => set("contactName", (e.target as HTMLInputElement).value)}
                  error={errors.contactName}
                />
                <FormField
                  label="Phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone ?? ""}
                  onChange={(e) => set("phone", (e.target as HTMLInputElement).value)}
                />
              </div>

              <FormField
                label="Email"
                required
                type="email"
                placeholder="jane@institution.org"
                value={form.email ?? ""}
                onChange={(e) => set("email", (e.target as HTMLInputElement).value)}
                error={errors.email}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="City"
                  required
                  placeholder="Nashville"
                  value={form.city ?? ""}
                  onChange={(e) => set("city", (e.target as HTMLInputElement).value)}
                  error={errors.city}
                />
                <FormField
                  label="State"
                  required
                  placeholder="TN"
                  value={form.state ?? ""}
                  onChange={(e) => set("state", (e.target as HTMLInputElement).value)}
                  error={errors.state}
                />
              </div>

              <FormField
                as="select"
                label="Approximate Parking Spaces"
                value={form.parkingSpaces ?? ""}
                onChange={(e) => set("parkingSpaces", (e.target as HTMLSelectElement).value)}
              >
                <option value="">Select range...</option>
                <option>Fewer than 50</option>
                <option>50–150</option>
                <option>150–300</option>
                <option>300+</option>
              </FormField>

              {/* Services interested in */}
              <div className="flex flex-col gap-2">
                <p className="font-sans text-sm font-medium text-covenant-dark">
                  Services interested in
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <label
                      key={s.id}
                      className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                        services.includes(s.id)
                          ? "border-covenant-green bg-covenant-green/5"
                          : "border-slate-200 hover:border-covenant-green/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={services.includes(s.id)}
                        onChange={() => toggleService(s.id)}
                        className="accent-covenant-green"
                      />
                      <span className="font-sans text-sm text-covenant-dark">{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <FormField
                as="textarea"
                label="Anything else we should know?"
                placeholder="Tell us about your property, any specific goals, or questions you have."
                value={form.message ?? ""}
                onChange={(e) => set("message", (e.target as HTMLTextAreaElement).value)}
              />

              {apiError && (
                <p className="font-sans text-sm text-red-500 text-center">{apiError}</p>
              )}
              <Button type="submit" variant="primary" size="lg" className="w-full justify-center mt-2" disabled={submitting}>
                {submitting ? "Sending…" : "Request a Site Assessment"}
              </Button>

              <p className="font-sans text-xs text-covenant-muted text-center">
                We will respond within 2 business days. No spam, no pressure.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
