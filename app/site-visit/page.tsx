"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";
import {
  DEFAULT_SITE_VISIT_DATA,
  SECTION_LABELS,
  type SiteVisitData,
} from "./types";
import { Section0 } from "./sections/Section0";
import { Section1 } from "./sections/Section1";
import { Section2 } from "./sections/Section2";
import { Section3 } from "./sections/Section3";
import { Section4 } from "./sections/Section4";
import { Section5 } from "./sections/Section5";

const LS_KEY          = "cc_site_visit_draft";
const LS_SESSION_KEY  = "cc_site_visit_session_id";
const LS_VISIT_ID_KEY = "cc_site_visit_id";
const TOTAL_SECTIONS  = 6;

function generateVisitId(): string {
  const d   = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(16).slice(2, 6).toUpperCase();
  return `SV-${ymd}-${rand}`;
}

const SECTION_COMPONENTS = [
  Section0, Section1, Section2, Section3, Section4, Section5,
] as const;

// Required fields and which section they belong to
const REQUIRED_FIELDS: Array<{ key: keyof SiteVisitData; section: number; label: string }> = [
  { key: "institution_name", section: 0, label: "Institution Name" },
  { key: "site_address",     section: 0, label: "Site Address" },
  { key: "visit_date",       section: 0, label: "Date of Visit" },
  { key: "assessed_by",      section: 0, label: "Assessed By" },
  { key: "contact_name",     section: 0, label: "Contact Name" },
  { key: "contact_phone",    section: 0, label: "Contact Phone" },
  { key: "contact_email",    section: 0, label: "Contact Email" },
  { key: "followup_needed",  section: 0, label: "Follow-up Visit Needed" },
  { key: "site_rating",      section: 5, label: "Site Rating" },
  { key: "rating_rationale", section: 5, label: "Rating Rationale" },
];

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 18 18" fill="none"
      className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-sans text-xs font-semibold">
      {count} required
    </span>
  );
}

