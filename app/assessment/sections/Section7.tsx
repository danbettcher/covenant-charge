import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";

const YES_NO_UNSURE = ['Yes', 'No', 'Unsure'];

export function Section7({ data, onChange }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading number="7" title="Zoning, Permitting & Site Constraints" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Is the property in a historic district or subject to architectural review?"
          value={data.sec_7_1}
          onChange={e => onChange('sec_7_1', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {YES_NO_UNSURE.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>

        <FormField
          as="select"
          label="HOA, CC&Rs, or deed restrictions affecting exterior improvements?"
          value={data.sec_7_2}
          onChange={e => onChange('sec_7_2', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {YES_NO_UNSURE.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Known zoning restrictions affecting commercial use of the parking lot?"
          value={data.sec_7_3}
          onChange={e => onChange('sec_7_3', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {YES_NO_UNSURE.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      {data.sec_7_3 === 'Yes' && (
        <FormField
          as="textarea"
          label="Describe the zoning restriction"
          value={data.sec_7_4}
          onChange={e => onChange('sec_7_4', e.target.value)}
          placeholder="Describe the restriction and how it may affect this project"
        />
      )}

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Have you ever applied for a conditional or special use permit for the parking area?"
          value={data.sec_7_5}
          onChange={e => onChange('sec_7_5', e.target.value)}
        >
          <option value="">Select (optional)</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </FormField>
      </div>

      {data.sec_7_5 === 'Yes' && (
        <FormField
          label="Describe the permit application and outcome"
          value={data.sec_7_6}
          onChange={e => onChange('sec_7_6', e.target.value)}
          placeholder="e.g., Applied in 2021, approved with conditions around operating hours"
        />
      )}

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Active environmental concerns or ongoing remediation on the property?"
          value={data.sec_7_7}
          onChange={e => onChange('sec_7_7', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {YES_NO_UNSURE.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>
    </div>
  );
}
