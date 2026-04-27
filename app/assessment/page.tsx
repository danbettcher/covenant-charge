"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";
import {
  DEFAULT_DATA, getActiveSections, SECTION_TITLES,
  type AssessmentData,
} from "./types";
import { Section0  } from "./sections/Section0";
import { Section1  } from "./sections/Section1";
import { Section2  } from "./sections/Section2";
import { Section3  } from "./sections/Section3";
import { Section4  } from "./sections/Section4";
import { Section5  } from "./sections/Section5";
import { Section6  } from "./sections/Section6";
import { Section7  } from "./sections/Section7";
import { Section8  } from "./sections/Section8";
import { Section9  } from "./sections/Section9";
import { Section10 } from "./sections/Section10";
import { Section11 } from "./sections/Section11";
import { Section12 } from "./sections/Section12";

const SECTION_COMPONENTS: Record<number, React.ComponentType<{
  data: AssessmentData;
  onChange: <K extends keyof AssessmentData>(field: K, value: AssessmentData[K]) => void;
  errors: Record<string, string>;
  submissionId: string;
}>> = {
  0: Section0, 1: Section1, 2: Section2, 3: Section3,
  4: Section4, 5: Section5, 6: Section6, 7: Section7,
  8: Section8, 9: Section9, 10: Section10, 11: Section11, 12: Section12,
};

// ─── Save and Continue Modal ──────────────────────────────────────────────────

