import { SectionWrapper } from "@/components/ui/SectionWrapper";

const callouts = [
  {
    title: "Long-Term Property Ownership",
    body: "Energy infrastructure is a 15–30 year investment. Faith institutions own their properties for generations — making them the most stable and sought-after sites in the market.",
  },
  {
    title: "Community Trust",
    body: "A trusted institution campus is a preferred destination for EV drivers and a credible anchor for local energy infrastructure. That trust has real economic value.",
  },
  {
    title: "Mission Alignment",
    body: "Revenue generated here supports your institution's work — facilities, programs, outreach. Drivers who share your values can choose to charge where it matters.",
  },
];

export function WhyFaithSection() {
  return (
    <SectionWrapper id="why-faith" className="bg-covenant-blue">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: narrative */}
        <div>
          <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-4">
            A unique opportunity
          </p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-white leading-tight">
            Faith Institutions Are Uniquely Positioned for This
          </h2>
          <p className="mt-6 font-sans text-lg text-white/70 leading-relaxed">
            The transition to clean energy is creating long-term infrastructure opportunities tied to land, access, and community stability. Faith-based institutions have all three — yet many are unable or unwilling to pursue these programs on their own due to governance complexity or uncertainty about long-term obligations.
          </p>
          <p className="mt-4 font-sans text-lg text-white/70 leading-relaxed">
            This is exactly the gap Covenant Charge exists to fill. We act as a long-term steward — not a vendor — so your institution can participate responsibly without distraction from its mission.
          </p>
        </div>

        {/* Right: callout cards */}
        <div className="flex flex-col gap-5">
          {callouts.map((c) => (
            <div key={c.title} className="rounded-xl bg-white/10 border border-white/10 p-6">
              <h3 className="font-serif font-semibold text-lg text-white mb-2">{c.title}</h3>
              <p className="font-sans text-sm text-white/65 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
