import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";
import { CheckboxGroup } from "./CheckboxGroup";

const SERVICES = ['EV charging', 'Solar', 'Battery storage', 'Not sure yet — open to learning more'];

const PRIORITY_OPTIONS = [
  'EV charging is primary',
  'Solar is primary',
  'Battery storage is primary',
  'All are equally important',
  'We are still discerning',
];

export function Section0({ data, onChange, errors }: SectionProps) {
  return (
    <div className="space-y-6">
      <SectionHeading
        number="0"
        title="Service Selection"
        description="Your selections here determine which sections of this assessment apply to your property. You can select multiple services."
      />

      <CheckboxGroup
        label="Which Covenant Charge services are you interested in exploring?"
        options={SERVICES}
        selected={data.sec_0_1}
        onChange={v => onChange('sec_0_1', v)}
        required
        error={errors.sec_0_1}
        cols={2}
      />

      <FormField
        as="select"
        label="If you are exploring multiple services, do you have a primary priority?"
        value={data.sec_0_2}
        onChange={e => onChange('sec_0_2', e.target.value)}
      >
        <option value="">Select (optional)</option>
        {PRIORITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
      </FormField>
    </div>
  );
}
