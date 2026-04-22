import { SectionWrapper } from "@/components/ui/SectionWrapper";

const pillars = [
  {
    title: "Covenant, Not Contract",
    body: "We design every partnership to reflect mutual commitment. You will have clear rights, fair terms, and a partner who does not exit when the market shifts or a better opportunity appears elsewhere.",
  },
  {
    title: "Full Transparency",
    body: "Every dollar tracked. Every report delivered on time. You will never wonder what is happening with your systems — the data is yours, the revenue is yours, and the relationship is built on openness.",
  },
  {
    title: "Steward, Not Operator",
    body: "We do not run energy infrastructure for profit at your expense. We represent your institution's interests in a complex market you should not have to navigate alone. Your mission stays your mission.",
  },
];

export function TrustSection() {
  return (
    <SectionWrapper className="bg-white">
      <div className="text-center mb-14">
        <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-3">
          How we operate
        </p>
        <h2 className="font-serif font-bold text-4xl md:text-5xl text-covenant-blue">
          Built for Long-Term Stewardship
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <div key={p.title} className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-4xl text-covenant-gold/40 leading-none">
                0{i + 1}
              </span>
              <div className="h-px flex-1 bg-covenant-gold/20" />
            </div>
            <h3 className="font-serif font-semibold text-2xl text-covenant-blue">{p.title}</h3>
            <p className="font-sans text-base text-covenant-muted leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
