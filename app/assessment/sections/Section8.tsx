import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";
import { CheckboxGroup } from "./CheckboxGroup";

const ACCESS_OPENNESS = ['Yes — fully open 24/7', 'Possibly — open to discussing hours', 'Prefer restricted access', 'Unsure'];
const ACCESS_CONTROL = ['Open — no barriers', 'Manual gate', 'Automated gate', 'Posted hours only', 'Security guard', 'Other'];
const STAFF_PRESENCE = ['Yes — all hours', 'Yes — some hours', 'Occasionally', 'No regular staff presence'];

export function Section8({ data, onChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading
        number="8"
        title="Access & Site Operations"
        description="This section applies because you selected EV charging."
      />

      <div className="sm:w-2/3">
        <FormField
          as="select"
          label="Are you open to public 24/7 EV charging access on this lot?"
          value={data.sec_8_1}
          onChange={e => onChange('sec_8_1', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {ACCESS_OPENNESS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <CheckboxGroup
        label="How is parking lot access currently controlled?"
        options={ACCESS_CONTROL}
        selected={data.sec_8_2}
        onChange={v => onChange('sec_8_2', v)}
      />

      {data.sec_8_2.includes('Other') && (
        <FormField
          label="Describe other access control method"
          value={data.sec_8_3}
          onChange={e => onChange('sec_8_3', e.target.value)}
          placeholder="Describe how access is controlled"
        />
      )}

      <div className="sm:w-2/3">
        <FormField
          as="select"
          label="On-site staff or security regularly present?"
          value={data.sec_8_4}
          onChange={e => onChange('sec_8_4', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {STAFF_PRESENCE.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="space-y-3">
        <div className="sm:w-1/2">
          <FormField
            as="select"
            label="Are there scheduled events that significantly change parking availability?"
            value={data.sec_8_5.value}
            onChange={e => onChange('sec_8_5', { ...data.sec_8_5, value: e.target.value })}
          >
            <option value="">Select (optional)</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </FormField>
        </div>
        {data.sec_8_5.value === 'Yes' && (
          <FormField
            label="Describe those events"
            value={data.sec_8_5.text}
            onChange={e => onChange('sec_8_5', { ...data.sec_8_5, text: e.target.value })}
            placeholder="e.g., Large Sunday services, Wednesday evening programming, annual conferences"
          />
        )}
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Is there dedicated facilities staff available to coordinate during the installation process?"
          value={data.sec_8_6}
          onChange={e => onChange('sec_8_6', e.target.value)}
        >
          <option value="">Select (optional)</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </FormField>
      </div>
    </div>
  );
}
