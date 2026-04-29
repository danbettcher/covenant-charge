import { FormField } from "@/components/ui/FormField";
import type { SiteVisitSectionProps } from "../types";
import { Callout, SubHeading, RadioGroup } from "./Helpers";

export function Section2({ data, onChange }: SiteVisitSectionProps) {
  return (
    <div className="space-y-5">

      <Callout>Do not enter electrical rooms without escort.</Callout>

      {/* 2A */}
      <SubHeading title="2A. Utility Service" />

      <RadioGroup
        label="Utility Provider"
        name="sv_utility_provider"
        options={["SDG&E", "SoCalEd", "Other"]}
        value={data.utility_provider}
        onChange={v => onChange("utility_provider", v)}
      />

      {data.utility_provider === "Other" && (
        <FormField
          label="Other utility name"
          value={data.other_utility_name}
          onChange={e => onChange("other_utility_name", e.target.value)}
          placeholder="Utility provider name"
        />
      )}

      <FormField
        as="textarea"
        label="Service Entrance Location"
        value={data.service_entrance_location}
        onChange={e => onChange("service_entrance_location", e.target.value)}
        placeholder="Where on the property is the main service entrance?"
        rows={2}
      />

      <RadioGroup
        label="Meter visible?"
        name="sv_meter_visible"
        options={["Yes", "No"]}
        value={data.meter_visible}
        onChange={v => onChange("meter_visible", v)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {data.meter_visible === "Yes" && (
          <FormField
            label="Meter number (if visible)"
            value={data.meter_number}
            onChange={e => onChange("meter_number", e.target.value)}
            placeholder="As shown on meter face"
          />
        )}
        <FormField
          as="select"
          label="Meter Type"
          value={data.meter_type}
          onChange={e => onChange("meter_type", e.target.value)}
        >
          <option value="">Select</option>
          {["Standard", "Smart", "Interval", "Unknown"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Service Voltage"
          value={data.service_voltage}
          onChange={e => onChange("service_voltage", e.target.value)}
        >
          <option value="">Select</option>
          {["120/208V 3-phase", "277/480V 3-phase", "Unknown"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FormField>

        <FormField
          type="number"
          label="Estimated Service Size (amps)"
          value={data.service_size_amps}
          onChange={e => onChange("service_size_amps", e.target.value)}
          min="0"
          placeholder="e.g., 400, 800, 1200"
        />
      </div>

      <RadioGroup
        label="Secondary Meters on Site"
        name="sv_secondary_meters"
        options={["Yes", "No"]}
        value={data.secondary_meters}
        onChange={v => onChange("secondary_meters", v)}
      />

      {data.secondary_meters === "Yes" && (
        <FormField
          as="textarea"
          label="Secondary meter notes"
          value={data.secondary_meter_notes}
          onChange={e => onChange("secondary_meter_notes", e.target.value)}
          placeholder="Number and purpose of secondary meters"
          rows={2}
        />
      )}

      <RadioGroup
        label="SDG&E Power Your Drive equipment visible?"
        name="sv_sdge_pyd"
        options={["Yes", "No"]}
        value={data.sdge_pyd_equipment}
        onChange={v => onChange("sdge_pyd_equipment", v)}
      />

      {/* 2B */}
      <SubHeading title="2B. Main Panel / Switchgear" />

      <FormField
        as="textarea"
        label="Main Panel Location"
        value={data.main_panel_location}
        onChange={e => onChange("main_panel_location", e.target.value)}
        placeholder="Building, room, or area where the main panel is located"
        rows={2}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          type="number"
          label="Main Breaker Size (amps)"
          value={data.main_breaker_size}
          onChange={e => onChange("main_breaker_size", e.target.value)}
          min="0"
          placeholder="e.g., 400"
        />
        <FormField
          type="number"
          label="Panel Age (approx. years)"
          value={data.panel_age}
          onChange={e => onChange("panel_age", e.target.value)}
          min="0"
          placeholder="e.g., 15"
        />
      </div>

      <RadioGroup
        label="Open breaker slots visible?"
        name="sv_open_slots"
        options={["Yes", "No", "Unclear"]}
        value={data.open_breaker_slots}
        onChange={v => onChange("open_breaker_slots", v)}
      />

      <FormField
        as="textarea"
        label="Estimated available capacity"
        value={data.available_capacity}
        onChange={e => onChange("available_capacity", e.target.value)}
        placeholder="Visual estimate only — do not open panel without authorization"
        rows={2}
      />

      <FormField
        as="select"
        label="Panel condition"
        value={data.panel_condition}
        onChange={e => onChange("panel_condition", e.target.value)}
      >
        <option value="">Select</option>
        {["Good", "Fair", "Poor"].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>

      <FormField
        as="textarea"
        label="Panel access restrictions"
        value={data.panel_access_restrictions}
        onChange={e => onChange("panel_access_restrictions", e.target.value)}
        placeholder="Lock, key required, escort needed, alarmed, etc."
        rows={2}
      />

      <RadioGroup
        label="Sub-panels near parking area?"
        name="sv_sub_panels"
        options={["Yes", "No"]}
        value={data.sub_panels_near_lot}
        onChange={v => onChange("sub_panels_near_lot", v)}
      />

      {data.sub_panels_near_lot === "Yes" && (
        <FormField
          as="textarea"
          label="Sub-panel notes"
          value={data.sub_panel_notes}
          onChange={e => onChange("sub_panel_notes", e.target.value)}
          placeholder="Location, approximate size, and purpose"
          rows={2}
        />
      )}

      {/* 2C */}
      <SubHeading title="2C. Transformer" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          as="select"
          label="Transformer Location"
          value={data.transformer_location}
          onChange={e => onChange("transformer_location", e.target.value)}
        >
          <option value="">Select</option>
          {["Pad-mount", "Pole", "Vault", "Not found"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FormField>
      </div>

      <RadioGroup
        label="Transformer Owner"
        name="sv_transformer_owner"
        options={["Utility-owned", "Customer-owned", "Unknown"]}
        value={data.transformer_owner}
        onChange={v => onChange("transformer_owner", v)}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          type="number"
          label="Transformer Size (kVA, if visible)"
          value={data.transformer_size_kva}
          onChange={e => onChange("transformer_size_kva", e.target.value)}
          min="0"
          placeholder="kVA"
        />
        <FormField
          type="number"
          label="Est. distance to stalls (ft)"
          value={data.transformer_distance}
          onChange={e => onChange("transformer_distance", e.target.value)}
          min="0"
          placeholder="ft"
        />
      </div>

      <FormField
        as="select"
        label="Transformer condition"
        value={data.transformer_condition}
        onChange={e => onChange("transformer_condition", e.target.value)}
      >
        <option value="">Select</option>
        {["Good", "Fair", "Concerns"].map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </FormField>

      {data.transformer_condition === "Concerns" && (
        <FormField
          as="textarea"
          label="Condition notes"
          value={data.transformer_condition_notes}
          onChange={e => onChange("transformer_condition_notes", e.target.value)}
          placeholder="Describe the concerns observed"
          rows={2}
        />
      )}

      {/* 2D */}
      <SubHeading title="2D. Conduit & Infrastructure" />

      <RadioGroup
        label="Existing conduit visible near lot?"
        name="sv_conduit_visible"
        options={["Yes", "No"]}
        value={data.conduit_visible}
        onChange={v => onChange("conduit_visible", v)}
      />

      {data.conduit_visible === "Yes" && (
        <FormField
          as="textarea"
          label="Conduit description"
          value={data.conduit_description}
          onChange={e => onChange("conduit_description", e.target.value)}
          placeholder="Size, material, approximate routing"
          rows={2}
        />
      )}

      <FormField
        as="textarea"
        label="Trench/boring path obstacles"
        value={data.trench_obstacles}
        onChange={e => onChange("trench_obstacles", e.target.value)}
        placeholder="Driveways, landscaping, utilities, hardscape between panel and candidate stalls"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          type="number"
          label="Estimated conduit run distance (ft)"
          value={data.conduit_run_distance}
          onChange={e => onChange("conduit_run_distance", e.target.value)}
          min="0"
          placeholder="ft"
        />
        <FormField
          as="select"
          label="Hardscape type (panel to stalls)"
          value={data.hardscape_type}
          onChange={e => onChange("hardscape_type", e.target.value)}
        >
          <option value="">Select</option>
          {["Concrete", "Asphalt", "Pavers", "Landscaping", "Mixed"].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </FormField>
      </div>

      <RadioGroup
        label="Underground utility concerns"
        name="sv_underground"
        options={["Yes", "No", "Unknown"]}
        value={data.underground_utility_concerns}
        onChange={v => onChange("underground_utility_concerns", v)}
      />

      {data.underground_utility_concerns === "Yes" && (
        <FormField
          as="textarea"
          label="Utility conflict notes"
          value={data.utility_conflict_notes}
          onChange={e => onChange("utility_conflict_notes", e.target.value)}
          placeholder="Describe known or suspected underground conflicts"
          rows={2}
        />
      )}
    </div>
  );
}
