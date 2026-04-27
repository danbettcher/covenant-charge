export function SectionHeading({ number, title, description }: {
  number: string | number;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-covenant-blue flex items-center justify-center font-sans font-bold text-xs text-white">
          {number}
        </span>
        <h2 className="font-serif font-semibold text-lg text-covenant-blue">{title}</h2>
        <div className="flex-1 h-px bg-covenant-blue/15" />
      </div>
      {description && (
        <p className="font-sans text-sm text-covenant-muted ml-10 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
