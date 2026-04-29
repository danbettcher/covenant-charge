export type PhotoUploadMeta = {
  path: string;
  filename: string;
  uploadedAt: string;
};

export type PhotoItem = {
  checked: boolean;
  notes: string;
  upload?: PhotoUploadMeta;
};
export type PhotoChecklist = Record<string, PhotoItem>;

export type SiteVisitData = {
  // Section 0 — Visit Information
  institution_name: string;
  site_address: string;
  visit_date: string;
  assessed_by: string;
  contact_name: string;
  contact_title: string;
  contact_phone: string;
  contact_email: string;
  weather_conditions: string;
  followup_needed: string;
  followup_reason: string;

  // Section 1A — Lot Configuration
  total_spaces: string;
  ada_spaces: string;
  lot_type: string;
  pavement_condition: string;
  pavement_notes: string;
  lot_width: string;
  lot_depth: string;
  lighting: string;
  lighting_notes: string;
  perimeter: string;

  // Section 1B — Traffic & Access
  ingress_egress_count: string;
  main_street: string;
  signalized_intersection: string;
  peak_hours: string;
  lot_open_hours: string;
  restricted_hours_detail: string;
  gating: string;
  shared_use: string;
  shared_use_detail: string;

  // Section 1C — EV Stall Siting
  ev_candidate_areas: string;
  ev_stalls_possible: string;
  distance_to_building: string;
  solar_canopy_potential: string;
  ada_proximity_viable: string;
  drainage_concerns: string;
  drainage_notes: string;

  // Section 2A — Utility Service
  utility_provider: string;
  other_utility_name: string;
  service_entrance_location: string;
  meter_visible: string;
  meter_number: string;
  meter_type: string;
  service_voltage: string;
  service_size_amps: string;
  secondary_meters: string;
  secondary_meter_notes: string;
  sdge_pyd_equipment: string;

  // Section 2B — Main Panel / Switchgear
  main_panel_location: string;
  main_breaker_size: string;
  open_breaker_slots: string;
  available_capacity: string;
  panel_age: string;
  panel_condition: string;
  panel_access_restrictions: string;
  sub_panels_near_lot: string;
  sub_panel_notes: string;

  // Section 2C — Transformer
  transformer_location: string;
  transformer_owner: string;
  transformer_size_kva: string;
  transformer_distance: string;
  transformer_condition: string;
  transformer_condition_notes: string;

  // Section 2D — Conduit & Infrastructure
  conduit_visible: string;
  conduit_description: string;
  trench_obstacles: string;
  conduit_run_distance: string;
  hardscape_type: string;
  underground_utility_concerns: string;
  utility_conflict_notes: string;

  // Section 3 — Photo Checklist
  photo_checklist: PhotoChecklist;

  // Section 4A — Access Logistics
  security_contact_name: string;
  security_contact_phone: string;
  surveillance_cameras: string;
  after_hours_access: string;
  seasonal_closures: string;

  // Section 4B — Decision-Making & Governance
  facilities_dm_name: string;
  facilities_dm_title: string;
  who_approves_infra: string;
  board_meeting_frequency: string;
  contractor_experience: string;
  contractor_experience_notes: string;
  property_ownership: string;
  lease_notes: string;
  active_construction: string;
  construction_notes: string;

  // Section 4C — Financial & Program Readiness
  institution_ev_awareness: string;
  prior_ev_discussions: string;
  prior_discussion_notes: string;
  ownership_preference: string;
  sdge_pyd_awareness: string;
  urgency_timeline: string;
  timeline_notes: string;
  financing_availability: string;

  // Section 5 — Open Items & Summary
  documents_requested: string;
  info_not_obtained: string;
  followup_visit_required: string;
  followup_date: string;
  referrals: string;
  red_flags: string;
  site_rating: string;
  rating_rationale: string;
  post_visit_actions: Record<string, boolean>;
};

export type SiteVisitSectionProps = {
  data: SiteVisitData;
  onChange: <K extends keyof SiteVisitData>(field: K, value: SiteVisitData[K]) => void;
  errors: Record<string, string>;
  sessionId?: string;
};

export const PHOTO_SECTIONS = [
  {
    id: "3a",
    label: "3A. Site Overview",
    photos: [
      { id: "3a_aerial",        label: "Aerial-style overview from highest vantage" },
      { id: "3a_main_entrance", label: "Full lot from main entrance" },
      { id: "3a_rear",          label: "Full lot from rear" },
      { id: "3a_street",        label: "Street-facing view" },
    ],
  },
  {
    id: "3b",
    label: "3B. Electrical Infrastructure",
    photos: [
      { id: "3b_service_wide",          label: "Main service entrance — wide shot" },
      { id: "3b_panel_open",            label: "Main panel — open door with breaker layout" },
      { id: "3b_main_breaker",          label: "Main breaker closeup (amp rating legible)" },
      { id: "3b_transformer_nameplate", label: "Transformer nameplate (kVA, voltage, owner tag)" },
      { id: "3b_transformer_distance",  label: "Transformer distance reference shot" },
      { id: "3b_conduit",               label: "Exterior conduit or junction boxes near lot" },
    ],
  },
  {
    id: "3c",
    label: "3C. Candidate Stall Area",
    photos: [
      { id: "3c_wide",          label: "Wide shot of candidate stall area" },
      { id: "3c_pavement",      label: "Closeup of pavement condition" },
      { id: "3c_ada",           label: "ADA stalls — location relative to candidate area" },
      { id: "3c_building_wall", label: "Nearest building wall / exterior outlet" },
      { id: "3c_shade",         label: "Shade structures or canopy potential overhead" },
    ],
  },
  {
    id: "3d",
    label: "3D. Site Context",
    photos: [
      { id: "3d_street",        label: "Adjacent street — traffic context and line of sight" },
      { id: "3d_existing_ev",   label: "Existing EV equipment or signage" },
      { id: "3d_utility_poles", label: "Utility poles on or adjacent to property" },
      { id: "3d_solar",         label: "Visible solar panels or rooftop equipment" },
    ],
  },
] as const;

