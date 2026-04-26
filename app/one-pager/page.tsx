import type { Metadata } from "next";
import { LogoMark } from "@/components/ui/LogoMark";

export const metadata: Metadata = {
  title: "Covenant Charge — One-Pager",
  description:
    "Generate passive revenue from your parking lot. Covenant Charge installs and operates EV fast charging for faith institutions — institution-owned or CC-funded, with full transparency.",
};

const steps = [
  {
    num: "01",
    title: "We Assess Your Site",
    body: "We evaluate grid capacity, solar exposure, battery potential, and charger placement — free, no obligation.",
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
    body: "Own the equipment through CC financing and build equity, or have CC fund it entirely with no financial commitment. You choose what fits your institution.",
  },
  {
    title: "Full Transparency",
    body: "Monthly reports with every metric — no hidden fees, no opaque billing, no surprises.",
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
  { value: "2 paths", label: "Ownership options — institution-owned or CC-funded" },
  { value: "15–20 yr", label: "Long-term partnership agreements" },
  { value: "100%", label: "Transparent monthly reporting" },
];

const questions = [
  {
    q: "What if our parking lot is small?",
    a: "We assess sites of all sizes. Even a modest lot can generate meaningful revenue — we'll tell you honestly whether yours is a strong candidate.",
  },
  {
    q: "What happens if something breaks?",
    a: "It depends on which path you choose. Your institution can own the equipment through CC financing — building equity in a long-term asset — or CC can fund and own the equipment with no financial commitment from you. Either way, CC handles all maintenance and operations.",
  },
  {
    q: "Are we locked in?",
    a: "Agreements include fair exit provisions. We believe a partnership only works when both parties benefit — our contracts are written that way.",
  },
];

export default function OnePager() {
  return (
    <div className="min-h-screen bg-covenant-light font-sans print:bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12 print:py-6 print:px-10">

        {/* ── HEADER ── */}
        <header className="flex items-center justify-between border-b border-covenant-blue/20 pb-6 mb-10">
          <LogoMark size="md" showWordmark />
          <div className="text-right">
            <p className="font-sans text-xs tracking-widest uppercase text-covenant-muted">
              EV Charging · Solar · Battery Storage
            </p>
            <p className="font-sans text-xs text-covenant-muted mt-1">covenantcharge.com</p>
          </div>
        </header>

        {/* ── HEADLINE ── */}
        <section className="mb-10">
          {/* Outcome-focused headline: "Achieve X without Y" — copy-frameworks.md */}
          <h1 className="font-serif font-bold text-4xl text-covenant-blue leading-tight mb-4">
            Generate Passive Revenue from Your Parking Lot —<br />
            At No Cost and With Full Transparency
          </h1>
          <p className="font-sans text-lg text-covenant-dark/80 leading-relaxed max-w-2xl">
            Covenant Charge installs, operates, and maintains EV fast charging on faith institution
            campuses. You receive a monthly direct deposit and a clear report. We handle everything else.
          </p>
        </section>

        {/* ── PROBLEM / SOLUTION (2-col) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-covenant-cream rounded-xl p-6">
            <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-covenant-muted mb-3">
              The Challenge
            </h2>
            <p className="font-sans text-sm text-covenant-dark leading-relaxed">
              Faith institutions own valuable real estate — parking lots that sit underutilized most
              of the week. Meanwhile, EV adoption is accelerating rapidly, community members and
              visitors need reliable charging, and institutions face ongoing financial pressure
              without a clear path to new, non-dues revenue.
            </p>
          </div>

          <div className="bg-covenant-blue rounded-xl p-6">
            <h2 className="font-serif font-bold text-xs uppercase tracking-widest text-white/50 mb-3">
              The Solution
            </h2>
            <p className="font-sans text-sm text-white leading-relaxed">
              Covenant Charge turns your existing property into a long-term revenue stream. Two paths
              are available: your institution can own the equipment through CC financing and build
              equity in the asset, or CC can fund and own the equipment entirely with no financial
              commitment from you. Either way, CC handles all installation, operations, and
              maintenance — and you receive a monthly payment and a clear performance report.
            </p>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section className="mb-10">
          <h2 className="font-serif font-bold text-xl text-covenant-blue mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.num}>
                <div className="font-serif font-bold text-3xl text-covenant-gold mb-2">{step.num}</div>
                <h3 className="font-serif font-bold text-base text-covenant-dark mb-1">{step.title}</h3>
                <p className="font-sans text-sm text-covenant-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY COVENANT CHARGE ── */}
        <section className="mb-10">
          <h2 className="font-serif font-bold text-xl text-covenant-blue mb-6">
            Why Faith Institutions Choose Covenant Charge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {differentiators.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="w-1 min-h-full rounded-full bg-covenant-green flex-shrink-0" />
                <div>
                  <p className="font-sans font-semibold text-sm text-covenant-dark">{item.title}</p>
                  <p className="font-sans text-sm text-covenant-muted leading-relaxed mt-0.5">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="bg-covenant-navy rounded-xl px-8 py-6 mb-10">
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((item) => (
              <div key={item.label}>
                <div className="font-serif font-bold text-3xl text-covenant-gold">{item.value}</div>
                <div className="font-sans text-xs text-white/60 mt-1 leading-snug">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMMON QUESTIONS ── */}
        <section className="mb-10">
          <h2 className="font-serif font-bold text-xl text-covenant-blue mb-5">Common Questions</h2>
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

        {/* ── CTA ── */}
        <section className="bg-covenant-green rounded-xl p-8 mb-8 text-center">
          <h2 className="font-serif font-bold text-2xl text-white mb-2">
            Request a Free Site Assessment
          </h2>
          <p className="font-sans text-white/80 text-sm mb-5 max-w-md mx-auto">
            No obligation. No cost. We&apos;ll evaluate your site and tell you honestly whether it&apos;s
            a strong candidate — usually within two business days.
          </p>
          <a
            href="/#interest-form"
            className="inline-block bg-white text-covenant-green font-sans font-semibold text-sm px-8 py-3 rounded-lg hover:bg-covenant-cream transition-colors"
          >
            Get Started at covenantcharge.com
          </a>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-covenant-blue/20 pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="font-sans text-xs text-covenant-muted">
            © 2025 Covenant Charge &nbsp;·&nbsp; covenantcharge.com &nbsp;·&nbsp; info@covenantcharge.com
          </p>
          <p className="font-sans text-xs text-covenant-muted">
            Projected revenue varies by site. All figures are estimates.
          </p>
        </footer>

      </div>
    </div>
  );
}
