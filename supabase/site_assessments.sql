-- ============================================================
-- site_assessments table
-- Run in Supabase SQL Editor
-- ============================================================

create table site_assessments (
  id             uuid        primary key default gen_random_uuid(),
  submission_id  uuid        not null unique,
  status         text        not null default 'in_progress',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  submitted_at   timestamptz,

  -- Section 0: Service Selection
  sec_0_1  jsonb,   -- string[] services
  sec_0_2  text,

  -- Section 1: Contact & Institution
  sec_1_1  text,    -- contact name (REQUIRED)
  sec_1_2  text,    -- title/role
  sec_1_3  text,    -- email (REQUIRED)
  sec_1_4  text,    -- phone (REQUIRED)
  sec_1_5  text,    -- best time to reach
  sec_1_6  text,    -- institution name (REQUIRED)
  sec_1_7  text,    -- institution type (REQUIRED)
  sec_1_8  text,    -- other institution type
  sec_1_9  text,    -- denomination/affiliation
  sec_1_10 text,    -- weekly attendance
  sec_1_11 text,    -- separate facilities contact yes/no
  sec_1_12 jsonb,   -- {name, email}

  -- Section 2: Property & Ownership
  sec_2_1  text,    -- street address (REQUIRED)
  sec_2_2  text,    -- city/state/zip (REQUIRED)
  sec_2_3  text,    -- ownership status (REQUIRED)
  sec_2_4  text,    -- ownership description
  sec_2_5  text,    -- multiple parcels yes/no
  sec_2_6  text,    -- campus layout
  sec_2_7  text,    -- acreage
  sec_2_8  text,    -- relocation plans

  -- Section 3: Parking (conditional: EV)
  sec_3_1  text,    -- total parking spaces
  sec_3_2  text,    -- lot ownership
  sec_3_3  jsonb,   -- string[] days/times in use
  sec_3_4  text,    -- peak occupancy
  sec_3_5  jsonb,   -- {value, text} empty periods
  sec_3_6  text,    -- public access
  sec_3_7  text,    -- lit at night
  sec_3_8  text,    -- visible from street
  sec_3_9  text,    -- surface condition
  sec_3_10 jsonb,   -- string[] lot features
  sec_3_11 text,    -- other lot features

  -- Section 4: Electrical Infrastructure
  sec_4_1  text,    -- utility provider
  sec_4_2  text,    -- know rate schedule
  sec_4_3  text,    -- rate schedule name
  sec_4_4  jsonb,   -- {path, filename, uploadedAt} utility bill
  sec_4_5  text,    -- service entrance location
  sec_4_6  text,    -- upgrades/issues
  sec_4_7  text,    -- upgrade/issue description
  sec_4_8  text,    -- existing solar
  sec_4_9  text,    -- existing EV chargers
  sec_4_10 text,    -- charger installer/operator

  -- Section 5: Solar (conditional: Solar)
  sec_5_1  text,    -- primary solar use case
  sec_5_2  jsonb,   -- {types: string[], age: string}
  sec_5_3  text,    -- roof condition
  sec_5_4  jsonb,   -- string[] roof orientation
  sec_5_5  jsonb,   -- string[] shading sources
  sec_5_6  jsonb,   -- {value, sqft} ground mount
  sec_5_7  text,    -- roof maintenance
  sec_5_8  text,    -- roof warranty
  sec_5_9  text,    -- annual electric bill

  -- Section 6: Battery Storage (conditional: Battery)
  sec_6_1  jsonb,   -- string[] battery use cases
  sec_6_2  text,    -- outage history
  sec_6_3  jsonb,   -- string[] critical loads
  sec_6_4  text,    -- other critical loads
  sec_6_5  text,    -- existing generator
  sec_6_6  text,    -- preferred install location
  sec_6_7  text,    -- available space dimensions

  -- Section 7: Zoning & Permitting
  sec_7_1  text,    -- historic district
  sec_7_2  text,    -- HOA/deed restrictions
  sec_7_3  text,    -- zoning restrictions
  sec_7_4  text,    -- zoning description
  sec_7_5  text,    -- prior permit application
  sec_7_6  text,    -- permit outcome
  sec_7_7  text,    -- environmental concerns

  -- Section 8: Access & Operations (conditional: EV)
  sec_8_1  text,    -- 24/7 access openness
  sec_8_2  jsonb,   -- string[] access control methods
  sec_8_3  text,    -- other access control
  sec_8_4  text,    -- staff/security present
  sec_8_5  jsonb,   -- {value, text} events affecting parking
  sec_8_6  text,    -- dedicated facilities staff

  -- Section 9: Financial Context
  sec_9_1  text,    -- leadership openness
  sec_9_2  text,    -- prior grant funding
  sec_9_3  jsonb,   -- string[] program familiarity
  sec_9_4  text,    -- revenue use vision

  -- Section 10: Governance
  sec_10_1 text,    -- decision authority
  sec_10_2 text,    -- board vote required
  sec_10_3 text,    -- board meeting frequency
  sec_10_4 text,    -- time to decision
  sec_10_5 boolean not null default false, -- consent (REQUIRED)

  -- Section 11: Mission Alignment
  sec_11_1 text,    -- primary mission
  sec_11_2 text,    -- programs to expand
  sec_11_3 text,    -- revenue use vision
  sec_11_4 text,    -- values/community commitments
  sec_11_5 text,    -- how heard about CC

  -- Section 12: Anything Else
  sec_12_1 text,    -- anything else
  sec_12_2 text     -- questions for CC
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_assessments_updated_at
  before update on site_assessments
  for each row execute function update_updated_at();

-- ============================================================
-- Storage bucket setup (run in Supabase Dashboard > Storage)
-- ============================================================
-- 1. Create bucket named: site-assessment-uploads
-- 2. Set to PRIVATE (public read: OFF)
-- 3. Allowed MIME types: application/pdf, image/jpeg, image/png
-- 4. Max file size: 10MB
-- All file access goes through signed URLs generated server-side.
