import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";
import { CheckboxGroup } from "./CheckboxGroup";

const SOLAR_USE_CASES = ['Reduce our utility bill', 'Generate revenue through net metering', 'Power critical operations', 'Community solar program', 'Still exploring'];
const ROOF_TYPES = ['Asphalt shingle', 'Metal', 'Tile', 'Flat membrane / TPO', 'Other'];
const ROOF_CONDITIONS = ['Excellent', 'Good', 'Fair', 'Needs replacement within 5 years'];
const ORIENTATIONS = ['South', 'Southwest', 'Southeast', 'East', 'West', 'North', 'Multiple directions', 'Unsure'];
const SHADING = ['Trees', 'Adjacent buildings', 'Mountains or hills', 'None', 'Unsure'];
const GROUND_OPTIONS = ['Yes', 'No', 'Unsure'];
const MAINTENANCE_OPTIONS = ['We own and maintain', 'Landlord handles maintenance', 'Outside contractor', 'Unsure'];
const WARRANTY_OPTIONS = ['Yes', 'No', 'Unsure'];
const BILL_OPTIONS = ['Under $5,000', '$5,000–$15,000', '$15,000–$50,000', '$50,000–$100,000', 'Over $100,000', 'Unsure'];

export function Section5({ data, onChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading
        number="5"
        title="Solar Assessment"
        description="This section applies because you selected Solar."
      />

      <FormField
        as="select"
        label="Primary solar use case"
        value={data.sec_5_1}
        onChange={e => onChange('sec_5_1', e.target.value)}
      >
        <option value="">Select (optional)</option>
        {SOLAR_USE_CASES.map(o => <option key={o} value={o}>{o}</option>)}
      </FormField>

      <div className="space-y-3">
        <CheckboxGroup
          label="Roof type (select all that apply)"
          options={ROOF_TYPES}
          selected={data.sec_5_2.types}
          onChange={v => onChange('sec_5_2', { ...data.sec_5_2, types: v })}
        />
        <div className="sm:w-1/3">
          <FormField
            label="Approximate roof age (years)"
            type="number"
            value={data.sec_5_2.age}
            onChange={e => onChange('sec_5_2', { ...data.sec_5_2, age: e.target.value })}
            placeholder="e.g., 8"
            min="0"
            max="100"
          />
        </div>
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Roof condition"
          value={data.sec_5_3}
          onChange={e => onChange('sec_5_3', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {ROOF_CONDITIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <CheckboxGroup
        label="Roof orientation — primary pitch direction(s)"
        options={ORIENTATIONS}
        selected={data.sec_5_4}
        onChange={v => onChange('sec_5_4', v)}
      />

      <CheckboxGroup
        label="Significant shading sources"
        options={SHADING}
        selected={data.sec_5_5}
        onChange={v => onChange('sec_5_5', v)}
      />

      <div className="space-y-3">
        <div className="sm:w-1/2">
          <FormField
            as="select"
            label="Is ground-mount space available if the roof is not viable?"
            value={data.sec_5_6.value}
            onChange={e => onChange('sec_5_6', { ...data.sec_5_6, value: e.target.value })}
          >
            <option value="">Select (optional)</option>
            {GROUND_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </FormField>
        </div>
        {data.sec_5_6.value === 'Yes' && (
          <div className="sm:w-1/3">
            <FormField
              label="Estimated available area (sq ft)"
              type="number"
              value={data.sec_5_6.sqft}
              onChange={e => onChange('sec_5_6', { ...data.sec_5_6, sqft: e.target.value })}
              placeholder="e.g., 5000"
              min="0"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Who handles roof maintenance?"
          value={data.sec_5_7}
          onChange={e => onChange('sec_5_7', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {MAINTENANCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>

        <FormField
          as="select"
          label="Existing roof warranties that could affect solar installation?"
          value={data.sec_5_8}
          onChange={e => onChange('sec_5_8', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {WARRANTY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Approximate annual electric bill"
          value={data.sec_5_9}
          onChange={e => onChange('sec_5_9', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {BILL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>
    </div>
  );
}
