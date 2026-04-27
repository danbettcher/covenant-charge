import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";
import { CheckboxGroup } from "./CheckboxGroup";

const BATTERY_USES = ['Backup power for outages', 'Peak shaving to reduce utility costs', 'Resilience for ministry continuity', 'Pair with solar', 'Pair with EV charging', 'Still exploring'];
const OUTAGE_FREQ = ['Rarely', 'A few times per year', 'Frequently', 'Almost never', 'Unsure'];
const CRITICAL_LOADS = ['Sanctuary / worship space', 'Refrigeration', 'HVAC', 'Office and admin', 'Childcare / youth spaces', 'Kitchen', 'All facility operations', 'Other'];
const GENERATORS = ['No', 'Yes — diesel', 'Yes — natural gas', 'Yes — propane', 'Yes — other type'];
const INSTALL_LOCATIONS = ['Indoor utility room', 'Outdoor enclosure', 'Garage or storage building', 'Unsure — open to recommendation'];

export function Section6({ data, onChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading
        number="6"
        title="Battery Storage Assessment"
        description="This section applies because you selected Battery storage."
      />

      <CheckboxGroup
        label="Primary battery storage use case(s)"
        options={BATTERY_USES}
        selected={data.sec_6_1}
        onChange={v => onChange('sec_6_1', v)}
      />

      <div className="sm:w-2/3">
        <FormField
          as="select"
          label="How often does the property lose power?"
          value={data.sec_6_2}
          onChange={e => onChange('sec_6_2', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {OUTAGE_FREQ.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <CheckboxGroup
        label="Critical loads to protect during an outage"
        options={CRITICAL_LOADS}
        selected={data.sec_6_3}
        onChange={v => onChange('sec_6_3', v)}
      />

      {data.sec_6_3.includes('Other') && (
        <FormField
          label="Describe other critical loads"
          value={data.sec_6_4}
          onChange={e => onChange('sec_6_4', e.target.value)}
          placeholder="e.g., medical equipment, server room, communications"
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Existing backup generator?"
          value={data.sec_6_5}
          onChange={e => onChange('sec_6_5', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {GENERATORS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>

        <FormField
          as="select"
          label="Preferred battery installation location"
          value={data.sec_6_6}
          onChange={e => onChange('sec_6_6', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {INSTALL_LOCATIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <FormField
        label="Available installation space dimensions (rough estimate is fine)"
        value={data.sec_6_7}
        onChange={e => onChange('sec_6_7', e.target.value)}
        placeholder="e.g., 10x12 ft room, or approximately 120 sq ft outdoor area"
      />
    </div>
  );
}
