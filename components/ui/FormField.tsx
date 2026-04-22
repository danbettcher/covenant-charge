import { type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface BaseProps {
  label: string;
  error?: string;
  required?: boolean;
}

interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  as?: "input";
}

interface SelectProps extends BaseProps, SelectHTMLAttributes<HTMLSelectElement> {
  as: "select";
  children: React.ReactNode;
}

interface TextareaProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
}

type FormFieldProps = InputProps | SelectProps | TextareaProps;

const fieldClass =
  "w-full font-sans text-sm text-covenant-dark bg-white border border-slate-300 rounded-lg px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-covenant-green focus:border-transparent transition";

export function FormField({ label, error, required, as: Tag = "input", ...props }: FormFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-covenant-dark">
        {label}
        {required && <span className="text-covenant-green ml-1">*</span>}
      </label>

      {Tag === "select" ? (
        <select id={id} className={fieldClass} {...(props as SelectHTMLAttributes<HTMLSelectElement>)}>
          {(props as SelectProps).children}
        </select>
      ) : Tag === "textarea" ? (
        <textarea id={id} rows={4} className={fieldClass} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input id={id} className={fieldClass} {...(props as InputHTMLAttributes<HTMLInputElement>)} />
      )}

      {error && (
        <p className="font-sans text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
