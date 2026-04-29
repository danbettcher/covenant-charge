import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { SiteVisitData } from "@/app/site-visit/types";

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const { data, submitted_by, visit_id } = body as {
    data: SiteVisitData;
    submitted_by: string;
    visit_id?: string;
  };

  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("site_visit_assessments").insert({
    visit_id:       visit_id || null,
    submitted_by:   submitted_by || data.assessed_by || null,
    institution_name: data.institution_name || null,
    site_address:   data.site_address || null,
    visit_date:     data.visit_date || null,
    assessed_by:    data.assessed_by || null,
    contact_name:   data.contact_name || null,
    contact_title:  data.contact_title || null,
    contact_phone:  data.contact_phone || null,
    contact_email:  data.contact_email || null,
    weather_conditions: data.weather_conditions || null,
    followup_needed:    data.followup_needed === "Yes",
    followup_reason:    data.followup_reason || null,

    // Section 1A
    total_spaces:       data.total_spaces || null,
    ada_spaces:         data.ada_spaces || null,
    lot_type:           data.lot_type || null,
    pavement_condition: data.pavement_condition || null,
    pavement_notes:     data.pavement_notes || null,
    lot_width:          data.lot_width || null,
    lot_depth:          data.lot_depth || null,
    lighting:           data.lighting || null,
    lighting_notes:     data.lighting_notes || null,
    perimeter:          data.perimeter || null,

    // Section 1B
    ingress_egress_count:    data.ingress_egress_count || null,
    main_street:             data.main_street || null,
    signalized_intersection: data.signalized_intersection || null,
    peak_hours:              data.peak_hours || null,
    lot_open_hours:          data.lot_open_hours || null,
    restricted_hours_detail: data.restricted_hours_detail || null,
    gating:                  data.gating || null,
    shared_use:              data.shared_use || null,
    shared_use_detail:       data.shared_use_detail || null,

    // Section 1C
    ev_candidate_areas:    data.ev_candidate_areas || null,
    ev_stalls_possible:    data.ev_stalls_possible || null,
    distance_to_building:  data.distance_to_building || null,
    solar_canopy_potential: data.solar_canopy_potential || null,
    ada_proximity_viable:  data.ada_proximity_viable || null,
    drainage_concerns:     data.drainage_concerns || null,
    drainage_notes:        data.drainage_notes || null,

    // Section 2A
    utility_provider:          data.utility_provider || null,
    other_utility_name:        data.other_utility_name || null,
    service_entrance_location: data.service_entrance_location || null,
    meter_visible:             data.meter_visible || null,
    meter_number:              data.meter_number || null,
    meter_type:                data.meter_type || null,
    service_voltage:           data.service_voltage || null,
    service_size_amps:         data.service_size_amps || null,
    secondary_meters:          data.secondary_meters || null,
    secondary_meter_notes:     data.secondary_meter_notes || null,
    sdge_pyd_equipment:        data.sdge_pyd_equipment || null,

    // Section 2B
    main_panel_location:     data.main_panel_location || null,
    main_breaker_size:       data.main_breaker_size || null,
    open_breaker_slots:      data.open_breaker_slots || null,
    available_capacity:      data.available_capacity || null,
    panel_age:               data.panel_age || null,
    panel_condition:         data.panel_condition || null,
    panel_access_restrictions: data.panel_access_restrictions || null,
    sub_panels_near_lot:     data.sub_panels_near_lot || null,
    sub_panel_notes:         data.sub_panel_notes || null,

    // Section 2C
    transformer_location:        data.transformer_location || null,
    transformer_owner:           data.transformer_owner || null,
    transformer_size_kva:        data.transformer_size_kva || null,
    transformer_distance:        data.transformer_distance || null,
    transformer_condition:       data.transformer_condition || null,
    transformer_condition_notes: data.transformer_condition_notes || null,

    // Section 2D
    conduit_visible:              data.conduit_visible || null,
    conduit_description:          data.conduit_description || null,
    trench_obstacles:             data.trench_obstacles || null,
    conduit_run_distance:         data.conduit_run_distance || null,
    hardscape_type:               data.hardscape_type || null,
    underground_utility_concerns: data.underground_utility_concerns || null,
    utility_conflict_notes:       data.utility_conflict_notes || null,

    // Section 3
    photo_checklist: data.photo_checklist,

    // Section 4A
    security_contact_name:  data.security_contact_name || null,
    security_contact_phone: data.security_contact_phone || null,
    surveillance_cameras:   data.surveillance_cameras || null,
    after_hours_access:     data.after_hours_access || null,
    seasonal_closures:      data.seasonal_closures || null,

    // Section 4B
    facilities_dm_name:          data.facilities_dm_name || null,
    facilities_dm_title:         data.facilities_dm_title || null,
    who_approves_infra:          data.who_approves_infra || null,
    board_meeting_frequency:     data.board_meeting_frequency || null,
    contractor_experience:       data.contractor_experience || null,
    contractor_experience_notes: data.contractor_experience_notes || null,
    property_ownership:          data.property_ownership || null,
    lease_notes:                 data.lease_notes || null,
    active_construction:         data.active_construction || null,
    construction_notes:          data.construction_notes || null,

    // Section 4C
    institution_ev_awareness: data.institution_ev_awareness || null,
    prior_ev_discussions:     data.prior_ev_discussions || null,
    prior_discussion_notes:   data.prior_discussion_notes || null,
    ownership_preference:     data.ownership_preference || null,
    sdge_pyd_awareness:       data.sdge_pyd_awareness || null,
    urgency_timeline:         data.urgency_timeline || null,
    timeline_notes:           data.timeline_notes || null,
    financing_availability:   data.financing_availability || null,

    // Section 5
    documents_requested:    data.documents_requested || null,
    info_not_obtained:      data.info_not_obtained || null,
    followup_visit_required: data.followup_visit_required === "Yes",
    followup_date:          data.followup_date || null,
    referrals:              data.referrals || null,
    red_flags:              data.red_flags || null,
    site_rating:            data.site_rating || null,
    rating_rationale:       data.rating_rationale || null,
    post_visit_actions:     data.post_visit_actions,
    raw_form_data:          data,
  });

  if (error) {
    console.error("Site visit submit error:", JSON.stringify(error));
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
