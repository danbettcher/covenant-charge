# COVENANT CHARGE — Property Intake Questionnaire v2.0
## Source of Truth — Long-Form Site Assessment

### Purpose
Defines every question, field type, conditional logic rule, and database mapping for the Covenant Charge long-form site assessment. This is the authoritative reference for the webform implementation. Update this document FIRST anytime questions are added, removed, or changed.

### Design Principles
- Accessible to non-technical respondents (pastors, board chairs, administrators)
- Utility bill upload replaces technical electrical questions where possible
- Mission and values captured alongside operational detail
- Three service branches: EV charging, Solar, Battery storage (multi-select supported)
- Conditional logic hides irrelevant questions per service mix
- Save-and-continue enabled (auto-save every 30 seconds via Supabase)
- Target completion time: 20-30 minutes for single service, up to 45 minutes for all three

### Respondent Types
- LEADERSHIP: pastor, head of school, executive director, board chair (mission, governance, vision)
- FACILITIES: facilities manager, business administrator, property committee chair (physical property, electrical, maintenance)
- SHARED: smaller institutions where one person fills both roles

---

## SECTION 0 — Service Selection (NEW — drives all branching)

0.1 Which Covenant Charge services are you interested in exploring? (Multi-select, REQUIRED)
- EV charging
- Solar
- Battery storage
- Not sure yet — open to learning more

0.2 If you are exploring multiple services, do you have a primary priority? (Single select, optional)
- EV charging is primary
- Solar is primary
- Battery storage is primary
- All are equally important
- We are still discerning

---

## SECTION 1 — Contact & Institution Information (UNIVERSAL)

1.1 Primary contact name (Short text, REQUIRED, SHARED)
1.2 Title or role at this institution (Short text, optional, SHARED)
1.3 Email address (Email, REQUIRED, SHARED)
1.4 Phone number (Phone, REQUIRED, SHARED)
1.5 Best time to reach you (Dropdown: Morning/Afternoon/Evening/Anytime, optional, SHARED)
1.6 Institution name (Short text, REQUIRED, SHARED)
1.7 Institution type (Single select, REQUIRED, SHARED): Church/Christian school/Seminary/Nonprofit ministry/Faith-based community center/Multi-site campus/Other
1.8 Describe institution type [Show if 1.7 = Other] (Short text, optional, SHARED)
1.9 Denomination or network affiliation (Short text, optional, SHARED)
1.10 Estimated weekly attendance or enrollment (Number, optional, LEADERSHIP)
1.11 Does your institution have a separate facilities point of contact? (Yes/No, optional, LEADERSHIP)
1.12 Facilities contact name and email [Show if 1.11 = Yes] (Short text x2, optional, LEADERSHIP)

---

## SECTION 2 — Property & Ownership (UNIVERSAL)

2.1 Property street address (Short text, REQUIRED, SHARED)
2.2 City, State, ZIP (Short text, REQUIRED, SHARED)
2.3 Property ownership status (Single select, REQUIRED, LEADERSHIP): Owned outright/Owned with mortgage/Leased from third party/Shared-use agreement/Other
2.4 Describe ownership or lease arrangement [Show if 2.3 != owned] (Long text, optional, LEADERSHIP)
2.5 Multiple parcels, buildings, or campuses? (Yes/No, optional, FACILITIES)
2.6 Describe campus layout [Show if 2.5 = Yes] (Long text, optional, FACILITIES)
2.7 Approximate total acreage (Number, optional, FACILITIES)
2.8 Plans to sell, lease, redevelop, or relocate in next 10 years? (Single select, optional, LEADERSHIP): No/Possibly/Yes/Unsure

---

## SECTION 3 — Parking Inventory & Usage (CONDITIONAL: Show if EV charging selected)

3.1 Estimated total paved parking spaces (Number, optional, FACILITIES)
3.2 Lot ownership (Single select, optional, FACILITIES): Owned exclusively/Shared/Public lot/Other
3.3 Primary days/times in use (Multi-select, optional, SHARED): Sunday mornings/Sunday evenings/Weekday daytime/Weekday evenings/Saturday events/Varies seasonally
3.4 Peak day occupancy percentage (Single select, optional, FACILITIES): <25%/25-50%/50-75%/75-100%/Unsure
3.5 Periods when lot is mostly empty? (Yes/No + short text, optional, SHARED)
3.6 Public access to lot? (Single select, optional, LEADERSHIP): Always open/Specific hours/Restricted/Gated
3.7 Lot lit at night? (Yes/Partially/No, optional, FACILITIES)
3.8 Visible from major street? (Yes/Partially/No, optional, SHARED)
3.9 Surface condition (Single select, optional, FACILITIES): Excellent/Good/Fair/Poor
3.10 Lot features (Multi-select, optional, FACILITIES): ADA spaces/Crosswalks/Speed bumps/Shade structures/Landscaping/Other
3.11 Other lot features [Show if 3.10 = Other] (Short text, optional, FACILITIES)

