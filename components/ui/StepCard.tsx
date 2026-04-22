interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="relative flex flex-col gap-4 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <span
        className="font-serif font-bold text-8xl text-covenant-gold/20 leading-none select-none absolute top-4 right-6"
        aria-hidden="true"
      >
        {number}
      </span>
      <span className="font-serif font-bold text-lg text-covenant-gold">{number}</span>
      <h3 className="font-serif font-semibold text-2xl text-covenant-blue">{title}</h3>
      <p className="font-sans text-base text-covenant-muted leading-relaxed">{description}</p>
    </div>
  );
}
