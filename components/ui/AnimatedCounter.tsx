"use client";

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  label: string;
  note?: string;
}

export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1800,
  className = "",
  label,
  note,
}: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter(target, duration);

  return (
    <div ref={ref} className={`flex flex-col items-center text-center ${className}`}>
      <span
        className="font-serif font-bold text-5xl md:text-6xl text-covenant-blue tabular-nums"
        aria-label={`${prefix}${target}${suffix}`}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span className="mt-3 font-sans text-sm text-covenant-muted leading-snug max-w-[180px]">
        {label}
      </span>
      {note && (
        <span className="mt-1 font-sans text-xs text-covenant-muted/70 italic">
          {note}
        </span>
      )}
    </div>
  );
}
