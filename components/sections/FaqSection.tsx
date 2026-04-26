"use client";

import { useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FaqItem } from "@/components/ui/FaqItem";

const faqs = [
  {
    question: "What does my institution actually have to do?",
    answer:
      "Very little. Once the site assessment is complete and the partnership agreement is signed, Covenant Charge manages every aspect of installation, operation, and maintenance. Your team receives a monthly report and a direct deposit. That is your entire involvement.",
  },
  {
    question: "How much revenue can we expect?",
    answer:
      "Revenue depends on your service mix, site traffic, and local energy rates. Comparable faith institution sites with EV charging generate between $800 and $4,000 per charger per year. Sites with solar and storage see additional cost savings and incentive income on top of that. We will provide a site-specific projection during your assessment — no obligation.",
  },
  {
    question: "Can we choose just one service, or do we have to do all three?",
    answer:
      "You choose what fits your site and your institution. EV charging, battery storage, and solar can each be deployed independently. For many sites, a combined system delivers significantly better returns — but we will never push services that do not make sense for your specific property.",
  },
  {
    question: "Who owns the equipment?",
    answer:
      "That depends on which path works best for your institution. In our preferred arrangement, your institution purchases and owns the equipment using financing provided through Covenant Charge — you build equity in a long-term asset while we handle all operations. Alternatively, Covenant Charge can fund and own the equipment entirely, with no financial commitment from your institution; you receive a revenue share in exchange for the site license. Either way, Covenant Charge manages all installation, maintenance, and operations for the life of the agreement.",
  },
  {
    question: "How do you handle electricity costs?",
    answer:
      "We coordinate directly with your utility provider and, where possible, establish a separate meter for the energy infrastructure. Your institution's existing electricity bill is not affected. Where solar is part of the system, it can directly offset your energy costs.",
  },
  {
    question: "Is this available to all faiths and denominations?",
    answer:
      "Yes. Covenant Charge works with churches, synagogues, mosques, schools, and any mission-driven organization regardless of denomination or tradition. The program is designed to serve the common good — not a particular faith community.",
  },
  {
    question: "What is the installation timeline?",
    answer:
      "From signed agreement to systems online: typically 4–8 months, depending on utility interconnection timelines and permitting in your jurisdiction. Solar and storage systems follow similar timelines. We manage the entire process and keep you updated at every milestone.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" className="bg-covenant-light">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-sm tracking-widest uppercase text-covenant-green mb-3">
            Common questions
          </p>
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-covenant-blue">
            Frequently Asked
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-2">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
