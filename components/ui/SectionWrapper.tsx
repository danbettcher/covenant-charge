import { type ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div";
  children: ReactNode;
}

export function SectionWrapper({
  id,
  className = "",
  innerClassName = "",
  as: Tag = "section",
  children,
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={`py-20 md:py-28 ${className}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${innerClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
