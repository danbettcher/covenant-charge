type CheckboxGroupProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  required?: boolean;
  error?: string;
  cols?: 1 | 2;
};

export function CheckboxGroup({
  label, options, selected, onChange, required, error, cols = 2,
}: CheckboxGroupProps) {
  function toggle(option: string) {
    onChange(
      selected.includes(option)
        ? selected.filter(v => v !== option)
        : [...selected, option]
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-sans text-sm font-medium text-covenant-dark">
        {label}
        {required && <span className="text-covenant-green ml-1">*</span>}
      </p>
      <div className={`grid gap-2 ${cols === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {options.map(option => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                checked
                  ? 'border-covenant-green bg-covenant-green/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option)}
                className="mt-0.5 accent-covenant-green flex-shrink-0"
              />
              <span className="font-sans text-sm text-covenant-dark leading-snug">{option}</span>
            </label>
          );
        })}
      </div>
      {error && <p className="font-sans text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
