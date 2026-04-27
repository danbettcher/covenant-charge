import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";

export function Section12({ data, onChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading
        number="12"
        title="Anything Else"
        description="Use this section to share anything we haven't asked about, or to ask us questions before we connect."
      />

      <FormField
        as="textarea"
        label="Is there anything else that would be helpful for Covenant Charge to know?"
        value={data.sec_12_1}
        onChange={e => onChange('sec_12_1', e.target.value)}
        placeholder="Any additional context, history, or details that might be relevant to our evaluation"
      />

      <FormField
        as="textarea"
        label="Do you have any questions for Covenant Charge at this stage?"
        value={data.sec_12_2}
        onChange={e => onChange('sec_12_2', e.target.value)}
        placeholder="Ask us anything — about the process, our agreements, the technology, or anything else on your mind"
      />
    </div>
  );
}