export default function SiteVisitPage() {
  const [data, setData]               = useState<SiteVisitData>(DEFAULT_SITE_VISIT_DATA);
  const [openSection, setOpenSection] = useState(0);
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [submitted, setSubmitted]     = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const [apiError, setApiError]       = useState("");
  const [hydrated, setHydrated]       = useState(false);
  const [draftMeta, setDraftMeta]     = useState<{ savedAt: string } | null>(null);
  const [lastSaved, setLastSaved]     = useState<Date | null>(null);
  const [sessionId, setSessionId]     = useState("");
  const [visitId, setVisitId]         = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { data: SiteVisitData; savedAt: string };
        setDraftMeta({ savedAt: parsed.savedAt });
      }
    } catch { /* ignore */ }

    // Session ID for grouping photos in storage — persists across draft discards
    const existing = localStorage.getItem(LS_SESSION_KEY);
    const id = existing ?? crypto.randomUUID();
    if (!existing) localStorage.setItem(LS_SESSION_KEY, id);
    setSessionId(id);

    // Visit ID — human-readable reference shown in the header
    const existingVisitId = localStorage.getItem(LS_VISIT_ID_KEY);
    const vid = existingVisitId ?? generateVisitId();
    if (!existingVisitId) localStorage.setItem(LS_VISIT_ID_KEY, vid);
    setVisitId(vid);

    setHydrated(true);
  }, []);

  function restoreDraft() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const { data: saved } = JSON.parse(raw) as { data: SiteVisitData; savedAt: string };
        setData(saved);
      }
    } catch { /* ignore */ }
    setDraftMeta(null);
  }

  function discardDraft() {
    localStorage.removeItem(LS_KEY);
    setDraftMeta(null);
  }

  function onChange<K extends keyof SiteVisitData>(field: K, value: SiteVisitData[K]) {
    setData(prev => {
      const next = { ...prev, [field]: value };
      setErrors(e => { const n = { ...e }; delete n[field as string]; return n; });
      try {
        const savedAt = new Date().toISOString();
        localStorage.setItem(LS_KEY, JSON.stringify({ data: next, savedAt }));
        setLastSaved(new Date());
      } catch { /* ignore */ }
      return next;
    });
  }

  function validate(): Record<string, string> {
    const newErrors: Record<string, string> = {};
    for (const { key, label } of REQUIRED_FIELDS) {
      const val = data[key];
      if (!val || (typeof val === "string" && !val.trim())) {
        newErrors[key as string] = `${label} is required`;
      }
    }
    if (data.followup_needed === "Yes" && !data.followup_reason.trim()) {
      newErrors.followup_reason = "Required when follow-up is needed";
    }
    return newErrors;
  }

  function errorCountForSection(idx: number): number {
    return REQUIRED_FIELDS.filter(f => f.section === idx && errors[f.key as string]).length;
  }

  async function handleSubmit() {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // Open first section with errors
      const firstBad = REQUIRED_FIELDS.find(f => newErrors[f.key as string]);
      if (firstBad) setOpenSection(firstBad.section);
      return;
    }

    setApiError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/site-visit/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, submitted_by: data.assessed_by, visit_id: visitId }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(json.error ?? "Submission failed");
      }
      localStorage.removeItem(LS_KEY);
      localStorage.removeItem(LS_SESSION_KEY);
      localStorage.removeItem(LS_VISIT_ID_KEY);
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-covenant-light flex items-center justify-center">
        <div className="font-sans text-covenant-muted text-sm">Loading...</div>
      </div>
    );
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-covenant-light flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-full bg-covenant-green/10 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="#27AE60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-serif font-bold text-xl text-covenant-blue mb-2">Assessment Submitted</h2>
          <p className="font-sans text-sm text-covenant-muted mb-6 leading-relaxed">
            {data.institution_name} has been added to your pipeline.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              size="md"
              type="button"
              onClick={() => {
                const newSession = crypto.randomUUID();
                const newVisitId = generateVisitId();
                localStorage.setItem(LS_SESSION_KEY, newSession);
                localStorage.setItem(LS_VISIT_ID_KEY, newVisitId);
                setSessionId(newSession);
                setVisitId(newVisitId);
                setData(DEFAULT_SITE_VISIT_DATA);
                setErrors({});
                setSubmitted(false);
                setOpenSection(0);
                setLastSaved(null);
              }}
            >
              Start a new assessment
            </Button>
            <a
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-covenant-blue underline underline-offset-2"
            >
              View in Notion
            </a>
          </div>
        </div>
      </div>
    );
  }

  const savedLabel = lastSaved
    ? `Saved ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    : "";

  // ── Main form ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-covenant-light font-sans">
      <div className="h-1 bg-covenant-gold" />

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <LogoMark size="sm" showWordmark />
          <div className="flex items-center gap-3 min-w-0">
            {savedLabel && (
              <span className="hidden sm:block font-sans text-xs text-covenant-muted flex-shrink-0">
                {savedLabel}
              </span>
            )}
            <span className="font-sans text-xs text-covenant-muted flex-shrink-0">
              Section {openSection + 1} of {TOTAL_SECTIONS}
            </span>
          </div>
        </div>

        {/* Visit context strip */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-2 flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs font-semibold text-covenant-blue flex-shrink-0">
            {visitId}
          </span>
          {data.institution_name.trim() && (
            <>
              <span className="text-slate-300 flex-shrink-0">·</span>
              <span className="font-sans text-xs text-covenant-dark truncate">
                {data.institution_name.trim()}
              </span>
            </>
          )}
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-3">
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-covenant-green rounded-full transition-all duration-500"
              style={{ width: `${((openSection + 1) / TOTAL_SECTIONS) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Draft restore banner */}
      {draftMeta && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="font-sans text-sm text-amber-800 flex-1">
              You have an unsaved assessment from{" "}
              {new Date(draftMeta.savedAt).toLocaleString([], {
                month: "short", day: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}.
              Continue where you left off?
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <Button variant="outline" size="sm" type="button" onClick={discardDraft}>
                Discard
              </Button>
              <Button variant="primary" size="sm" type="button" onClick={restoreDraft}>
                Restore
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Page title */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-3">
        <p className="font-sans text-xs tracking-widest uppercase text-covenant-green font-semibold mb-1">
          Internal Field Assessment
        </p>
        <h1 className="font-serif font-bold text-2xl text-covenant-blue">
          Site Visit Checklist
        </h1>
        <p className="font-sans text-xs text-covenant-muted mt-1">
          For Covenant Charge staff only. Not linked from public navigation.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-12 space-y-3">
        {SECTION_COMPONENTS.map((SectionComponent, idx) => {
          const isOpen  = openSection === idx;
          const isLast  = idx === TOTAL_SECTIONS - 1;
          const errCount = errorCountForSection(idx);

          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-shadow duration-200 ${
                isOpen ? "border-slate-200 shadow-sm" : "border-slate-100"
              }`}
            >
              {/* Section header button */}
              <button
                type="button"
                onClick={() => setOpenSection(idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-sans font-bold text-xs transition-colors ${
                      isOpen
                        ? "bg-covenant-blue text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {idx}
                  </span>
                  <span
                    className={`font-sans font-semibold text-sm truncate ${
                      isOpen ? "text-covenant-blue" : "text-covenant-dark"
                    }`}
                  >
                    {SECTION_LABELS[idx]}
                  </span>
                  <ErrorBadge count={errCount} />
                </div>
                <ChevronDown open={isOpen} />
              </button>

              {/* Section content */}
              {isOpen && (
                <div className="px-5 pb-6 border-t border-slate-100 pt-5">
                  <SectionComponent data={data} onChange={onChange} errors={errors} sessionId={sessionId} />

                  {/* Section footer navigation */}
                  <div className="mt-6 flex items-center justify-between">
                    {idx > 0 ? (
                      <button
                        type="button"
                        onClick={() => setOpenSection(idx - 1)}
                        className="font-sans text-sm text-covenant-muted hover:text-covenant-dark transition-colors"
                      >
                        ← Previous
                      </button>
                    ) : (
                      <div />
                    )}

                    {isLast ? (
                      <Button
                        variant="primary"
                        size="md"
                        type="button"
                        onClick={handleSubmit}
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Submit Assessment"}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        type="button"
                        onClick={() => setOpenSection(idx + 1)}
                      >
                        Next Section →
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* API-level error */}
        {apiError && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4">
            <p className="font-sans text-sm text-red-700">{apiError}</p>
          </div>
        )}

        <p className="font-sans text-xs text-covenant-muted text-center mt-2">
          Required fields are marked with{" "}
          <span className="text-covenant-green">*</span>.
          Progress saves automatically to this device.
        </p>
      </div>
    </div>
  );
}