export const TOTAL_PHOTOS = PHOTO_SECTIONS.reduce((sum, s) => sum + s.photos.length, 0);

export const POST_VISIT_ACTION_ITEMS = [
  { id: "photos_uploaded",       label: "Uploaded all photos to Google Drive — labeled and geotagged" },
  { id: "checklist_saved",       label: "Checklist saved to site folder" },
  { id: "site_logged_notion",    label: "Site logged in Notion Site Assessment Database" },
  { id: "thankyou_sent",         label: "Thank-you follow-up sent to contact within 24 hours" },
  { id: "utility_bill_requested", label: "Utility bill requested from contact (12 months preferred)" },
  { id: "electrical_flagged",    label: "Open electrical questions flagged for engineering review" },
  { id: "snapshot_initiated",    label: "Stewardship Snapshot initiated (if Tier A or B)" },
] as const;

export const SECTION_LABELS = [
  "Visit Information",
  "Parking Lot & Site Layout",
  "Electrical Infrastructure",
  "Photo Checklist",
  "Governance & Readiness",
  "Open Items & Summary",
];

function makeEmptyPhotoChecklist(): PhotoChecklist {
  const checklist: PhotoChecklist = {};
  for (const section of PHOTO_SECTIONS) {
    for (const photo of section.photos) {
      checklist[photo.id] = { checked: false, notes: "" };
    }
  }
  return checklist;
}

function makeEmptyPostVisitActions(): Record<string, boolean> {
  return Object.fromEntries(POST_VISIT_ACTION_ITEMS.map(item => [item.id, false]));
}

export const DEFAULT_SITE_VISIT_DATA: SiteVisitData = {
  institution_name: "", site_address: "", visit_date: "", assessed_by: "",
  contact_name: "", contact_title: "", contact_phone: "", contact_email: "",
  weather_conditions: "", followup_needed: "", followup_reason: "",

  total_spaces: "", ada_spaces: "", lot_type: "", pavement_condition: "",
  pavement_notes: "", lot_width: "", lot_depth: "", lighting: "",
  lighting_notes: "", perimeter: "",

  ingress_egress_count: "", main_street: "", signalized_intersection: "",
  peak_hours: "", lot_open_hours: "", restricted_hours_detail: "",
  gating: "", shared_use: "", shared_use_detail: "",

  ev_candidate_areas: "", ev_stalls_possible: "", distance_to_building: "",
  solar_canopy_potential: "", ada_proximity_viable: "",
  drainage_concerns: "", drainage_notes: "",

  utility_provider: "", other_utility_name: "", service_entrance_location: "",
  meter_visible: "", meter_number: "", meter_type: "", service_voltage: "",
  service_size_amps: "", secondary_meters: "", secondary_meter_notes: "",
  sdge_pyd_equipment: "",

  main_panel_location: "", main_breaker_size: "", open_breaker_slots: "",
  available_capacity: "", panel_age: "", panel_condition: "",
  panel_access_restrictions: "", sub_panels_near_lot: "", sub_panel_notes: "",

  transformer_location: "", transformer_owner: "", transformer_size_kva: "",
  transformer_distance: "", transformer_condition: "",
  transformer_condition_notes: "",

  conduit_visible: "", conduit_description: "", trench_obstacles: "",
  conduit_run_distance: "", hardscape_type: "", underground_utility_concerns: "",
  utility_conflict_notes: "",

  photo_checklist: makeEmptyPhotoChecklist(),

  security_contact_name: "", security_contact_phone: "",
  surveillance_cameras: "", after_hours_access: "", seasonal_closures: "",

  facilities_dm_name: "", facilities_dm_title: "", who_approves_infra: "",
  board_meeting_frequency: "", contractor_experience: "",
  contractor_experience_notes: "", property_ownership: "", lease_notes: "",
  active_construction: "", construction_notes: "",

  institution_ev_awareness: "", prior_ev_discussions: "",
  prior_discussion_notes: "", ownership_preference: "",
  sdge_pyd_awareness: "", urgency_timeline: "", timeline_notes: "",
  financing_availability: "",

  documents_requested: "", info_not_obtained: "",
  followup_visit_required: "", followup_date: "",
  referrals: "", red_flags: "", site_rating: "", rating_rationale: "",
  post_visit_actions: makeEmptyPostVisitActions(),
};
