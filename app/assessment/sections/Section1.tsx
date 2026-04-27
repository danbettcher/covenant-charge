import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";

const INST_TYPES = [
  'Church / Congregation',
  'Christian school or academy',
  'Seminary or Bible college',
  'Nonprofit ministry or parachurch org',
  'Faith-based community center',
  'Multi-site campus',
  'Other',
];

const BEST_TIMES = ['Morning (before noon)', 'Afternoon (noon–5pm)', 'Evening (after 5pm)', 'Anytime'];

export function Section1({ data, onChange, errors }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading number="1" title="Contact & Institution Information" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Primary contact name"
          required
          value={data.sec_1_1}
          onChange={e => onChange('sec_1_1', e.target.value)}
          placeholder="Jane Smith"
          error={errors.sec_1_1}
        />
        <FormField
          label="Title or role at this institution"
          value={data.sec_1_2}
          onChange={e => onChange('sec_1_2', e.target.value)}
          placeholder="e.g., Senior Pastor, Facilities Manager"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Email address"
          required
          type="email"
          value={data.sec_1_3}
          onChange={e => onChange('sec_1_3', e.target.value)}
          placeholder="jane@institution.org"
          error={errors.sec_1_3}
        />
        <FormField
          label="Phone number"
          required
          type="tel"
          value={data.sec_1_4}
          onChange={e => onChange('sec_1_4', e.target.value)}
          placeholder="(555) 555-5555"
          error={errors.sec_1_4}
        />
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Best time to reach you"
          value={data.sec_1_5}
          onChange={e => onChange('sec_1_5', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {BEST_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
        </FormField>
      </div>

      <FormField
        label="Institution name"
        required
        value={data.sec_1_6}
        onChange={e => onChange('sec_1_6', e.target.value)}
        placeholder="Grace Community Church"
        error={errors.sec_1_6}
      />

      <FormField
        as="select"
        label="Institution type"
        required
        value={data.sec_1_7}
        onChange={e => onChange('sec_1_7', e.target.value)}
        error={errors.sec_1_7}
      >
        <option value="">Select a type</option>
        {INST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
      </FormField>

      {data.sec_1_7 === 'Other' && (
        <FormField
          label="Describe your institution type"
          value={data.sec_1_8}
          onChange={e => onChange('sec_1_8', e.target.value)}
          placeholder="Please describe"
        />
      )}

      <FormField
        label="Denomination or network affiliation"
        value={data.sec_1_9}
        onChange={e => onChange('sec_1_9', e.target.value)}
        placeholder="e.g., Southern Baptist Convention, ACSI, Independent"
      />

      <div className="sm:w-1/2">
        <FormField
          label="Estimated weekly attendance or enrollment"
          type="number"
          value={data.sec_1_10}
          onChange={e => onChange('sec_1_10', e.target.value)}
          placeholder="e.g., 350"
          min="0"
        />
      </div>

      <div className="sm:w-1/2">
        <FormField
          as="select"
          label="Does your institution have a separate facilities point of contact?"
          value={data.sec_1_11}
          onChange={e => onChange('sec_1_11', e.target.value)}
        >
          <option value="">Select (optional)</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </FormField>
      </div>

      {data.sec_1_11 === 'Yes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Facilities contact name"
            value={data.sec_1_12.name}
            onChange={e => onChange('sec_1_12', { ...data.sec_1_12, name: e.target.value })}
            placeholder="Facilities Manager Name"
          />
          <FormField
            label="Facilities contact email"
            type="email"
            value={data.sec_1_12.email}
            onChange={e => onChange('sec_1_12', { ...data.sec_1_12, email: e.target.value })}
            placeholder="facilities@institution.org"
          />
        </div>
      )}
    </div>
  );
}
