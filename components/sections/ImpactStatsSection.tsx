import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stats = [
  {
    target: 24,
    prefix: "$",
    suffix: "M+",
    label: "Projected annual revenue distributed to faith partners",
    note: "projected at scale",
  },
  {
    target: 47,
    prefix: "",
    suffix: "",
    label: "Faith institution sites in active pipeline",
    note: "",
  },
  {
    target: 3,
    prefix: "",
    suffix: "",
    label: "Energy services — EV, Battery Storage, and Solar",
    note: "independently or bundled",
  },
  {
    target: 100,
    prefix: "",
    suffix: "%",
    label: "Of program operations managed by Covenant Charge",
    note: "",
  },
];

export function ImpactStatsSection() {
  return (
    <SectionWrapper className="bg-white">
      <div className="text-center mb-14">
        <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-3">
          Collective impact
        </p>
        <h2 className="font-serif font-bold text-4xl md:text-5xl text-covenant-blue">
          The Network at Work
        </h2>
        <p className="mt-4 font-sans text-lg text-covenant-muted max-w-xl mx-auto">
          We measure success not only by sites deployed, but by the strength of the missions those sites help fund.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat) => (
          <AnimatedCounter key={stat.label} {...stat} />
        ))}
      </div>

      <p className="mt-10 text-center font-sans text-xs text-covenant-muted/60 italic">
        Revenue figures represent program projections based on comparable energy infrastructure deployments. Actual results vary by site and service mix.
      </p>
    </SectionWrapper>
  );
}
