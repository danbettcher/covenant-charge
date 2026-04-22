"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Our Services", href: "#services" },
  { label: "Why Faith Institutions", href: "#why-faith" },
  { label: "FAQ", href: "#faq" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = scrolled
    ? "font-sans text-sm text-covenant-dark hover:text-covenant-green transition-colors"
    : "font-sans text-sm text-white/80 hover:text-white transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" aria-label="Covenant Charge home">
            <LogoMark variant={scrolled ? "color" : "white"} size="sm" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="#interest-form" variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              width="22" height="22" viewBox="0 0 22 22" fill="none"
              className={scrolled ? "text-covenant-dark" : "text-white"}
            >
              {mobileOpen ? (
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 font-sans text-sm text-covenant-dark hover:text-covenant-green hover:bg-covenant-light rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <Button href="#interest-form" variant="primary" size="sm" className="w-full justify-center">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