---

## SECTION 4 — Electrical Infrastructure (UNIVERSAL — applies to all three services)

4.1 Electric utility provider (Short text, optional, FACILITIES)
4.2 Know your current rate schedule? (Single select, optional, FACILITIES): Yes/No/Other
4.3 Rate schedule name [Show if 4.2 = Yes] (Short text, optional, FACILITIES)
4.4 Upload a recent utility bill (last 1-3 months) (File upload PDF/JPG/PNG, optional, FACILITIES)
4.5 Know location of main electrical service entrance? (Yes/No/Unsure, optional, FACILITIES)
4.6 Electrical service upgrades or issues in last 10 years? (Single select, optional, FACILITIES): No/Yes upgrades/Yes issues/Unsure
4.7 Describe upgrades or issues [Show if 4.6 = Yes] (Long text, optional, FACILITIES)
4.8 Existing solar panels or on-site generation? (Yes/No/In planning, optional, FACILITIES)
4.9 Existing EV chargers on property? (Single select, optional, FACILITIES): No/Level 1/Level 2/DC Fast/Unsure
4.10 Who installed/operates existing chargers? [Show if 4.9 != No] (Short text, optional, FACILITIES)

---

## SECTION 5 — Solar-Specific Assessment (CONDITIONAL: Show if Solar selected)

5.1 Primary solar use case (Single select, optional, LEADERSHIP): Reduce our utility bill/Generate revenue through net metering/Power critical operations/Community solar program/Still exploring
5.2 Roof type and approximate age (Multi-select for type, Number for age, optional, FACILITIES): Asphalt shingle/Metal/Tile/Flat membrane/TPO/Other + Age in years
5.3 Roof condition (Single select, optional, FACILITIES): Excellent/Good/Fair/Needs replacement within 5 years
5.4 Roof orientation — primary pitch direction (Multi-select, optional, FACILITIES): South/Southwest/Southeast/East/West/North/Multiple/Unsure
5.5 Significant shading sources (Multi-select, optional, FACILITIES): Trees/Adjacent buildings/Mountains/None/Unsure
5.6 Available ground-mount space if roof not viable? (Yes/No/Unsure + estimated sq ft, optional, FACILITIES)
5.7 Who handles roof maintenance? (Single select, optional, LEADERSHIP): We own and maintain/Landlord/Outside contractor/Unsure
5.8 Any existing roof warranties that could affect solar installation? (Yes/No/Unsure, optional, LEADERSHIP)
5.9 Approximate annual electric bill (Single select, optional, FACILITIES): Under $5K/$5-15K/$15-50K/$50-100K/Over $100K/Unsure

---

## SECTION 6 — Battery Storage-Specific Assessment (CONDITIONAL: Show if Battery selected)

6.1 Primary battery use case (Multi-select, optional, LEADERSHIP): Backup power for outages/Peak shaving to reduce utility costs/Resilience for ministry continuity/Pair with solar/Pair with EV charging/Still exploring
6.2 Outage history — how often does the property lose power? (Single select, optional, FACILITIES): Rarely/A few times per year/Frequently/Almost never/Unsure
6.3 Critical loads to protect during outage (Multi-select, optional, LEADERSHIP): Sanctuary/worship space/Refrigeration/HVAC/Office and admin/Childcare/youth spaces/Kitchen/All facility operations/Other
6.4 Describe other critical loads [Show if 6.3 = Other] (Short text, optional, LEADERSHIP)
6.5 Existing backup generator? (Single select, optional, FACILITIES): No/Yes diesel/Yes natural gas/Yes propane/Yes other
6.6 Preferred battery installation location (Single select, optional, FACILITIES): Indoor utility room/Outdoor enclosure/Garage or storage building/Unsure — open to recommendation
6.7 Available installation space dimensions (rough estimate okay) (Short text, optional, FACILITIES)

---

## SECTION 7 — Zoning, Permitting & Site Constraints (UNIVERSAL)

7.1 Property in historic district or subject to architectural review? (Yes/No/Unsure, optional, LEADERSHIP)
7.2 HOA, CC&R, or deed restrictions affecting exterior improvements? (Yes/No/Unsure, optional, LEADERSHIP)
7.3 Zoning restrictions affecting public commercial use of parking lot? (Yes/No/Unsure, optional, LEADERSHIP)
7.4 Describe restriction [Show if 7.3 = Yes] (Long text, optional, LEADERSHIP)
7.5 Ever applied for conditional or special use permit for parking area? (Yes/No, optional, LEADERSHIP)
7.6 Describe permit and outcome [Show if 7.5 = Yes] (Short text, optional, LEADERSHIP)
7.7 Active environmental concerns or remediation? (Yes/No/Unsure, optional, LEADERSHIP)

