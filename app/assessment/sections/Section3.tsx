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

      {/* Charger quantity intent */}
      <div className="flex flex-col gap-2">
        <p className="font-sans text-sm font-medium text-covenant-dark">
          How many charging stations are you looking to install?
        </p>
        <div className="flex flex-col gap-2">

          {/* Option A */}
          <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
            data.sec_3_12.intent === 'exact'
              ? 'border-covenant-blue bg-covenant-blue/5'
              : 'border-slate-200 hover:border-slate-300'
          }`}>
            <input
              type="radio"
              name="sec_3_12_intent"
              value="exact"
              checked={data.sec_3_12.intent === 'exact'}
              onChange={() => onChange('sec_3_12', { ...data.sec_3_12, intent: 'exact' })}
              className="mt-0.5 accent-covenant-blue flex-shrink-0"
            />
            <span className="font-sans text-sm text-covenant-dark leading-snug">We know exactly what we want</span>
          </label>
          {data.sec_3_12.intent === 'exact' && (
            <div className="ml-8 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
              <FormField
                label="Number of charging stations"
                type="number"
                min="0"
                value={data.sec_3_12.stations}
                onChange={e => onChange('sec_3_12', { ...data.sec_3_12, stations: e.target.value })}
                placeholder="e.g., 4"
              />
              <FormField
                label="Number of parking spaces to electrify"
                type="number"
                min="0"
                value={data.sec_3_12.spaces}
                onChange={e => onChange('sec_3_12', { ...data.sec_3_12, spaces: e.target.value })}
                placeholder="e.g., 8"
              />
            </div>
          )}

          {/* Option B */}
          <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
            data.sec_3_12.intent === 'open'
              ? 'border-covenant-blue bg-covenant-blue/5'
              : 'border-slate-200 hover:border-slate-300'
          }`}>
            <input
              type="radio"
              name="sec_3_12_intent"
              value="open"
              checked={data.sec_3_12.intent === 'open'}
              onChange={() => onChange('sec_3_12', { ...data.sec_3_12, intent: 'open' })}
              className="mt-0.5 accent-covenant-blue flex-shrink-0"
            />
            <span className="font-sans text-sm text-covenant-dark leading-snug">We have an idea but we&rsquo;re open to recommendations</span>
          </label>
          {data.sec_3_12.intent === 'open' && (
            <div className="ml-8 space-y-3 pb-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  label="Number of charging stations"
                  type="number"
                  min="0"
                  value={data.sec_3_12.stations}
                  onChange={e => onChange('sec_3_12', { ...data.sec_3_12, stations: e.target.value })}
                  placeholder="e.g., 4"
                />
                <FormField
                  label="Number of parking spaces to electrify"
                  type="number"
                  min="0"
                  value={data.sec_3_12.spaces}
                  onChange={e => onChange('sec_3_12', { ...data.sec_3_12, spaces: e.target.value })}
                  placeholder="e.g., 8"
                />
              </div>
              <p className="font-sans text-xs text-covenant-muted bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                Covenant Charge will review your inputs and may suggest adjustments based on your site profile.
              </p>
            </div>
          )}

          {/* Option C */}
          <label className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
            data.sec_3_12.intent === 'none'
              ? 'border-covenant-blue bg-covenant-blue/5'
              : 'border-slate-200 hover:border-slate-300'
          }`}>
            <input
              type="radio"
              name="sec_3_12_intent"
              value="none"
              checked={data.sec_3_12.intent === 'none'}
              onChange={() => onChange('sec_3_12', { ...data.sec_3_12, intent: 'none' })}
              className="mt-0.5 accent-covenant-blue flex-shrink-0"
            />
            <span className="font-sans text-sm text-covenant-dark leading-snug">We have no idea — we need a recommendation</span>
          </label>
          {data.sec_3_12.intent === 'none' && (
            <div className="ml-8 pb-1">
              <p className="font-sans text-sm text-covenant-green bg-covenant-green/5 border border-covenant-green/20 rounded-lg px-3 py-2">
                No problem. We&rsquo;ll assess your site and come back to you with configuration options that make sense for your property.
              </p>
            </div>
          )}

        </div>
      </div>

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
