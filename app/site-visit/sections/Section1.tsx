import { FormField } from "@/components/ui/FormField";
import type { SiteVisitSectionProps } from "../types";
import { Callout, SubHeading, RadioGroup } from "./Helpers";

export function Section1({ data, onChange }: SiteVisitSectionProps) {
  return (
    <div className="space-y-5">

      {/* 1A */}
      <SubHeading title="1A. Lot Configuration" />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          type="number"
          label="Total Parking Spaces"
          value={data.total_spaces}
          onChange={e => onChange("total_spaces", e.target.value)}
          min="0"
          placeholder="0"
        />
        <FormField
          type="number"
          label="ADA Spaces"
          value={data.ada_spaces}
          onChange={e => onChange("ada_spaces", e.target.value)}
          min="0"
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Lot Type"
          value={data.lot_type}
          onChange={e => onChange("lot_type", e.target.value)}
        >
          <option value="">Select</option>
          {["Surface", "Covered", "Structured", "Mixed"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FormField>

        <FormField
          as="select"
          label="Pavement Condition"
          value={data.pavement_condition}
          onChange={e => onChange("pavement_condition", e.target.value)}
        >
          <option value="">Select</option>
          {["Good", "Fair", "Poor"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FormField>
      </div>

      <FormField
        as="textarea"
        label="Pavement notes"
        value={data.pavement_notes}
        onChange={e => onChange("pavement_notes", e.target.value)}
        placeholder="Cracks, heaving, recent resurfacing, ponding areas, etc."
        rows={2}
      />

      <div>
        <p className="font-sans text-sm font-medium text-covenant-dark mb-2">Lot Dimensions (approx. ft)</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            type="number"
            label="Width (ft)"
            value={data.lot_width}
            onChange={e => onChange("lot_width", e.target.value)}
            min="0"
            placeholder="e.g., 200"
          />
          <FormField
            type="number"
            label="Depth (ft)"
            value={data.lot_depth}
            onChange={e => onChange("lot_depth", e.target.value)}
            min="0"
            placeholder="e.g., 150"
          />
        </div>
      </div>

      <RadioGroup
        label="Lighting"
        name="sv_lighting"
        options={["Yes", "No"]}
        value={data.lighting}
        onChange={v => onChange("lighting", v)}
      />

      {data.lighting === "Yes" && (
        <FormField
          as="textarea"
          label="Lighting notes"
          value={data.lighting_notes}
          onChange={e => onChange("lighting_notes", e.target.value)}
          placeholder="Coverage, condition, pole-mounted vs. building-mounted, etc."
          rows={2}
        />
      )}

      <FormField
        as="select"
        label="Perimeter / Fencing"
        value={data.perimeter}
        onChange={e => onChange("perimeter", e.target.value)}
      >
        <option value="">Select</option>
        {["Open", "Chain-link", "Solid", "Other"].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>

      {/* 1B */}
      <SubHeading title="1B. Traffic & Access" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          type="number"
          label="Number of Ingress/Egress Points"
          value={data.ingress_egress_count}
          onChange={e => onChange("ingress_egress_count", e.target.value)}
          min="0"
          placeholder="e.g., 2"
        />
        <FormField
          label="Main Street / Corridor"
          value={data.main_street}
          onChange={e => onChange("main_street", e.target.value)}
          placeholder="e.g., Pacific Coast Hwy"
        />
      </div>

      <RadioGroup
        label="Signalized intersection?"
        name="sv_signalized"
        options={["Yes", "No"]}
        value={data.signalized_intersection}
        onChange={v => onChange("signalized_intersection", v)}
      />

      <FormField
        label="Peak Usage Hours"
        value={data.peak_hours}
        onChange={e => onChange("peak_hours", e.target.value)}
        placeholder="e.g., Sun 9am–1pm, Wed 6–9pm"
      />

      <RadioGroup
        label="Lot Open Hours"
        name="sv_lot_hours"
        options={["24/7", "Restricted"]}
        value={data.lot_open_hours}
        onChange={v => onChange("lot_open_hours", v)}
      />

      {data.lot_open_hours === "Restricted" && (
        <FormField
          label="Restricted hours detail"
          value={data.restricted_hours_detail}
          onChange={e => onChange("restricted_hours_detail", e.target.value)}
          placeholder="e.g., Mon–Sat 7am–9pm, closed Sundays"
        />
      )}

      <FormField
        as="select"
        label="Gating or Access Control"
        value={data.gating}
        onChange={e => onChange("gating", e.target.value)}
      >
        <option value="">Select</option>
        {["None", "Manual", "Automated"].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>

      <RadioGroup
        label="Shared Use (non-institution)"
        name="sv_shared_use"
        options={["Yes", "No"]}
        value={data.shared_use}
        onChange={v => onChange("shared_use", v)}
      />

      {data.shared_use === "Yes" && (
        <FormField
          as="textarea"
          label="Shared use detail"
          value={data.shared_use_detail}
          onChange={e => onChange("shared_use_detail", e.target.value)}
          placeholder="Who uses the lot, when, and any formal agreements"
          rows={2}
        />
      )}

      {/* 1C */}
      <SubHeading title="1C. EV Stall Siting — Observations" />

      <Callout>Do not commit to stall locations on-site — observation only.</Callout>

      <FormField
        as="textarea"
        label="Best candidate area(s)"
        value={data.ev_candidate_areas}
        onChange={e => onChange("ev_candidate_areas", e.target.value)}
        placeholder="Describe location relative to landmarks, building entry, electrical infrastructure, etc."
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          type="number"
          label="Approx. EV stalls possible"
          value={data.ev_stalls_possible}
          onChange={e => onChange("ev_stalls_possible", e.target.value)}
          min="0"
          placeholder="e.g., 6"
        />
        <FormField
          type="number"
          label="Distance to building (ft)"
          value={data.distance_to_building}
          onChange={e => onChange("distance_to_building", e.target.value)}
          min="0"
          placeholder="e.g., 80"
        />
      </div>

      <RadioGroup
        label="Solar canopy potential"
        name="sv_solar_canopy"
        options={["Yes", "No", "Unclear"]}
        value={data.solar_canopy_potential}
        onChange={v => onChange("solar_canopy_potential", v)}
      />

      <RadioGroup
        label="ADA proximity viable"
        name="sv_ada_proximity"
        options={["Yes", "No", "Unclear"]}
        value={data.ada_proximity_viable}
        onChange={v => onChange("ada_proximity_viable", v)}
      />

      <RadioGroup
        label="Drainage concerns"
        name="sv_drainage"
        options={["Yes", "No"]}
        value={data.drainage_concerns}
        onChange={v => onChange("drainage_concerns", v)}
      />

      {data.drainage_concerns === "Yes" && (
        <FormField
          as="textarea"
          label="Drainage notes"
          value={data.drainage_notes}
          onChange={e => onChange("drainage_notes", e.target.value)}
          placeholder="Describe drainage issues observed"
          rows={2}
        />
      )}
    </div>
  );
}