---

## SECTION 8 — Access & Site Operations (CONDITIONAL: Show if EV charging selected)

8.1 Open to public 24/7 charging access? (Single select, optional, LEADERSHIP): Yes fully open/Possibly discuss hours/Prefer restricted/Unsure
8.2 How is parking lot access controlled? (Multi-select, optional, FACILITIES): Open no barriers/Manual gate/Automated gate/Posted hours/Security guard/Other
8.3 Describe other access control [Show if 8.2 = Other] (Short text, optional, FACILITIES)
8.4 On-site staff or security regularly present? (Single select, optional, FACILITIES): Yes all hours/Yes some hours/Occasionally/No
8.5 Events that change parking availability? (Yes/No + short text, optional, SHARED)
8.6 Dedicated facilities staff for installation process? (Yes/No, optional, LEADERSHIP)

---

## SECTION 9 — Financial Context & Incentive Awareness (UNIVERSAL)

9.1 Leadership openness to hosting infrastructure on property (Single select, optional, LEADERSHIP): Yes all options/Yes only zero capital/Possibly depends/Early evaluation/Unsure
9.2 Ever applied for or received grant funding for facility improvements? (Yes/No/Unsure, optional, LEADERSHIP)
9.3 Familiarity with relevant programs (Multi-select, optional, LEADERSHIP): SDG&E Power Your Drive/NEVI/IRS Section 30C/Federal nonprofit grants/Solar Investment Tax Credit/None/Other
9.4 What would you most hope to do with revenue from this program? (Long text, optional, LEADERSHIP)

---

## SECTION 10 — Governance & Decision-Making (UNIVERSAL)

10.1 Final authority over major property decisions (Single select, optional, LEADERSHIP): Senior pastor alone/Elder or deacon board/Board of directors/School principal with board/Executive director with board/Committee-based/Other
10.2 Formal board vote required for long-term agreement? (Yes/No/Unsure, optional, LEADERSHIP)
10.3 How often does board or committee meet? (Single select, optional, LEADERSHIP): Weekly/Monthly/Quarterly/Twice yearly/Annually/As needed
10.4 If supportive, time estimate to formal decision (Single select, optional, LEADERSHIP): <30 days/30-60/60-90/>90/Unsure
10.5 By submitting I confirm I have authority or am acting with leadership awareness (Checkbox, REQUIRED, SHARED)

---

## SECTION 11 — Mission Alignment & Vision (UNIVERSAL — heart of the form)

11.1 In one or two sentences, your institution's primary mission (Long text, optional, LEADERSHIP)
11.2 Programs or community efforts to expand or sustain in next 3-5 years (Long text, optional, LEADERSHIP)
11.3 If property generated consistent revenue over next decade, what would funding most support? (Long text, optional, LEADERSHIP)
11.4 Anything about your values or community commitments CC should know? (Long text, optional, LEADERSHIP)
11.5 How did you first hear about Covenant Charge? (Single select + optional text, optional, SHARED): Referred/Online search/Social media/Industry event/CC outreach/Other

---

## SECTION 12 — Anything Else (UNIVERSAL)

12.1 Anything else helpful for CC to know? (Long text, optional, SHARED)
12.2 Questions for Covenant Charge? (Long text, optional, SHARED)

---

## REQUIRED FIELDS

0.1, 1.1, 1.3, 1.4, 1.6, 1.7, 2.1, 2.2, 2.3, 10.5

---

## DATABASE SCHEMA NOTES

Single Supabase table: `site_assessments`
- All field IDs above become column names (sec_X_Y format, e.g. sec_0_1, sec_1_1)
- Multi-select fields stored as JSONB arrays
- File uploads stored in Supabase Storage bucket `site-assessment-uploads/{submission_id}/`
- File metadata (filename, URL, uploaded_at) stored as JSONB on the row
- Auto-save: every 30 seconds, upsert by submission_id (UUID generated client-side)
- Submission status field: 'in_progress' | 'submitted'

---

## EMAIL NOTIFICATIONS (Resend)

On final submission, send email to dan@covenantcharge.com with:
- Subject: "New Site Assessment — [Institution Name]"
- Body: Submission summary including services selected, contact info, institution name, address, ownership status, and link to full record in Supabase admin
- CC: clint@covenantcharge.com (placeholder — confirm Clint's email before deploy)
- Reply-to: contact email from form (1.3)

---

## SUBMISSION FLOW

1. User lands on /assessment page
2. Section 0 service selection captured first — drives conditional rendering of all subsequent sections
3. Auto-save every 30 seconds with submission_id stored in localStorage
4. Save-and-continue: user can close browser and return via emailed resume link
5. On final submit: validate required fields, set status to 'submitted', trigger Resend email
6. Confirmation page with submission ID and "what happens next" content
