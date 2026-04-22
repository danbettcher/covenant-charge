import { LogoMark } from "@/components/ui/LogoMark";

const footerLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Services", href: "#services" },
  { label: "Why Faith Institutions", href: "#why-faith" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Started", href: "#interest-form" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="bg-covenant-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <LogoMark variant="white" size="sm" />
            <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xs">
              Long-term energy revenue for faith institutions. EV charging, battery storage, and solar — fully managed, fully transparent.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-1">Navigation</p>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs tracking-widest uppercase text-white/40 mb-1">Contact</p>
            <a
              href="mailto:partners@covenantcharge.com"
              className="font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              partners@covenantcharge.com
            </a>
            <p className="font-sans text-sm text-white/60">Serving faith institutions nationally</p>
            <div className="flex flex-col gap-2 mt-2">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/30">
            © 2026 Covenant Charge. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/30">
            Built with a commitment to transparency and long-term partnership.
          </p>
        </div>
      </div>
    </footer>
  );
}
