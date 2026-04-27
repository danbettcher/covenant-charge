import type { Metadata } from "next";
import { LogoMark } from "@/components/ui/LogoMark";

export const metadata: Metadata = {
  title: "Covenant Charge — One-Pager",
  description:
    "Generate passive revenue from your parking lot. Covenant Charge installs and operates EV fast charging for faith institutions. Institution-owned or CC-funded, with full transparency.",
};

const steps = [
  {
    num: "01",
    title: "We Assess Your Site",
    body: "We evaluate grid capacity, solar exposure, battery potential, and charger placement. Free, no obligation.",
  },
  {
    num: "02",
    title: "We Install & Manage",
    body: "Permitting, procurement, installation, utility interconnection, and all ongoing maintenance. We handle it.",
  },
  {
    num: "03",
    title: "You Receive Revenue",
    body: "Monthly direct deposit to your institution plus a transparent performance report. No surprises, ever.",
  },
];

const differentiators = [
  {
    title: "Flexible Ownership",
    body: "Own the equipment through CC financing and build equity, or have CC fund it entirely with no financial commitment. You choose.",
  },
  {
    title: "Full Transparency",
    body: "Monthly reports with every metric. No hidden fees, no opaque billing, no surprises.",
  },
  {
    title: "Long-Term Partnership",
    body: "15–20 year agreements built for institutions that think in generations, not quarters.",
  },
  {
    title: "Mission Alignment",
    body: "EV drivers actively seek values-aligned charging locations. Your campus becomes a preferred destination.",
  },
];

const stats = [
  { value: "2 paths", label: "Institution-owned or CC-funded" },
  { value: "15–20 yr", label: "Long-term agreements" },
  { value: "100%", label: "Transparent reporting" },
];

const questions = [
  {
    q: "What if our parking lot is small?",
    a: "We assess sites of all sizes. Even a modest lot can generate meaningful revenue. We'll tell you honestly whether yours is a strong candidate.",
  },
  {
    q: "What happens if something breaks?",
    a: "CC handles all maintenance and operations for the life of the agreement, regardless of which ownership path you choose.",
  },
  {
    q: "Are we locked in?",
    a: "Agreements include fair exit provisions. We believe a partnership only works when both parties benefit. Our contracts are written that way.",
  },
];

