-- ============================================================
-- site_visit_assessments table
-- Internal field assessment form — Covenant Charge staff use only
-- Run in Supabase SQL Editor
-- ============================================================

create table site_visit_assessments (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  visit_id    text,        -- e.g. SV-20260428-7F2A — generated client-side, shown in header
  submitted_by text,

  -- Section 0: Visit Information
  institution_name text,
  site_address     text,
  visit_date       date,
  assessed_by      text,
  contact_name     text,
  contact_title    text,
  contact_phone    text,
  contact_email    text,
  weather_conditions text,
  followup_needed    boolean,
  followup_reason    text,

  -- Section 1A: Lot Configuration
  total_spaces       text,
  ada_spaces         text,
  lot_type           text,
  pavement_condition text,
  pavement_notes     text,
  lot_width          text,
  lot_depth          text,
  lighting           text,
  lighting_notes     text,
  perimeter          text,

  -- Section 1B: Traffic & Access
  ingress_egress_count    text,
  main_street             text,
  signalized_intersection text,
  peak_hours              text,
  lot_open_hours          text,
  restricted_hours_detail text,
  gating                  text,
  shared_use              text,
  shared_use_detail       text,

  -- Section 1C: EV Stall Siting
  ev_candidate_areas    text,
  ev_stalls_possible    text,
  distance_to_building  text,
  solar_canopy_potential text,
  ada_proximity_viable  text,
  drainage_concerns     text,
  drainage_notes        text,

  -- Section 2A: Utility Service
  utility_provider          text,
  other_utility_name        text,
  service_entrance_location text,
  meter_visible             text,
  meter_number              text,
  meter_type                text,
  service_voltage           text,
  service_size_amps         text,
  secondary_meters          text,
  secondary_meter_notes     text,
  sdge_pyd_equipment        text,

  -- Section 2B: Main Panel / Switchgear
  main_panel_location      text,
  main_breaker_size        text,
  open_breaker_slots       text,
  available_capacity       text,
  panel_age                text,
  panel_condition          text,
  panel_access_restrictions text,
  sub_panels_near_lot      text,
  sub_panel_notes          text,

  -- Section 2C: Transformer
  transformer_location        text,
  transformer_owner           text,
  transformer_size_kva        text,
  transformer_distance        text,
  transformer_condition       text,
  transformer_condition_notes text,

  -- Section 2D: Conduit & Infrastructure
  conduit_visible              text,
  conduit_description          text,
  trench_obstacles             text,
  conduit_run_distance         text,
  hardscape_type               text,
  underground_utility_concerns text,
  utility_conflict_notes       text,

  -- Section 3: Photo Checklist
  -- { [photoId]: { checked: boolean, notes: string, upload?: { path, filename, uploadedAt } } }
  photo_checklist jsonb,

  -- Section 4A: Access Logistics
  security_contact_name  text,
  security_contact_phone text,
  surveillance_cameras   text,
  after_hours_access     text,
  seasonal_closures      text,

  -- Section 4B: Decision-Making & Governance
  facilities_dm_name          text,
  facilities_dm_title         text,
  who_approves_infra          text,
  board_meeting_frequency     text,
  contractor_experience       text,
  contractor_experience_notes text,
  property_ownership          text,
  lease_notes                 text,
  active_construction         text,
  construction_notes          text,

  -- Section 4C: Financial & Program Readiness
  institution_ev_awareness text,
  prior_ev_discussions     text,
  prior_discussion_notes   text,
  ownership_preference     text,
  sdge_pyd_awareness       text,
  urgency_timeline         text,
  timeline_notes           text,
  financing_availability   text,

  -- Section 5: Open Items & Summary
  documents_requested     text,
  info_not_obtained       text,
  followup_visit_required boolean,
  followup_date           date,
  referrals               text,
  red_flags               text,
  site_rating             text,   -- Strong / Moderate / Weak
  rating_rationale        text,

  -- { [actionId]: boolean }
  post_visit_actions jsonb,

  -- Full payload backup
  raw_form_data jsonb
);

-- ============================================================
-- Migration: add visit_id column (run once if table already exists)
-- ============================================================
alter table site_visit_assessments
  add column if not exists visit_id text;

-- Optional: index on institution name for faster lookup
create index site_visit_assessments_institution_idx
  on site_visit_assessments (institution_name);

-- Optional: index on visit date for reporting
create index site_visit_assessments_visit_date_idx
  on site_visit_assessments (visit_date desc);
