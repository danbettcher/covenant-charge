import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-covenant-green text-white hover:bg-green-600 focus-visible:ring-covenant-green",
  secondary:
    "bg-covenant-blue text-white hover:bg-blue-800 focus-visible:ring-covenant-blue",
  ghost:
    "bg-transparent text-covenant-blue hover:bg-covenant-blue/10 focus-visible:ring-covenant-blue",
  outline:
    "bg-transparent border border-covenant-blue text-covenant-blue hover:bg-covenant-blue hover:text-white focus-visible:ring-covenant-blue",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const base =
  "inline-flex items-center justify-center rounded-md font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

interface ButtonAsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface ButtonAsAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