export default function OnePager() {
  return (
    <div className="min-h-screen bg-covenant-light font-sans print:bg-white">
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          @page { margin: 0.5in; size: letter portrait; }
        }
      `}</style>

      {/* Gold authority bar — top signal */}
      <div className="h-1 bg-covenant-gold print:h-0.5" />

      <div className="max-w-4xl mx-auto px-8 py-10 print:py-0 print:px-0">

        {/* ── HEADER ── */}
        <header className="flex items-center justify-between border-b border-covenant-blue/15 pb-5 mb-8 print:mb-3">
          <LogoMark size="md" showWordmark />
          <div className="text-right">
            <p className="font-sans text-xs tracking-widest uppercase text-covenant-muted">
              EV Charging · Solar · Battery Storage
            </p>
            <p className="font-sans text-xs text-covenant-muted mt-0.5">covenantcharge.com</p>
          </div>
        </header>

        {/* ── HEADLINE — warm gradient bg, large type, eyebrow ── */}
        <section className="relative rounded-2xl bg-gradient-to-br from-covenant-cream via-white to-covenant-light px-8 py-8 mb-7 print:bg-white print:rounded-none print:px-0 print:py-0 print:mb-3">
          {/* Decorative bolt watermark */}
          <svg
            viewBox="0 0 40 40"
            className="absolute right-6 top-1/2 -translate-y-1/2 w-20 h-20 opacity-[0.06] print:hidden"
            aria-hidden="true"
          >
            <path d="M 22 9 L 15 22 L 20 22 L 16 33 L 27 18 L 22 18 Z" fill="#27AE60" />
          </svg>

          <p className="font-sans text-xs tracking-widest uppercase text-covenant-green font-semibold mb-3 print:mb-1">
            Long-Term Energy Revenue for Faith Institutions
          </p>
          <h1 className="font-serif font-bold text-5xl print:text-2xl text-covenant-blue leading-tight print:leading-snug mb-3 print:mb-2 max-w-2xl">
            Generate Passive Revenue from Your Parking Lot
          </h1>
          <p className="font-sans text-base print:text-sm text-covenant-dark/75 leading-relaxed print:leading-snug max-w-xl">
            Covenant Charge installs, operates, and maintains EV fast charging on faith institution
            campuses. You receive a monthly direct deposit and a clear report. We handle everything else.
          </p>
        </section>

        {/* ── PROBLEM / SOLUTION (2-col) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-5 mb-7 print:mb-3 break-inside-avoid">
          {/* Challenge — gold left border */}
          <div className="bg-covenant-cream rounded-xl p-6 print:p-3 border-l-4 border-covenant-gold">
            <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-covenant-muted mb-2 print:mb-1">
              The Challenge
            </h2>
            <p className="font-sans text-sm text-covenant-dark leading-relaxed print:leading-snug">
              Faith institutions own valuable real estate: parking lots that sit underutilized
              most of the week. EV adoption is accelerating, financial pressures are real,
              and there&apos;s no clear path to new non-dues revenue without taking on capital risk.
            </p>
          </div>

          {/* Solution — blue with green left border */}
          <div className="bg-covenant-blue rounded-xl p-6 print:p-3 border-l-4 border-covenant-green">
            <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-white/50 mb-2 print:mb-1">
              The Solution
            </h2>
            <p className="font-sans text-sm text-white leading-relaxed print:leading-snug">
              Covenant Charge turns your property into a long-term revenue stream. Own the
              equipment through CC financing and build equity, or have CC fund it entirely
              at no cost to you. Either way, CC handles everything and you receive a monthly
              payment and transparent report.
            </p>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section className="mb-7 print:mb-3 break-inside-avoid">
          <div className="flex items-center gap-3 mb-5 print:mb-2">
            <h2 className="font-serif font-bold text-xl print:text-sm text-covenant-blue">How It Works</h2>
            <div className="flex-1 h-px bg-covenant-blue/15" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-6 print:gap-3">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line between steps (screen only) */}
                {i < 2 && (
                  <div className="hidden md:block print:hidden absolute top-5 left-full w-6 h-px bg-covenant-gold/40 -translate-y-1/2 z-10" />
                )}
                <div className="font-serif font-bold text-4xl print:text-lg text-covenant-gold leading-none mb-2 print:mb-1">{step.num}</div>
                <h3 className="font-serif font-semibold text-sm print:text-xs text-covenant-dark mb-1">{step.title}</h3>
                <p className="font-sans text-sm print:text-xs text-covenant-muted leading-relaxed print:leading-snug">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY COVENANT CHARGE ── */}
        <section className="mb-7 print:mb-3 break-inside-avoid">
          <div className="flex items-center gap-3 mb-5 print:mb-2">
            <h2 className="font-serif font-bold text-xl print:text-sm text-covenant-blue">Why Covenant Charge</h2>
            <div className="flex-1 h-px bg-covenant-blue/15" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 print:gap-2">
            {differentiators.map((item) => (
              <div key={item.title} className="flex gap-3 print:gap-2">
                {/* Bold accent dot instead of thin line */}
                <div className="w-2 h-2 print:w-1.5 print:h-1.5 rounded-full bg-covenant-green flex-shrink-0 mt-1.5 print:mt-1" />
                <div>
                  <p className="font-sans font-semibold text-sm print:text-xs text-covenant-dark">{item.title}</p>
                  <p className="font-sans text-sm print:text-xs text-covenant-muted leading-relaxed print:leading-snug mt-0.5">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS BAR — navy with bolt watermark ── */}
        <section className="relative bg-covenant-navy rounded-2xl px-8 py-6 mb-7 print:mb-3 print:py-3 print:px-4 break-inside-avoid overflow-hidden">
          {/* Large bolt watermark */}
          <svg
            viewBox="0 0 40 40"
            className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-24 opacity-[0.08] print:hidden"
            aria-hidden="true"
          >
            <path d="M 22 9 L 15 22 L 20 22 L 16 33 L 27 18 L 22 18 Z" fill="#D4AC0D" />
          </svg>
          <div className="relative grid grid-cols-3 gap-6 text-center">
            {stats.map((item) => (
              <div key={item.label}>
                <div className="font-serif font-bold text-3xl print:text-xl text-covenant-gold">{item.value}</div>
                <div className="font-sans text-xs text-white/60 mt-1 leading-snug">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMMON QUESTIONS — screen only ── */}
        <section className="mb-7 print:hidden">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="font-serif font-bold text-xl text-covenant-blue">Common Questions</h2>
            <div className="flex-1 h-px bg-covenant-blue/15" />
          </div>
          <div className="space-y-4">
            {questions.map((item) => (
              <div key={item.q} className="flex gap-3 text-sm">
                <span className="font-sans font-bold text-covenant-green flex-shrink-0 mt-0.5">Q.</span>
                <div>
                  <p className="font-sans font-semibold text-covenant-dark">{item.q}</p>
                  <p className="font-sans text-covenant-muted leading-relaxed mt-0.5">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA — gradient overlay for depth ── */}
        <section className="relative bg-covenant-green rounded-2xl p-8 print:p-4 mb-6 print:mb-3 text-center break-inside-avoid overflow-hidden">
          {/* Subtle radial highlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.12),_transparent_70%)] print:hidden" />
          <div className="relative">
            <h2 className="font-serif font-bold text-2xl print:text-lg text-white mb-2">
              Request a Free Site Assessment
            </h2>
            <p className="font-sans text-white/80 text-sm mb-5 print:hidden max-w-sm mx-auto">
              No obligation. No cost. We&apos;ll tell you honestly whether your site is a strong candidate
              Usually within two business days.
            </p>
            <a
              href="/qualify"
              className="print:hidden inline-block bg-white text-covenant-green font-sans font-semibold text-sm px-8 py-3 rounded-lg shadow-sm hover:bg-covenant-cream transition-colors"
            >
              Get Started at covenantcharge.com
            </a>
            <p className="hidden print:block font-sans font-semibold text-white text-base tracking-wide">
              covenantcharge.com
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-covenant-blue/15 pt-4 print:pt-2 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-sans text-xs text-covenant-muted">
            © 2025 Covenant Charge &nbsp;·&nbsp; covenantcharge.com &nbsp;·&nbsp; info@covenantcharge.com
          </p>
          <p className="font-sans text-xs text-covenant-muted italic">
            Projected revenue varies by site. All figures are estimates.
          </p>
        </footer>

      </div>
    </div>
  );
}
