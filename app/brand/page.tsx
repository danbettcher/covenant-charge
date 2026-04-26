import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";

const colors = [
  {
    name: "Covenant Blue",
    hex: "#1B4F72",
    class: "bg-covenant-blue",
    usage: "Primary — navigation, headings, trust anchors",
    light: false,
  },
  {
    name: "Renewal Green",
    hex: "#27AE60",
    class: "bg-covenant-green",
    usage: "Accent — CTAs, bolts, success states, sustainability signal",
    light: false,
  },
  {
    name: "Covenant Gold",
    hex: "#D4AC0D",
    class: "bg-covenant-gold",
    usage: "Highlight — use sparingly. Banners, step numbers, accents.",
    light: true,
  },
  {
    name: "Cream",
    hex: "#F9F3DC",
    class: "bg-covenant-cream",
    usage: "Warm background — alternating sections, cards",
    light: true,
  },
  {
    name: "Light",
    hex: "#F7F9FC",
    class: "bg-covenant-light",
    usage: "Default page background",
    light: true,
  },
  {
    name: "Dark",
    hex: "#1A202C",
    class: "bg-covenant-dark",
    usage: "Body text, high-contrast elements",
    light: false,
  },
  {
    name: "Muted",
    hex: "#64748B",
    class: "bg-covenant-muted",
    usage: "Secondary text, captions, placeholders",
    light: false,
  },
  {
    name: "Navy",
    hex: "#0F2D45",
    class: "bg-covenant-navy",
    usage: "Footer background, deep contrast surfaces",
    light: false,
  },
];

const typeScale = [
  { label: "H1 — Hero", tag: "h1", classes: "font-serif text-5xl font-bold text-covenant-blue", sample: "Your Institution's Property. A Revenue Stream Built to Last." },
  { label: "H2 — Section", tag: "h2", classes: "font-serif text-4xl font-semibold text-covenant-blue", sample: "How It Works" },
  { label: "H3 — Card", tag: "h3", classes: "font-serif text-2xl font-semibold text-covenant-blue", sample: "We Install and Operate" },
  { label: "Body — Large", tag: "p", classes: "font-sans text-xl text-covenant-dark leading-relaxed", sample: "Covenant Charge manages permitting, equipment procurement, installation, and all ongoing maintenance." },
  { label: "Body — Base", tag: "p", classes: "font-sans text-base text-covenant-dark leading-relaxed", sample: "Each month, you receive a transparent revenue share report and direct deposit to your institution." },
  { label: "Caption / Label", tag: "p", classes: "font-sans text-sm tracking-widest uppercase text-covenant-muted", sample: "Long-term partnership · Zero operational burden" },
];

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-covenant-light">
      {/* Header */}
      <div className="bg-covenant-blue text-white px-8 py-10">
        <LogoMark variant="white" size="lg" />
        <p className="mt-6 font-sans text-white/70 text-lg max-w-xl">
          Internal brand guidelines — use this page as the reference for all
          design decisions across the Covenant Charge platform.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">

        {/* Logo Variants */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-covenant-blue mb-8 pb-3 border-b border-covenant-blue/20">
            Logo Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 p-8 flex flex-col items-center gap-4 bg-white">
              <LogoMark variant="color" size="lg" />
              <p className="font-sans text-sm text-covenant-muted text-center">
                Primary — use on white and light backgrounds
              </p>
            </div>
            <div className="rounded-xl p-8 flex flex-col items-center gap-4 bg-covenant-blue">
              <LogoMark variant="white" size="lg" />
              <p className="font-sans text-sm text-white/60 text-center">
                Reversed — use on Covenant Blue backgrounds
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-8 flex flex-col items-center gap-4 bg-white">
              <LogoMark variant="color" size="lg" showWordmark={false} />
              <p className="font-sans text-sm text-covenant-muted text-center">
                Mark only — favicons, app icons, small contexts
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white border border-slate-200">
                <LogoMark size={s} />
                <span className="font-sans text-xs text-covenant-muted uppercase tracking-wider">
                  {s === "sm" ? "Small" : s === "md" ? "Medium" : "Large"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-covenant-blue mb-8 pb-3 border-b border-covenant-blue/20">
            Color Palette
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div key={color.hex} className="rounded-xl overflow-hidden border border-slate-200">
                <div className={`h-24 ${color.class}`} />
                <div className="p-4 bg-white">
                  <p className="font-sans font-semibold text-covenant-dark text-sm">
                    {color.name}
                  </p>
                  <p className="font-mono text-xs text-covenant-muted mt-0.5">
                    {color.hex}
                  </p>
                  <p className="font-sans text-xs text-covenant-muted mt-2 leading-snug">
                    {color.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-covenant-blue mb-2 pb-3 border-b border-covenant-blue/20">
            Typography
          </h2>
          <p className="font-sans text-covenant-muted mb-8 text-sm">
            <strong className="text-covenant-dark">Lora</strong> (serif) for all headings ·{" "}
            <strong className="text-covenant-dark">Inter</strong> (sans-serif) for body, UI, and forms
          </p>
          <div className="space-y-8">
            {typeScale.map(({ label, tag: Tag, classes, sample }) => (
              <div key={label} className="border-b border-slate-100 pb-8">
                <p className="font-sans text-xs text-covenant-muted uppercase tracking-widest mb-3">
                  {label}
                </p>
                {/* @ts-expect-error dynamic tag */}
                <Tag className={classes}>{sample}</Tag>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-covenant-blue mb-8 pb-3 border-b border-covenant-blue/20">
            Button Variants
          </h2>
          <div className="space-y-6">
            {(["sm", "md", "lg"] as const).map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-4">
                <span className="font-sans text-xs text-covenant-muted uppercase tracking-widest w-8">
                  {size}
                </span>
                <Button variant="primary" size={size}>Request a Site Assessment</Button>
                <Button variant="secondary" size={size}>Learn More</Button>
                <Button variant="outline" size={size}>Contact Us</Button>
                <Button variant="ghost" size={size}>See How It Works</Button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-8 rounded-xl bg-covenant-blue flex flex-wrap gap-4">
            <Button variant="primary" size="md">Request a Site Assessment</Button>
            <Button
              variant="outline"
              size="md"
              className="border-white text-white hover:bg-white hover:text-covenant-blue"
            >
              Learn How It Works
            </Button>
          </div>
        </section>

        {/* Usage Example */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-covenant-blue mb-8 pb-3 border-b border-covenant-blue/20">
            Usage Example — Hero Block
          </h2>
          <div className="rounded-xl overflow-hidden">
            <div className="bg-covenant-blue px-10 py-16 text-white">
              <LogoMark variant="white" size="sm" className="mb-10" />
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
                Your Institution&apos;s Property.{" "}
                <span className="text-covenant-green">A Revenue Stream Built to Last.</span>
              </h1>
              <p className="mt-6 font-sans text-lg text-white/75 max-w-xl leading-relaxed">
                Covenant Charge partners with churches, schools, and ministries to
                install and manage EV fast chargers on your property — with flexible
                ownership options and no operational burden. You receive steady passive
                income. We handle everything else.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Learn How Your Institution Can Participate
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  See How It Works ↓
                </Button>
              </div>
              <p className="mt-4 font-sans text-sm text-white/50">
                Flexible ownership · No operational burden · Long-term partnership
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
