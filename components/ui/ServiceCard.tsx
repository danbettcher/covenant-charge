import { type ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlights: string[];
}

export function ServiceCard({ icon, title, description, highlights }: ServiceCardProps) {
  return (
    <div className="flex flex-col gap-5 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-covenant-blue/10 flex items-center justify-center text-covenant-blue">
        {icon}
      </div>
      <h3 className="font-serif font-semibold text-2xl text-covenant-blue">{title}</h3>
      <p className="font-sans text-base text-covenant-muted leading-relaxed">{description}</p>
      <ul className="flex flex-col gap-2">
        {highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 font-sans text-sm text-covenant-dark">
            <span className="text-covenant-green mt-0.5 shrink-0">✓</span>
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}
