export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
      <span className="text-amber-500 font-bold flex-shrink-0 leading-5">⚠</span>
      <p className="font-sans text-sm text-amber-800 leading-relaxed">{children}</p>
    </div>
  );
}

export function SubHeading({ title }: { title: string }) {
  return (
    <div className="pt-3">
      <h3 className="font-sans text-xs font-semibold text-covenant-blue uppercase tracking-widest">
        {title}
      </h3>
      <div className="mt-1.5 h-px bg-slate-100" />
    </div>
  );
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  name: string;
  options: readonly string[] | string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-sans text-sm font-medium text-covenant-dark">
        {label}
        {required && <span className="text-covenant-green ml-1">*</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <label
            key={opt}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors text-sm font-sans select-none ${
              value === opt
                ? "border-covenant-green bg-covenant-green/5 text-covenant-dark font-medium"
                : "border-slate-200 text-covenant-dark hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="accent-covenant-green"
            />
            {opt}
          </label>
        ))}
      </div>
      {error && <p className="font-sans text-xs text-red-500">{error}</p>}
    </div>
  );
}
