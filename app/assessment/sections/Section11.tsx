import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";

const HOW_HEARD = ['Referred by someone I know', 'Online search', 'Social media', 'Industry event or conference', 'Direct outreach from Covenant Charge', 'Other'];

export function Section11({ data, onChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading
        number="11"
        title="Mission Alignment & Vision"
        description="This is the heart of the assessment. Your answers here help us understand who you are and whether this partnership makes sense for your community."
      />

      <FormField
        as="textarea"
        label="In one or two sentences, what is your institution's primary mission?"
        value={data.sec_11_1}
        onChange={e => onChange('sec_11_1', e.target.value)}
        placeholder="e.g., To make disciples of Jesus Christ for the transformation of the world, through worship, learning, and service to our community."
      />

      <FormField
        as="textarea"
        label="What programs or community efforts are you hoping to expand or sustain in the next 3–5 years?"
        value={data.sec_11_2}
        onChange={e => onChange('sec_11_2', e.target.value)}
        placeholder="e.g., Expanding our after-school tutoring program, growing our food pantry, adding a second worship service"
      />

      <FormField
        as="textarea"
        label="If this property generated consistent additional revenue over the next decade, what would that funding most support?"
        value={data.sec_11_3}
        onChange={e => onChange('sec_11_3', e.target.value)}
        placeholder="e.g., Staff salaries, building maintenance fund, scholarship programs, community outreach"
      />

      <FormField
        as="textarea"
        label="Is there anything about your values or community commitments that Covenant Charge should understand before evaluating this partnership?"
        value={data.sec_11_4}
        onChange={e => onChange('sec_11_4', e.target.value)}
        placeholder="Share anything you think is important for us to know about your community and how you operate"
      />

      <div className="sm:w-2/3">
        <FormField
          as="select"
          label="How did you first hear about Covenant Charge?"
          value={data.sec_11_5}
          onChange={e => onChange('sec_11_5', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {HOW_HEARD.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>
    </div>
  );
}
