import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ServiceCard } from "@/components/ui/ServiceCard";

// Simple inline SVG icons
const EvIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h13.18" />
    <path d="M18 18h2a2 2 0 002-2v-5l-3-4H8" />
    <path d="M12 6v4M8 6v4" />
    <circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
  </svg>
);

const BessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const SolarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const services = [
  {
    icon: <EvIcon />,
    title: "EV Fast Charging",
    description:
      "DC fast chargers installed on your parking lot, generating revenue from every session. We manage the equipment, network, customer support, and maintenance — permanently.",
    highlights: [
      "Revenue from every charging session",
      "Equipment and network fully managed",
      "Utility incentives and grants pursued on your behalf",
    ],
  },
  {
    icon: <BessIcon />,
    title: "Battery Storage (BESS)",
    description:
      "On-site battery energy storage systems that reduce your institution's demand charges, provide backup power capability, and unlock additional utility incentive programs.",
    highlights: [
      "Reduces peak demand charges on your utility bill",
      "Backup power capability during outages",
      "Pairs with solar to maximize energy independence",
    ],
  },
  {
    icon: <SolarIcon />,
    title: "Solar (PV)",
    description:
      "Rooftop or ground-mount photovoltaic systems that reduce your energy costs and can power your EV chargers directly — increasing your net revenue per session.",
    highlights: [
      "Reduces your institution's electricity costs",
      "Powers EV chargers to increase net revenue",
      "Federal tax credits and state incentives applied",
    ],
  },
];

export function ServicesSection() {
  return (
    <SectionWrapper id="services" className="bg-covenant-cream">
      <div className="text-center mb-14">
        <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-3">
          Independently or as an integrated system
        </p>
        <h2 className="font-serif font-bold text-4xl md:text-5xl text-covenant-blue">
          Our Services
        </h2>
        <p className="mt-4 font-sans text-lg text-covenant-muted max-w-2xl mx-auto">
          We design what makes sense for your site — a single service or a fully integrated energy program.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <ServiceCard key={s.title} {...s} />
        ))}
      </div>

      <p className="mt-10 text-center font-sans text-sm text-covenant-muted italic">
        Not sure what fits your site? Request a no-cost assessment and we will tell you exactly what makes sense.
      </p>
    </SectionWrapper>
  );
}
