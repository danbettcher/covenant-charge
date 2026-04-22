import { type ReactNode } from "react";

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="flex flex-col gap-3 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="w-10 h-10 rounded-lg bg-covenant-green/10 flex items-center justify-center text-covenant-green">
        {icon}
      </div>
      <h3 className="font-serif font-semibold text-xl text-covenant-blue">{title}</h3>
      <p className="font-sans text-sm text-covenant-muted leading-relaxed">{description}</p>
    </div>
  );
}
