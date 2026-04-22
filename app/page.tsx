import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhyFaithSection } from "@/components/sections/WhyFaithSection";
import { ImpactStatsSection } from "@/components/sections/ImpactStatsSection";
import { WhatYouGetSection } from "@/components/sections/WhatYouGetSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { InterestFormSection } from "@/components/sections/InterestFormSection";
import { CtaBannerSection } from "@/components/sections/CtaBannerSection";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ServicesSection />
        <WhyFaithSection />
        <ImpactStatsSection />
        <WhatYouGetSection />
        <TrustSection />
        <FaqSection />
        <CtaBannerSection />
        <InterestFormSection />
      </main>
      <SiteFooter />
    </>
  );
}
