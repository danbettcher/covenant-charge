import { FormField } from "@/components/ui/FormField";
import type { SiteVisitSectionProps } from "../types";
import { RadioGroup } from "./Helpers";

export function Section0({ data, onChange, errors }: SiteVisitSectionProps) {
  return (
    <div className="space-y-5">
      <FormField
        label="Institution Name"
        value={data.institution_name}
        onChange={e => onChange("institution_name", e.target.value)}
        required
        error={errors.institution_name}
        placeholder="e.g., St. John's Community Church"
      />

      <FormField
        label="Site Address"
        value={data.site_address}
        onChange={e => onChange("site_address", e.target.value)}
        required
        error={errors.site_address}
        placeholder="Full street address including city and ZIP"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          type="date"
          label="Date of Visit"
          value={data.visit_date}
          onChange={e => onChange("visit_date", e.target.value)}
          required
          error={errors.visit_date}
        />
        <FormField
          label="Assessed By"
          value={data.assessed_by}
          onChange={e => onChange("assessed_by", e.target.value)}
          required
          error={errors.assessed_by}
          placeholder="Your name"
        />
      </div>

      <div className="h-px bg-slate-100" />

      <FormField
        label="Contact Name"
        value={data.contact_name}
        onChange={e => onChange("contact_name", e.target.value)}
        required
        error={errors.contact_name}
        placeholder="Primary contact at the institution"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Contact Title"
          value={data.contact_title}
          onChange={e => onChange("contact_title", e.target.value)}
          placeholder="e.g., Facilities Director"
        />
        <FormField
          type="tel"
          label="Contact Phone"
          value={data.contact_phone}
          onChange={e => onChange("contact_phone", e.target.value)}
          required
          error={errors.contact_phone}
          placeholder="(555) 000-0000"
        />
      </div>

      <FormField
        type="email"
        label="Contact Email"
        value={data.contact_email}
        onChange={e => onChange("contact_email", e.target.value)}
        required
        error={errors.contact_email}
        placeholder="contact@institution.org"
      />

      <FormField
        as="textarea"
        label="Weather Conditions"
        value={data.weather_conditions}
        onChange={e => onChange("weather_conditions", e.target.value)}
        placeholder="e.g., Overcast, 65°F, no rain"
        rows={2}
      />

      <RadioGroup
        label="Follow-up Visit Needed?"
        name="followup_needed"
        options={["Yes", "No"]}
        value={data.followup_needed}
        onChange={v => onChange("followup_needed", v)}
        required
        error={errors.followup_needed}
      />

      {data.followup_needed === "Yes" && (
        <FormField
          as="textarea"
          label="Follow-up reason"
          value={data.followup_reason}
          onChange={e => onChange("followup_reason", e.target.value)}
          placeholder="What needs to be assessed on a return visit?"
          rows={2}
          required
          error={errors.followup_reason}
        />
      )}
    </div>
  );
}
