import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";
import { CheckboxGroup } from "./CheckboxGroup";

const LOT_OWNERSHIP = ['Owned exclusively', 'Shared', 'Public lot', 'Other'];
const DAYS_TIMES = ['Sunday mornings', 'Sunday evenings', 'Weekday daytime', 'Weekday evenings', 'Saturday events', 'Varies seasonally'];
const OCCUPANCY = ['Less than 25%', '25–50%', '50–75%', '75–100%', 'Unsure'];
const ACCESS_OPTIONS = ['Always open', 'Specific hours only', 'Restricted', 'Gated'];
const LIT_OPTIONS = ['Yes', 'Partially', 'No'];
const VISIBLE_OPTIONS = ['Yes', 'Partially', 'No'];
const CONDITION_OPTIONS = ['Excellent', 'Good', 'Fair', 'Poor'];
const LOT_FEATURES = ['ADA spaces', 'Crosswalks', 'Speed bumps', 'Shade structures', 'Landscaping', 'Other'];

export function Section3({ data, onChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading
        number="3"
        title="Parking Inventory & Usage"
        description="This section applies because you selected EV charging."
      />

      <div className="sm:w-1/2">
        <FormField
          label="Estimated total paved parking spaces"
          type="number"
          value={data.sec_3_1}
          onChange={e => onChange('sec_3_1', e.target.value)}
          placeholder="e.g., 120"
          min="0"
        />
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Lot ownership"
          value={data.sec_3_2}
          onChange={e => onChange('sec_3_2', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {LOT_OWNERSHIP.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <CheckboxGroup
        label="Primary days and times the lot is in use"
        options={DAYS_TIMES}
        selected={data.sec_3_3}
        onChange={v => onChange('sec_3_3', v)}
      />

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Approximate peak day occupancy"
          value={data.sec_3_4}
          onChange={e => onChange('sec_3_4', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {OCCUPANCY.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="space-y-3">
        <div className="sm:w-1/2">
          <FormField
            as="select"
            label="Are there periods when the lot is mostly empty?"
            value={data.sec_3_5.value}
            onChange={e => onChange('sec_3_5', { ...data.sec_3_5, value: e.target.value })}
          >
            <option value="">Select (optional)</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </FormField>
        </div>
        {data.sec_3_5.value === 'Yes' && (
          <FormField
            label="Describe when the lot is typically empty"
            value={data.sec_3_5.text}
            onChange={e => onChange('sec_3_5', { ...data.sec_3_5, text: e.target.value })}
            placeholder="e.g., Weekday afternoons, most evenings outside of scheduled events"
          />
        )}
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Public access to lot"
          value={data.sec_3_6}
          onChange={e => onChange('sec_3_6', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {ACCESS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <FormField
          as="select"
          label="Lot lit at night?"
          value={data.sec_3_7}
          onChange={e => onChange('sec_3_7', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {LIT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>

        <FormField
          as="select"
          label="Visible from a major street?"
          value={data.sec_3_8}
          onChange={e => onChange('sec_3_8', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {VISIBLE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>

        <FormField
          as="select"
          label="Lot surface condition"
          value={data.sec_3_9}
          onChange={e => onChange('sec_3_9', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {CONDITION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <CheckboxGroup
        label="Lot features (select all that apply)"
        options={LOT_FEATURES}
        selected={data.sec_3_10}
        onChange={v => onChange('sec_3_10', v)}
      />

      {data.sec_3_10.includes('Other') && (
        <FormField
          label="Describe other lot features"
          value={data.sec_3_11}
          onChange={e => onChange('sec_3_11', e.target.value)}
          placeholder="Describe additional features"
        />
      )}
    </div>
  );
}
