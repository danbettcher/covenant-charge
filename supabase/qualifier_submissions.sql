-- Run this in the Supabase SQL editor to create the qualifier_submissions table.

create table qualifier_submissions (
  id                      uuid        primary key default gen_random_uuid(),
  submitted_at            timestamptz not null    default now(),

  -- Contact
  contact_name            text        not null,
  contact_title           text,
  contact_email           text        not null,
  contact_phone           text        not null,
  best_time_to_reach      text,

  -- Organization
  organization_name       text        not null,
  organization_type       text        not null,
  organization_type_other text,

  -- Services
  services_interested     text[]      not null,

  -- Property
  property_address        text        not null,
  property_city_state_zip text        not null,
  property_ownership      text        not null,

  -- Decision-making
  decision_authority      text        not null,
  timeline                text        not null,
  known_blockers          text,

  -- Source and consent
  how_heard_about_cc      text        not null,
  consent_given           boolean     not null default false
);

-- Optional: enable Row Level Security (recommended for production)
-- alter table qualifier_submissions enable row level security;