function SaveModal({ submissionId, email, onClose }: {
  submissionId: string;
  email: string;
  onClose: () => void;
}) {
  const [inputEmail, setInputEmail] = useState(email);
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [copied, setCopied]       = useState(false);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://covenantcharge.com";
  const resumeUrl = `${baseUrl}/assessment?resume=${submissionId}`;

  async function sendEmail() {
    if (!inputEmail) return;
    setSending(true);
    try {
      await fetch("/api/assessment/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputEmail, submissionId }),
      });
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(resumeUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <h3 className="font-serif font-bold text-xl text-covenant-blue mb-2">Save and Continue Later</h3>
        <p className="font-sans text-sm text-covenant-muted mb-5 leading-relaxed">
          Your progress is already saved. Use this link to return from any device.
        </p>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            readOnly
            value={resumeUrl}
            className="flex-1 font-sans text-xs text-covenant-muted bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 truncate"
          />
          <Button variant="outline" size="sm" onClick={copyLink}>
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="font-sans text-sm font-medium text-covenant-dark mb-2">Email the link to yourself</p>
          {sent ? (
            <p className="font-sans text-sm text-covenant-green">Link sent to {inputEmail}</p>
          ) : (
            <div className="flex gap-2">
              <input
                type="email"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 font-sans text-sm text-covenant-dark bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-covenant-green focus:border-transparent"
              />
              <Button variant="primary" size="sm" onClick={sendEmail} disabled={sending || !inputEmail}>
                {sending ? "Sending…" : "Send"}
              </Button>
            </div>
          )}
        </div>

        <button onClick={onClose} className="mt-4 w-full font-sans text-sm text-covenant-muted hover:text-covenant-dark transition-colors">
          Close
        </button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const router = useRouter();
  const [submissionId, setSubmissionId] = useState("");
  const [data, setData]                 = useState<AssessmentData>(DEFAULT_DATA);
  const [sectionIdx, setSectionIdx]     = useState(0);
  const [errors, setErrors]             = useState<Record<string, string>>({});
  const [lastSaved, setLastSaved]       = useState<Date | null>(null);
  const [saving, setSaving]             = useState(false);
  const [submitting, setSubmitting]     = useState(false);
  const [apiError, setApiError]         = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [hydrated, setHydrated]         = useState(false);
  const saveInProgress                  = useRef(false);
  const mainRef                         = useRef<HTMLDivElement>(null);

  // ── On mount: determine submission_id, rehydrate if resuming ──
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resumeId = params.get("resume");
    const storedId = localStorage.getItem("cc_assessment_id");
    const id = resumeId ?? storedId ?? crypto.randomUUID();

    setSubmissionId(id);
    localStorage.setItem("cc_assessment_id", id);

    if (resumeId ?? storedId) {
      fetch(`/api/assessment/fetch?id=${id}`)
        .then(r => r.ok ? r.json() : null)
        .then((row: Record<string, unknown> | null) => {
          if (row && row.status !== "submitted") {
            // Strip meta columns, rehydrate form fields
            const { id: _id, submission_id: _sid, status: _s, created_at: _c,
                    updated_at: _u, submitted_at: _sub, ...fields } = row;
            void _id; void _sid; void _s; void _c; void _u; void _sub;
            setData(prev => ({ ...prev, ...fields }));
          }
          setHydrated(true);
        })
        .catch(() => setHydrated(true));
    } else {
      setHydrated(true);
    }
  }, []);

  // ── Auto-save every 30 seconds ──
  const doSave = useCallback(async (currentData: AssessmentData, id: string) => {
    if (!id || saveInProgress.current) return;
    saveInProgress.current = true;
    setSaving(true);
    try {
      const res = await fetch("/api/assessment/autosave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId: id, data: currentData }),
      });
      if (res.ok) setLastSaved(new Date());
    } catch { /* silent */ }
    finally { saveInProgress.current = false; setSaving(false); }
  }, []);

  // Store latest data/id in refs so the interval always uses current values
  const dataRef = useRef(data);
  const idRef   = useRef(submissionId);
  useEffect(() => { dataRef.current = data; }, [data]);
  useEffect(() => { idRef.current = submissionId; }, [submissionId]);

  useEffect(() => {
    if (!hydrated) return;
    const timer = setInterval(() => doSave(dataRef.current, idRef.current), 30_000);
    return () => clearInterval(timer);
  }, [hydrated, doSave]);

  // ── Computed section list ──
  const activeSections = getActiveSections(data.sec_0_1);
  const clampedIdx     = Math.min(sectionIdx, activeSections.length - 1);
  const currentSection = activeSections[clampedIdx];
  const progress       = Math.round(((clampedIdx + 1) / activeSections.length) * 100);
  const isFirst        = clampedIdx === 0;
  const isLast         = clampedIdx === activeSections.length - 1;

  function onChange<K extends keyof AssessmentData>(field: K, value: AssessmentData[K]) {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const n = { ...prev }; delete n[field as string]; return n; });
  }

  function scrollToTop() {
    mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goNext() {
    if (clampedIdx < activeSections.length - 1) {
      setSectionIdx(clampedIdx + 1);
      scrollToTop();
    }
  }

  function goBack() {
    if (clampedIdx > 0) {
      setSectionIdx(clampedIdx - 1);
      scrollToTop();
    }
  }

  async function handleSubmit() {
    setApiError("");
    // Client-side required field check
    const newErrors: Record<string, string> = {};
    if (!data.sec_0_1.length) newErrors.sec_0_1 = "Please select at least one service";
    if (!data.sec_1_1.trim()) newErrors.sec_1_1 = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.sec_1_3)) newErrors.sec_1_3 = "Valid email required";
    if (!/^\+?[\d\s\-().]{7,}$/.test(data.sec_1_4)) newErrors.sec_1_4 = "Valid phone number required";
    if (!data.sec_1_6.trim()) newErrors.sec_1_6 = "Institution name is required";
    if (!data.sec_1_7) newErrors.sec_1_7 = "Institution type is required";
    if (!data.sec_2_1.trim()) newErrors.sec_2_1 = "Street address is required";
    if (!data.sec_2_2.trim()) newErrors.sec_2_2 = "City, State, ZIP is required";
    if (!data.sec_2_3) newErrors.sec_2_3 = "Ownership status is required";
    if (!data.sec_10_5) newErrors.sec_10_5 = "You must confirm consent to submit";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Navigate to the first section with an error
      const errorFields = Object.keys(newErrors);
      const sectionForError: Record<string, number> = {
        sec_0_1: 0, sec_1_1: 1, sec_1_3: 1, sec_1_4: 1, sec_1_6: 1, sec_1_7: 1,
        sec_2_1: 2, sec_2_2: 2, sec_2_3: 2, sec_10_5: 10,
      };
      for (const f of errorFields) {
        const targetSection = sectionForError[f];
        if (targetSection !== undefined) {
          const idx = activeSections.indexOf(targetSection);
          if (idx !== -1) { setSectionIdx(idx); scrollToTop(); break; }
        }
      }
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submissionId, data }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(json.error ?? "Submission failed");
      }
      localStorage.removeItem("cc_assessment_id");
      router.push(`/assessment/thank-you?id=${submissionId}`);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const SectionComponent = SECTION_COMPONENTS[currentSection];

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-covenant-light flex items-center justify-center">
        <div className="font-sans text-covenant-muted">Loading…</div>
      </div>
    );
  }

  const savedLabel = (() => {
    if (saving) return "Saving…";
    if (!lastSaved) return "";
    return `Saved at ${lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  })();

  return (
    <div className="min-h-screen bg-covenant-light font-sans">
      {/* Gold top bar */}
      <div className="h-1 bg-covenant-gold" />

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <LogoMark size="sm" showWordmark />
          <div className="flex items-center gap-4 min-w-0">
            {savedLabel && (
              <span className="font-sans text-xs text-covenant-muted hidden sm:block flex-shrink-0">
                {savedLabel}
              </span>
            )}
            <button
              type="button"
              onClick={() => { doSave(data, submissionId); setShowSaveModal(true); }}
              className="font-sans text-xs text-covenant-blue underline underline-offset-2 flex-shrink-0"
            >
              Save & continue later
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="font-sans text-xs text-covenant-muted">
              Section {clampedIdx + 1} of {activeSections.length}: {SECTION_TITLES[currentSection]}
            </span>
            <span
              className="font-sans text-xs font-semibold text-covenant-green"
              aria-label={`${progress} percent complete`}
            >
              {progress}%
            </span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-full bg-covenant-green rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Page title (above the card, scrolls out) */}
      <div ref={mainRef} className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <p className="font-sans text-xs tracking-widest uppercase text-covenant-green font-semibold mb-1">
          Property Site Assessment
        </p>
        <h1 className="font-serif font-bold text-2xl text-covenant-blue">
          Covenant Charge Site Assessment
        </h1>
      </div>

      {/* Form card */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
          {SectionComponent && (
            <SectionComponent
              data={data}
              onChange={onChange}
              errors={errors}
              submissionId={submissionId}
            />
          )}
        </div>

        {/* API error */}
        {apiError && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4">
            <p className="font-sans text-sm text-red-700">{apiError}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="md"
            onClick={goBack}
            disabled={isFirst}
            className={isFirst ? "invisible" : ""}
            type="button"
          >
            ← Back
          </Button>

          {isLast ? (
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              disabled={submitting}
              type="button"
            >
              {submitting ? "Submitting…" : "Submit Assessment"}
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={goNext}
              type="button"
            >
              Continue →
            </Button>
          )}
        </div>

        <p className="font-sans text-xs text-covenant-muted text-center mt-4">
          Required fields are marked with <span className="text-covenant-green">*</span>. Your answers save automatically every 30 seconds.
        </p>
      </div>

      {showSaveModal && (
        <SaveModal
          submissionId={submissionId}
          email={data.sec_1_3}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}
