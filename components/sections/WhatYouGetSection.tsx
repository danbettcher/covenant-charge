import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { BenefitCard } from "@/components/ui/BenefitCard";

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);
const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const benefits = [
  {
    icon: <DollarIcon />,
    title: "Monthly Revenue",
    description: "A transparent revenue share paid directly to your institution. No management fees hidden in fine print. What you earn is what you receive.",
  },
  {
    icon: <ShieldIcon />,
    title: "Zero Operational Work",
    description: "We handle equipment, maintenance, network fees, utility coordination, and customer support. Your staff does nothing beyond receiving the monthly report.",
  },
  {
    icon: <EyeIcon />,
    title: "Full Transparency",
    description: "Monthly performance reports show energy generated, sessions served, system uptime, and a complete revenue breakdown across every service you participate in.",
  },
  {
    icon: <ClockIcon />,
    title: "Long-Term Partnership",
    description: "Agreements span 15–20 years with renewal options. We are not flipping sites or chasing short-term returns. We are here for the same reason you are.",
  },
  {
    icon: <UsersIcon />,
    title: "Community Benefit",
    description: "Your community gains access to reliable EV charging on a trusted campus, while your institution captures revenue that directly supports its work.",
  },
  {
    icon: <HeartIcon />,
    title: "Mission Alignment",
    description: "Revenue supports your institution's programs and facilities. Drivers who share your values can choose to charge in places that reflect what they believe in.",
  },
];

export function WhatYouGetSection() {
  return (
    <SectionWrapper className="bg-covenant-cream">
      <div className="text-center mb-14">
        <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-3">
          What your institution receives
        </p>
        <h2 className="font-serif font-bold text-4xl md:text-5xl text-covenant-blue">
          Everything. You Handle Nothing.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {benefits.map((b) => (
          <BenefitCard key={b.title} {...b} />
        ))}
      </div>
    </SectionWrapper>
  );
}
