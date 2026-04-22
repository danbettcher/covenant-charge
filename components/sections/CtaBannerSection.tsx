import { Button } from "@/components/ui/Button";

export function CtaBannerSection() {
  return (
    <section className="bg-covenant-gold py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-covenant-navy leading-tight">
          Faith institutions across the country are already in conversation with us.
        </h2>
        <p className="mt-4 font-sans text-lg text-covenant-navy/70 max-w-2xl mx-auto">
          Your property has long-term energy infrastructure potential. Let us show you what it can generate.
        </p>
        <div className="mt-8">
          <Button href="#interest-form" variant="secondary" size="lg">
            Start the Conversation →
          </Button>
        </div>
      </div>
    </section>
  );
}
