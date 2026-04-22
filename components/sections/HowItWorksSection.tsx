import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { StepCard } from "@/components/ui/StepCard";

const steps = [
  {
    number: "01",
    title: "We Assess Your Site",
    description:
      "We evaluate your property for grid capacity, solar exposure, battery storage potential, and charger placement. No cost, no commitment — just a clear picture of what your site can support.",
  },
  {
    number: "02",
    title: "We Install and Manage",
    description:
      "Covenant Charge handles permitting, equipment procurement, installation, utility interconnection, and all ongoing maintenance across EV, solar, and storage systems. Your institution has zero operational burden.",
  },
  {
    number: "03",
    title: "You Receive Revenue",
    description:
      "Each month, you receive a transparent performance report and direct deposit. You will always know exactly how your systems performed and what your institution earned — and why.",
  },
];

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="bg-covenant-light">
      <div className="text-center mb-14">
        <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-3">
          Simple by design
        </p>
        <h2 className="font-serif font-bold text-4xl md:text-5xl text-covenant-blue">
          How It Works
        </h2>
        <p className="mt-4 font-sans text-lg text-covenant-muted max-w-xl mx-auto">
          Three steps to a new revenue stream your institution does nothing to maintain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <StepCard key={step.number} {...step} />
        ))}
      </div>
    </SectionWrapper>
  );
}
