"use client";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-serif font-semibold text-lg text-covenant-blue group-hover:text-covenant-green transition-colors">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-covenant-blue/30 text-covenant-blue transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {/* CSS grid trick for smooth height animation */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="font-sans text-base text-covenant-muted leading-relaxed pb-5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
