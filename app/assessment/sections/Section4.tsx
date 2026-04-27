import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";
import { FileUpload } from "./FileUpload";

const RATE_OPTIONS = ['Yes', 'No', 'Other / unsure'];
const LOCATION_OPTIONS = ['Yes', 'No', 'Unsure'];
const UPGRADE_OPTIONS = ['No known upgrades or issues', 'Yes — upgrades performed', 'Yes — issues encountered', 'Unsure'];
const SOLAR_OPTIONS = ['No', 'Yes', 'In planning'];
const CHARGER_OPTIONS = ['No', 'Level 1 (standard outlet)', 'Level 2 (240V)', 'DC Fast Charger', 'Unsure'];

export function Section4({ data, onChange, submissionId }: SectionProps) {
  const showRateName   = data.sec_4_2 === 'Yes';
  const showUpgDesc    = data.sec_4_6.startsWith('Yes');
  const showChargerOp  = data.sec_4_9 !== '' && data.sec_4_9 !== 'No';

  return (
    <div className="space-y-5">
      <SectionHeading
        number="4"
        title="Electrical Infrastructure"
        description="Applies to all services. A utility bill upload (if available) is the most helpful thing you can provide here."
      />

      <FormField
        label="Electric utility provider"
        value={data.sec_4_1}
        onChange={e => onChange('sec_4_1', e.target.value)}
        placeholder="e.g., Nashville Electric Service, Pacific Gas and Electric"
      />

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Do you know your current electric rate schedule?"
          value={data.sec_4_2}
          onChange={e => onChange('sec_4_2', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {RATE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      {showRateName && (
        <FormField
          label="Rate schedule name"
          value={data.sec_4_3}
          onChange={e => onChange('sec_4_3', e.target.value)}
          placeholder="e.g., GS-2, Large Commercial"
        />
      )}

      <FileUpload
        label="Upload a recent utility bill (last 1–3 months) — PDF, JPG, or PNG, up to 10MB"
        value={data.sec_4_4}
        onChange={v => onChange('sec_4_4', v)}
        submissionId={submissionId}
      />

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Do you know the location of the main electrical service entrance?"
          value={data.sec_4_5}
          onChange={e => onChange('sec_4_5', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {LOCATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="sm:w-2/3">
        <FormField
          as="select"
          label="Any electrical service upgrades or significant issues in the last 10 years?"
          value={data.sec_4_6}
          onChange={e => onChange('sec_4_6', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {UPGRADE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      {showUpgDesc && (
        <FormField
          as="textarea"
          label="Describe the upgrades or issues"
          value={data.sec_4_7}
          onChange={e => onChange('sec_4_7', e.target.value)}
          placeholder="e.g., Service upgraded from 400A to 800A in 2019, transformer replaced after storm damage"
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Existing solar panels or on-site generation?"
          value={data.sec_4_8}
          onChange={e => onChange('sec_4_8', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {SOLAR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>

        <FormField
          as="select"
          label="Existing EV chargers on property?"
          value={data.sec_4_9}
          onChange={e => onChange('sec_4_9', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {CHARGER_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      {showChargerOp && (
        <FormField
          label="Who installed or operates the existing chargers?"
          value={data.sec_4_10}
          onChange={e => onChange('sec_4_10', e.target.value)}
          placeholder="e.g., ChargePoint, Tesla, installed by local electrician"
        />
      )}
    </div>
  );
}
