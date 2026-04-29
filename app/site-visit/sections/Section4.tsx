import { FormField } from "@/components/ui/FormField";
import type { SiteVisitSectionProps } from "../types";
import { SubHeading, RadioGroup } from "./Helpers";

export function Section4({ data, onChange }: SiteVisitSectionProps) {
  return (
    <div className="space-y-5">

      {/* 4A */}
      <SubHeading title="4A. Access Logistics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Security contact name"
          value={data.security_contact_name}
          onChange={e => onChange("security_contact_name", e.target.value)}
          placeholder="Name"
        />
        <FormField
          type="tel"
          label="Security contact phone"
          value={data.security_contact_phone}
          onChange={e => onChange("security_contact_phone", e.target.value)}
          placeholder="(555) 000-0000"
        />
      </div>

      <RadioGroup
        label="Surveillance cameras in lot?"
        name="sv_surveillance"
        options={["Yes", "No"]}
        value={data.surveillance_cameras}
        onChange={v => onChange("surveillance_cameras", v)}
      />

      <FormField
        as="textarea"
        label="After-hours access procedure"
        value={data.after_hours_access}
        onChange={e => onChange("after_hours_access", e.target.value)}
        placeholder="Who to contact, how to access, security codes, gate procedures, etc."
      />

      <FormField
        as="textarea"
        label="Seasonal closures or restrictions"
        value={data.seasonal_closures}
        onChange={e => onChange("seasonal_closures", e.target.value)}
        placeholder="e.g., Closed during summer camp July–August"
        rows={2}
      />

      {/* 4B */}
      <SubHeading title="4B. Decision-Making & Governance" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          label="Facilities decision-maker name"
          value={data.facilities_dm_name}
          onChange={e => onChange("facilities_dm_name", e.target.value)}
          placeholder="Full name"
        />
        <FormField
          label="Facilities decision-maker title"
          value={data.facilities_dm_title}
          onChange={e => onChange("facilities_dm_title", e.target.value)}
          placeholder="e.g., Facilities Director"
        />
      </div>

      <FormField
        as="select"
        label="Who approves infrastructure changes"
        value={data.who_approves_infra}
        onChange={e => onChange("who_approves_infra", e.target.value)}
      >
        <option value="">Select</option>
        {["Facilities alone", "Board required", "Pastor", "Committee", "Unknown"].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Board meeting frequency"
          value={data.board_meeting_frequency}
          onChange={e => onChange("board_meeting_frequency", e.target.value)}
        >
          <option value="">Select</option>
          {["Monthly", "Quarterly", "Annual", "Unknown"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FormField>

        <FormField
          as="select"
          label="Prior contractor experience"
          value={data.contractor_experience}
          onChange={e => onChange("contractor_experience", e.target.value)}
        >
          <option value="">Select</option>
          {["Smooth", "Had issues", "No experience"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FormField>
      </div>

      {data.contractor_experience === "Had issues" && (
        <FormField
          as="textarea"
          label="Contractor experience notes"
          value={data.contractor_experience_notes}
          onChange={e => onChange("contractor_experience_notes", e.target.value)}
          placeholder="Describe the issues they encountered"
          rows={2}
        />
      )}

      <RadioGroup
        label="Property ownership"
        name="sv_ownership"
        options={["Owned", "Leased"]}
        value={data.property_ownership}
        onChange={v => onChange("property_ownership", v)}
      />

      {data.property_ownership === "Leased" && (
        <FormField
          as="textarea"
          label="Lease / landlord notes"
          value={data.lease_notes}
          onChange={e => onChange("lease_notes", e.target.value)}
          placeholder="Landlord contact, lease terms, any restrictions on capital improvements"
          rows={2}
        />
      )}

      <RadioGroup
        label="Active construction or planned renovation?"
        name="sv_construction"
        options={["Yes", "No"]}
        value={data.active_construction}
        onChange={v => onChange("active_construction", v)}
      />

      {data.active_construction === "Yes" && (
        <FormField
          as="textarea"
          label="Construction notes"
          value={data.construction_notes}
          onChange={e => onChange("construction_notes", e.target.value)}
          placeholder="Timeline and scope of construction"
          rows={2}
        />
      )}

      {/* 4C */}
      <SubHeading title="4C. Financial & Program Readiness" />

      <FormField
        as="select"
        label="Institution awareness of EV program economics"
        value={data.institution_ev_awareness}
        onChange={e => onChange("institution_ev_awareness", e.target.value)}
      >
        <option value="">Select</option>
        {["Well informed", "Vague", "None"].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>

      <RadioGroup
        label="Prior discussions with EV operators or utilities"
        name="sv_prior_ev"
        options={["Yes", "No"]}
        value={data.prior_ev_discussions}
        onChange={v => onChange("prior_ev_discussions", v)}
      />

      {data.prior_ev_discussions === "Yes" && (
        <FormField
          as="textarea"
          label="Prior discussion notes"
          value={data.prior_discussion_notes}
          onChange={e => onChange("prior_discussion_notes", e.target.value)}
          placeholder="Who they spoke with, what was discussed, outcome"
          rows={2}
        />
      )}

      <FormField
        as="select"
        label="Equipment ownership preference"
        value={data.ownership_preference}
        onChange={e => onChange("ownership_preference", e.target.value)}
      >
        <option value="">Select</option>
        {[
          "Operator-owned preferred",
          "Institution-owned preferred",
          "Open",
          "No preference",
        ].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>

      <RadioGroup
        label="SDG&E Power Your Drive awareness"
        name="sv_pyd_awareness"
        options={["Aware", "Not aware"]}
        value={data.sdge_pyd_awareness}
        onChange={v => onChange("sdge_pyd_awareness", v)}
      />

      <FormField
        as="select"
        label="Urgency / Timeline"
        value={data.urgency_timeline}
        onChange={e => onChange("urgency_timeline", e.target.value)}
      >
        <option value="">Select</option>
        {["ASAP", "Flexible", "Tied to specific event or grant"].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>

      {data.urgency_timeline === "Tied to specific event or grant" && (
        <FormField
          as="textarea"
          label="Timeline notes"
          value={data.timeline_notes}
          onChange={e => onChange("timeline_notes", e.target.value)}
          placeholder="Event, grant deadline, or other timing constraint"
          rows={2}
        />
      )}

      <FormField
        as="select"
        label="Financing availability"
        value={data.financing_availability}
        onChange={e => onChange("financing_availability", e.target.value)}
      >
        <option value="">Select</option>
        {[
          "Willing to finance",
          "Grant-dependent only",
          "Operator-funded only",
          "Unknown",
        ].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>
    </div>
  );
}
