import type { Metadata } from "next";
import { LogoMark } from "@/components/ui/LogoMark";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Assessment Submitted — Covenant Charge",
  description: "Your site assessment has been submitted. We will be in touch within 5 business days.",
};

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  return (
    <div className="min-h-screen bg-covenant-light font-sans">
      <div className="h-1 bg-covenant-gold" />

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        {/* Success icon */}
        <div className="w-16 h-16 rounded-full bg-covenant-green/15 flex items-center justify-center mx-auto mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <LogoMark size="sm" showWordmark className="justify-center mb-8" />

        <h1 className="font-serif font-bold text-3xl text-covenant-blue mb-4">
          Thank you for completing your site assessment.
        </h1>

        <p className="font-sans text-lg text-covenant-muted leading-relaxed mb-10 max-w-lg mx-auto">
          Our team will review your submission and be in touch within{" "}
          <strong className="text-covenant-dark">5 business days</strong> to discuss next steps.
        </p>

        {/* What happens next */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-left mb-8">
          <p className="font-sans text-xs tracking-widest uppercase text-covenant-muted font-semibold mb-5">
            What happens next
          </p>
          {[
            {
              n: "1",
              title: "We review your submission",
              body: "Our team evaluates your property details, service interests, and site context to determine initial fit.",
            },
            {
              n: "2",
              title: "We contact you to discuss",
              body: "A Covenant Charge advisor will reach out to your primary contact within 5 business days to share preliminary findings and answer questions.",
            },
            {
              n: "3",
              title: "On-site assessment (if qualified)",
              body: "If your property looks like a strong candidate, we will schedule a no-cost on-site visit to evaluate the property directly.",
            },
            {
              n: "4",
              title: "You receive a proposal",
              body: "Based on the site visit, we will prepare a full proposal including projected revenue, service scope, and agreement terms — at no obligation.",
            },
          ].map(step => (
            <div key={step.n} className="flex gap-4 mb-5 last:mb-0">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-covenant-blue flex items-center justify-center font-sans font-bold text-xs text-white">
                {step.n}
              </span>
              <div>
                <p className="font-sans font-semibold text-sm text-covenant-dark">{step.title}</p>
                <p className="font-sans text-sm text-covenant-muted leading-relaxed mt-0.5">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-sans text-sm text-covenant-muted mb-8">
          Questions in the meantime? Email us at{" "}
          <a href="mailto:dan@covenantcharge.com" className="text-covenant-green underline underline-offset-2">
            dan@covenantcharge.com
          </a>
        </p>

        <Button href="/" variant="outline" size="md">
          Return to covenantcharge.com
        </Button>
      </div>
    </div>
  );
}
