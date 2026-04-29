import { FormField } from "@/components/ui/FormField";
import type { SiteVisitSectionProps } from "../types";
import { POST_VISIT_ACTION_ITEMS } from "../types";
import { RadioGroup } from "./Helpers";

const RATING_OPTIONS = ["Strong", "Moderate", "Weak"] as const;

export function Section5({ data, onChange, errors }: SiteVisitSectionProps) {
  function toggleAction(id: string) {
    onChange("post_visit_actions", {
      ...data.post_visit_actions,
      [id]: !data.post_visit_actions[id],
    });
  }

  return (
    <div className="space-y-5">
      <FormField
        as="textarea"
        label="Documents requested from institution"
        value={data.documents_requested}
        onChange={e => onChange("documents_requested", e.target.value)}
        placeholder="Utility bills, site plans, lease agreement, prior permits, etc."
      />

      <FormField
        as="textarea"
        label="Information not obtained on visit"
        value={data.info_not_obtained}
        onChange={e => onChange("info_not_obtained", e.target.value)}
        placeholder="What questions remain unanswered?"
      />

      <RadioGroup
        label="Follow-up visit required"
        name="sv_followup_visit"
        options={["Yes", "No"]}
        value={data.followup_visit_required}
        onChange={v => onChange("followup_visit_required", v)}
      />

      {data.followup_visit_required === "Yes" && (
        <FormField
          type="date"
          label="Follow-up date"
          value={data.followup_date}
          onChange={e => onChange("followup_date", e.target.value)}
        />
      )}

      <FormField
        as="textarea"
        label="Referrals or introductions offered"
        value={data.referrals}
        onChange={e => onChange("referrals", e.target.value)}
        placeholder="Any contacts shared or connections made during the visit"
        rows={2}
      />

      <FormField
        as="textarea"
        label="Red flags or disqualifiers observed"
        value={data.red_flags}
        onChange={e => onChange("red_flags", e.target.value)}
        placeholder="Anything that would prevent or significantly complicate a project"
      />

      <RadioGroup
        label="Assessor overall site rating (internal only)"
        name="sv_site_rating"
        options={RATING_OPTIONS}
        value={data.site_rating}
        onChange={v => onChange("site_rating", v)}
        required
        error={errors.site_rating}
      />

      <FormField
        as="textarea"
        label="Assessor rating rationale"
        value={data.rating_rationale}
        onChange={e => onChange("rating_rationale", e.target.value)}
        placeholder="Explain the rating — key factors that informed your assessment"
        required
        error={errors.rating_rationale}
      />

      {/* Post-visit action checklist */}
      <div className="pt-2">
        <p className="font-sans text-sm font-medium text-covenant-dark mb-1">
          Post-Visit Action Checklist
        </p>
        <p className="font-sans text-xs text-covenant-muted mb-4">
          For tracking only — these do not gate submission.
        </p>
        <div className="space-y-2">
          {POST_VISIT_ACTION_ITEMS.map(item => {
            const checked = data.post_visit_actions[item.id] ?? false;
            return (
              <label
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  checked
                    ? "border-covenant-green bg-covenant-green/5"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAction(item.id)}
                  className="mt-0.5 accent-covenant-green flex-shrink-0"
                />
                <span className="font-sans text-sm text-covenant-dark leading-snug">
                  {item.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
