import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";

const OWNERSHIP_OPTIONS = [
  'Owned outright',
  'Owned with mortgage',
  'Leased from third party',
  'Shared-use agreement',
  'Other',
];

const RELOCATION_OPTIONS = ['No', 'Possibly', 'Yes', 'Unsure'];

export function Section2({ data, onChange, errors }: SectionProps) {
  const showOwnershipDesc = data.sec_2_3 !== '' && data.sec_2_3 !== 'Owned outright';

  return (
    <div className="space-y-5">
      <SectionHeading number="2" title="Property & Ownership" />

      <FormField
        label="Property street address"
        required
        value={data.sec_2_1}
        onChange={e => onChange('sec_2_1', e.target.value)}
        placeholder="123 Faith Avenue"
        error={errors.sec_2_1}
      />

      <FormField
        label="City, State, ZIP"
        required
        value={data.sec_2_2}
        onChange={e => onChange('sec_2_2', e.target.value)}
        placeholder="Nashville, TN 37201"
        error={errors.sec_2_2}
      />

      <FormField
        as="select"
        label="Property ownership status"
        required
        value={data.sec_2_3}
        onChange={e => onChange('sec_2_3', e.target.value)}
        error={errors.sec_2_3}
      >
        <option value="">Select ownership status</option>
        {OWNERSHIP_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
      </FormField>

      {showOwnershipDesc && (
        <FormField
          as="textarea"
          label="Describe the ownership or lease arrangement"
          value={data.sec_2_4}
          onChange={e => onChange('sec_2_4', e.target.value)}
          placeholder="Please describe the arrangement (e.g., lease terms, landlord, shared-use agreement details)"
        />
      )}

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Does this property include multiple parcels, buildings, or campuses?"
          value={data.sec_2_5}
          onChange={e => onChange('sec_2_5', e.target.value)}
        >
          <option value="">Select (optional)</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </FormField>
      </div>

      {data.sec_2_5 === 'Yes' && (
        <FormField
          as="textarea"
          label="Describe the campus layout"
          value={data.sec_2_6}
          onChange={e => onChange('sec_2_6', e.target.value)}
          placeholder="e.g., main sanctuary, school building, separate activity center across the street"
        />
      )}

      <div className="sm:w-1/2">
        <FormField
          label="Approximate total acreage"
          type="number"
          value={data.sec_2_7}
          onChange={e => onChange('sec_2_7', e.target.value)}
          placeholder="e.g., 4.5"
          min="0"
          step="0.1"
        />
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Does your institution have plans to sell, lease, redevelop, or relocate in the next 10 years?"
          value={data.sec_2_8}
          onChange={e => onChange('sec_2_8', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {RELOCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>
    </div>
  );
}
