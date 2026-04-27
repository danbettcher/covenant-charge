import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";
import { CheckboxGroup } from "./CheckboxGroup";

const OPENNESS_OPTIONS = ['Yes — open to all ownership and financing options', 'Yes — but only zero-capital options', 'Possibly — depends on terms', 'In early evaluation stage', 'Unsure'];
const GRANT_OPTIONS = ['Yes', 'No', 'Unsure'];
const PROGRAMS = ['SDG&E Power Your Drive', 'NEVI (National Electric Vehicle Infrastructure)', 'IRS Section 30C tax credit', 'Federal nonprofit facility grants', 'Solar Investment Tax Credit (ITC)', 'None of the above', 'Other'];

export function Section9({ data, onChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading number="9" title="Financial Context & Incentive Awareness" />

      <div className="sm:w-2/3">
        <FormField
          as="select"
          label="How open is leadership to hosting energy infrastructure on this property?"
          value={data.sec_9_1}
          onChange={e => onChange('sec_9_1', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {OPENNESS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Has your institution ever applied for or received grant funding for facility improvements?"
          value={data.sec_9_2}
          onChange={e => onChange('sec_9_2', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {GRANT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <CheckboxGroup
        label="Which of the following programs are you familiar with?"
        options={PROGRAMS}
        selected={data.sec_9_3}
        onChange={v => onChange('sec_9_3', v)}
        cols={1}
      />

      <FormField
        as="textarea"
        label="What would your institution most hope to do with revenue generated from this program?"
        value={data.sec_9_4}
        onChange={e => onChange('sec_9_4', e.target.value)}
        placeholder="e.g., Fund a scholarship program, reduce operational debt, expand outreach ministry, improve facilities"
      />
    </div>
  );
}
