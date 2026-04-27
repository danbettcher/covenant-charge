import { FormField } from "@/components/ui/FormField";
import type { SectionProps } from "../types";
import { SectionHeading } from "./SectionHeading";

const AUTHORITY_OPTIONS = ['Senior pastor alone', 'Elder or deacon board', 'Board of directors', 'School principal with board approval', 'Executive director with board approval', 'Committee-based', 'Other'];
const BOARD_VOTE = ['Yes', 'No', 'Unsure'];
const MEETING_FREQ = ['Weekly', 'Monthly', 'Quarterly', 'Twice yearly', 'Annually', 'As needed'];
const DECISION_TIME = ['Less than 30 days', '30–60 days', '60–90 days', 'More than 90 days', 'Unsure'];

export function Section10({ data, onChange, errors }: SectionProps) {
  return (
    <div className="space-y-5">
      <SectionHeading number="10" title="Governance & Decision-Making" />

      <div className="sm:w-2/3">
        <FormField
          as="select"
          label="Who holds final authority over major property decisions?"
          value={data.sec_10_1}
          onChange={e => onChange('sec_10_1', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {AUTHORITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Is a formal board vote required for a long-term agreement?"
          value={data.sec_10_2}
          onChange={e => onChange('sec_10_2', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {BOARD_VOTE.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>

        <FormField
          as="select"
          label="How often does the board or governing committee meet?"
          value={data.sec_10_3}
          onChange={e => onChange('sec_10_3', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {MEETING_FREQ.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div className="sm:w-2/3">
        <FormField
          as="select"
          label="If this is a strong fit, how long might it realistically take to reach a formal decision?"
          value={data.sec_10_4}
          onChange={e => onChange('sec_10_4', e.target.value)}
        >
          <option value="">Select (optional)</option>
          {DECISION_TIME.map(o => <option key={o} value={o}>{o}</option>)}
        </FormField>
      </div>

      <div
        className={`rounded-xl border-2 p-5 transition-colors ${
          data.sec_10_5 ? 'border-covenant-green bg-covenant-green/5' : 'border-slate-200'
        }`}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.sec_10_5}
            onChange={e => onChange('sec_10_5', e.target.checked)}
            className="mt-1 accent-covenant-green flex-shrink-0"
            id="consent-10-5"
          />
          <span className="font-sans text-sm text-covenant-dark leading-relaxed">
            By submitting this assessment, I confirm that I have the authority to initiate this inquiry
            or am doing so with the awareness of appropriate institutional leadership, and I consent to
            Covenant Charge using this information to conduct a preliminary site evaluation.
            <span className="text-covenant-green ml-1">*</span>
          </span>
        </label>
        {errors.sec_10_5 && (
          <p className="font-sans text-xs text-red-500 mt-2 ml-7">{errors.sec_10_5}</p>
        )}
      </div>
    </div>
  );
}
