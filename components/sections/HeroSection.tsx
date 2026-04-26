import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-covenant-blue flex items-center">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-covenant-blue via-covenant-blue to-[#0d3a56] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-6">
            EV Charging · Battery Storage · Solar
          </p>

          {/* Headline */}
          <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
            Long-Term Energy Revenue for Faith Institutions
          </h1>

          {/* Subheadline */}
          <p className="mt-6 font-sans text-xl text-white/75 leading-relaxed max-w-2xl">
            Covenant Charge helps churches, schools, and ministries unlock sustainable income from EV charging, solar, and battery storage. Zero operational burden. Full transparency.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#interest-form" variant="primary" size="lg">
              Request a Site Assessment
            </Button>
            <Button
              href="#how-it-works"
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              See How It Works ↓
            </Button>
          </div>

          {/* Micro-copy */}
          <p className="mt-6 font-sans text-sm text-white/40">
            Flexible ownership · No operational burden · Long-term stewardship
          </p>
        </div>
      </div>
    </section>
  );
}
