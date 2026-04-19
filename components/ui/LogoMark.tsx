interface LogoMarkProps {
  variant?: "color" | "white";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

// Mark is square (viewBox 0 0 40 40), so height === width
const sizes = {
  sm: { mark: 24, covenant: "text-base", charge: "text-[10px] tracking-[0.15em]" },
  md: { mark: 36, covenant: "text-xl",   charge: "text-xs tracking-[0.15em]" },
  lg: { mark: 52, covenant: "text-3xl",  charge: "text-sm tracking-[0.15em]" },
};

export function LogoMark({
  variant = "color",
  size = "md",
  showWordmark = true,
  className = "",
}: LogoMarkProps) {
  const isWhite = variant === "white";
  const strokeColor = isWhite ? "white" : "#1B4F72";
  const boltColor   = isWhite ? "white" : "#27AE60";
  const covenantColor = isWhite ? "text-white"           : "text-covenant-blue";
  const chargeColor   = isWhite ? "text-white/70"        : "text-covenant-green";

  const { mark, covenant, charge } = sizes[size];

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {/* Mark — square, so width === height */}
      <svg
        width={mark}
        height={mark}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path
          d="M 32 8 A 17 17 0 1 0 32 32"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 22 9 L 15 22 L 20 22 L 16 33 L 27 18 L 22 18 Z"
          fill={boltColor}
        />
      </svg>

      {/* Wordmark — top aligns to top of mark, CHARGE aligns to bottom of mark */}
      {showWordmark && (
        <div
          className="flex flex-col justify-between"
          style={{ height: mark }}
        >
          <span className={`font-serif font-bold tracking-tight leading-none ${covenant} ${covenantColor}`}>
            Covenant
          </span>
          <span className={`font-sans font-light leading-none ${charge} ${chargeColor}`}>
            CHARGE
          </span>
        </div>
      )}
    </div>
  );
}
