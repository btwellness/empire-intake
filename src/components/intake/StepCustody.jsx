import FormCard from "./FormCard";
import FormField from "./FormField";
import { AlertTriangle } from "lucide-react";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const CUSTODY_CONCERNS = [
  "Drug Use", "Alcohol Abuse", "Neglect", "Abuse", "Domestic Violence",
  "Unsafe Living Conditions", "Dangerous Associates", "Criminal Activity",
  "Medical Neglect", "Educational Neglect", "Child Left Alone",
];

const COURT_VIOLATIONS = [
  "Denied Visitation", "Failure to Return Child", "Relocation Issues",
  "Unauthorized Travel", "Harassment", "Interference with Communication",
];

export default function StepCustody({ data, onChange }) {
  const handleMultiCheck = (field, value, checked) => {
    const current = data[field] || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v) => v !== value);
    onChange({ target: { name: field, value: updated } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Child Custody & Welfare
        </h2>
        <p className="text-muted-foreground">
          Answer what you know. If unsure, leave it blank or write "unknown." Our team can gather additional details later.
        </p>
      </div>

      {/* IMMEDIATE DANGER ALERT */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg border border-destructive/30 bg-destructive/10">
        <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground">
          <span className="font-semibold text-destructive">If there is immediate danger</span> — contact 911 or local law enforcement before continuing this form.
        </p>
      </div>

      {/* SECTION 1: Child Information */}
      <FormCard title="Child's Information" description="Details about the child(ren) involved in this case.">
        <div className="space-y-5">
          <FormField
            label="Child's Full Name(s)"
            name="custody_child_names"
            value={data.custody_child_names}
            onChange={onChange}
            placeholder="List all children's full names"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Date(s) of Birth"
              name="custody_child_dobs"
              value={data.custody_child_dobs}
              onChange={onChange}
              placeholder="e.g., 01/15/2022"
            />
            <FormField
              label="Age(s)"
              name="custody_child_ages"
              value={data.custody_child_ages}
              onChange={onChange}
              placeholder="e.g., 2"
            />
          </div>
          <FormField
            label="Where was the child living before going with the other parent?"
            name="custody_child_prior_residence"
            type="textarea"
            value={data.custody_child_prior_residence}
            onChange={onChange}
            placeholder="Address or description of where the child was living"
            rows={2}
          />
          <FormField
            label="Do you believe the child is in immediate danger right now?"
            name="custody_immediate_danger"
            type="radio"
            value={data.custody_immediate_danger}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_immediate_danger === "yes" && (
            <FormField
              label="Why do you believe the child is in immediate danger?"
              name="custody_immediate_danger_details"
              type="textarea"
              value={data.custody_immediate_danger_details}
              onChange={onChange}
              placeholder="Describe the situation..."
              rows={3}
            />
          )}
          <FormField
            label="School(s) Attended"
            name="custody_schools"
            value={data.custody_schools}
            onChange={onChange}
            placeholder="School names and locations"
          />
          <FormField
            label="Daycare Providers (if applicable)"
            name="custody_daycare"
            value={data.custody_daycare}
            onChange={onChange}
            placeholder="Daycare or after-school provider name and address"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Sports / Activities"
              name="custody_activities"
              value={data.custody_activities}
              onChange={onChange}
              placeholder="Sports teams, clubs, organizations"
            />
            <FormField
              label="Medical Conditions / Special Needs"
              name="custody_medical"
              value={data.custody_medical}
              onChange={onChange}
              placeholder="Any relevant medical or special needs"
            />
          </div>
        </div>
      </FormCard>

      {/* SECTION 2: Where the Child May Be */}
      <FormCard title="Where the Child May Be" description="Help us locate the child as quickly as possible.">
        <div className="space-y-5">
          <FormField
            label="When did you last see or speak with the child?"
            name="custody_last_contact"
            value={data.custody_last_contact}
            onChange={onChange}
            placeholder="Date and how (in person, phone, video call...)"
          />
          <FormField
            label="Where do you believe the child is right now?"
            name="custody_child_current_location"
            type="textarea"
            value={data.custody_child_current_location}
            onChange={onChange}
            placeholder="Address, city, state, or general area if known"
            rows={2}
          />
          <FormField
            label="Who do you believe the child is with right now?"
            name="custody_child_with_whom"
            value={data.custody_child_with_whom}
            onChange={onChange}
            placeholder="Name(s) and relationship to child"
          />
          <FormField
            label="Has anyone confirmed seeing the child recently? If yes, who and when?"
            name="custody_child_sighting"
            value={data.custody_child_sighting}
            onChange={onChange}
            placeholder="Name of person, when and where they saw the child"
          />
          <FormField
            label="Has the other parent said where the child is?"
            name="custody_subject_stated_location"
            type="radio"
            value={data.custody_subject_stated_location}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_subject_stated_location === "yes" && (
            <FormField
              label="What did they say?"
              name="custody_subject_stated_location_details"
              type="textarea"
              value={data.custody_subject_stated_location_details}
              onChange={onChange}
              placeholder="What exactly did they say about where the child is..."
              rows={2}
            />
          )}
          <FormField
            label="What addresses, relatives, friends, or places might they take the child?"
            name="custody_possible_locations"
            type="textarea"
            value={data.custody_possible_locations}
            onChange={onChange}
            placeholder="List any known relatives, friends, or locations the child might be taken to..."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 3: Person Being Investigated */}
      <FormCard
        title="Person Being Investigated"
        description="Tell us about the individual whose conduct is in question — this is who our investigators will be focused on."
      >
        <div className="space-y-5">
          <FormField
            label="Full Legal Name"
            name="custody_subject_name"
            value={data.custody_subject_name}
            onChange={onChange}
            placeholder="Full legal name"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Date of Birth (if known)"
              name="custody_subject_dob"
              value={data.custody_subject_dob}
              onChange={onChange}
              placeholder="MM/DD/YYYY"
            />
            <FormField
              label="Phone Number"
              name="custody_subject_phone"
              value={data.custody_subject_phone}
              onChange={onChange}
              placeholder="If known"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Their Relationship to the Child(ren)"
              name="custody_subject_relationship"
              value={data.custody_subject_relationship}
              onChange={onChange}
              placeholder="e.g., Father, Mother, Stepparent..."
            />
            <FormField
              label="Their Relationship to You"
              name="custody_subject_relationship_to_client"
              value={data.custody_subject_relationship_to_client}
              onChange={onChange}
              placeholder="e.g., Ex-spouse, Co-parent, Former partner..."
            />
          </div>
          <FormField
            label="Last Known Address"
            name="custody_subject_last_address"
            value={data.custody_subject_last_address}
            onChange={onChange}
            placeholder="Address where they were last known to live"
          />
          <FormField
            label="Where do you believe they are living now?"
            name="custody_subject_address"
            type="textarea"
            value={data.custody_subject_address}
            onChange={onChange}
            placeholder="Current suspected address or area"
            rows={2}
          />
          <FormField
            label="Employer / Workplace"
            name="custody_subject_employer"
            value={data.custody_subject_employer}
            onChange={onChange}
            placeholder="Where they work, if known"
          />
          <FormField
            label="Vehicle(s)"
            name="custody_subject_vehicle"
            value={data.custody_subject_vehicle}
            onChange={onChange}
            placeholder="Make, model, color, and plate number(s)"
          />
          <FormField
            label="Social Media Accounts"
            name="custody_subject_social_media"
            value={data.custody_subject_social_media}
            onChange={onChange}
            placeholder="Facebook, Instagram, Snapchat, TikTok usernames or profile links"
          />
          <FormField
            label="Briefly describe why this person is being investigated"
            name="custody_subject_why"
            type="textarea"
            value={data.custody_subject_why}
            onChange={onChange}
            placeholder="e.g., Refusing to return child, violating custody order, suspected drug use in the home..."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 4: New Partner / Spouse */}
      <FormCard title="New Partner or Spouse" description="If the person being investigated has a new partner or spouse, provide what you know.">
        <div className="space-y-5">
          <FormField
            label="New partner's name or nickname"
            name="custody_partner_name"
            value={data.custody_partner_name}
            onChange={onChange}
            placeholder="Full name or nickname if known"
          />
          <FormField
            label="Phone, address, job, vehicle, or social media (list what you know)"
            name="custody_partner_details"
            type="textarea"
            value={data.custody_partner_details}
            onChange={onChange}
            placeholder="Any known contact info, workplace, vehicle, or social media for the new partner..."
            rows={3}
          />
          <FormField
            label="How did you learn about this person?"
            name="custody_partner_how_learned"
            value={data.custody_partner_how_learned}
            onChange={onChange}
            placeholder="e.g., Told by a mutual friend, saw on social media, subject mentioned them..."
          />
          <FormField
            label="Has this person contacted you directly?"
            name="custody_partner_contacted_you"
            type="radio"
            value={data.custody_partner_contacted_you}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Has the subject said the child is living with this person?"
            name="custody_partner_child_living_with"
            type="radio"
            value={data.custody_partner_child_living_with}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Do you know of any criminal history, CPS history, or safety concerns about this person?"
            name="custody_partner_safety_concerns"
            type="textarea"
            value={data.custody_partner_safety_concerns}
            onChange={onChange}
            placeholder="Any known criminal record, CPS involvement, dangerous behavior, or safety issues..."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 5: Temporary Agreement / Exchange */}
      <FormCard title="Temporary Agreement / Exchange" description="If the child was given to the other parent on a temporary basis, describe the arrangement.">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="What date did you give the child to the other parent?"
              name="custody_exchange_date"
              value={data.custody_exchange_date}
              onChange={onChange}
              placeholder="Date of exchange"
            />
            <FormField
              label="What date was the child supposed to be returned?"
              name="custody_return_date"
              value={data.custody_return_date}
              onChange={onChange}
              placeholder="Agreed return date"
            />
          </div>
          <FormField
            label="Where did the exchange happen?"
            name="custody_exchange_location"
            value={data.custody_exchange_location}
            onChange={onChange}
            placeholder="Location where you handed over the child"
          />
          <FormField
            label="Why did you agree to the temporary arrangement?"
            name="custody_exchange_reason"
            type="textarea"
            value={data.custody_exchange_reason}
            onChange={onChange}
            placeholder="Explain the circumstances that led to the temporary arrangement..."
            rows={3}
          />
          <FormField
            label="Did the other parent agree this was temporary?"
            name="custody_exchange_agreed_temp"
            type="radio"
            value={data.custody_exchange_agreed_temp}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Did you agree only because they were supposed to be living at a specific location (e.g., their parents' house)?"
            name="custody_exchange_condition"
            type="radio"
            value={data.custody_exchange_condition}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Did you ever agree they could move the child to a different location?"
            name="custody_exchange_relocation_agreed"
            type="radio"
            value={data.custody_exchange_relocation_agreed}
            onChange={onChange}
            options={YES_NO}
          />
        </div>
      </FormCard>

      {/* SECTION 6: Refusal to Return */}
      <FormCard title="Refusal to Return the Child" description="Describe what happened when the other parent refused to return the child.">
        <div className="space-y-5">
          <FormField
            label="When did they first refuse to return the child?"
            name="custody_refusal_date"
            value={data.custody_refusal_date}
            onChange={onChange}
            placeholder="Date or approximate timeframe"
          />
          <FormField
            label="What exactly did they say?"
            name="custody_refusal_statement"
            type="textarea"
            value={data.custody_refusal_statement}
            onChange={onChange}
            placeholder="As closely as you can remember, what did they say when they refused..."
            rows={3}
          />
          <FormField
            label="Did they say you would not get the child back or see the child again?"
            name="custody_refusal_threatened_no_return"
            type="radio"
            value={data.custody_refusal_threatened_no_return}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Have they allowed you to speak with or video chat with the child?"
            name="custody_refusal_contact_allowed"
            type="radio"
            value={data.custody_refusal_contact_allowed}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Have they blocked you or stopped responding?"
            name="custody_refusal_blocked"
            type="radio"
            value={data.custody_refusal_blocked}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Have they threatened to leave, hide the child, or involve police/CPS against you?"
            name="custody_refusal_threats"
            type="radio"
            value={data.custody_refusal_threats}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_refusal_threats === "yes" && (
            <FormField
              label="Describe the threats"
              name="custody_refusal_threats_details"
              type="textarea"
              value={data.custody_refusal_threats_details}
              onChange={onChange}
              placeholder="What did they say or do..."
              rows={3}
            />
          )}
        </div>
      </FormCard>

      {/* SECTION 7: Safety Concerns */}
      <FormCard title="Safety Concerns" description="Select all concerns that apply to the person being investigated.">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {CUSTODY_CONCERNS.map((concern) => {
              const checked = (data.custody_concerns || []).includes(concern);
              return (
                <label key={concern} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleMultiCheck("custody_concerns", concern, e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-foreground">{concern}</span>
                </label>
              );
            })}
          </div>
          <FormField
            label="Describe your safety concerns in detail"
            name="custody_safety_details"
            type="textarea"
            value={data.custody_safety_details}
            onChange={onChange}
            placeholder="Describe specific incidents, dates, and what you witnessed or were told..."
            rows={4}
          />
          <FormField
            label="Weapons accessible to the child?"
            name="custody_weapons"
            type="radio"
            value={data.custody_weapons}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Who should the child NOT be around, and why?"
            name="custody_avoid_persons"
            type="textarea"
            value={data.custody_avoid_persons}
            onChange={onChange}
            placeholder="Names, relationship to subject, and reasons for concern..."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 8: Criminal / Safety History */}
      <FormCard title="Criminal & Safety History" description="Any criminal history of the person being investigated that affects child safety.">
        <div className="space-y-5">
          <FormField
            label="Has this person been charged with or convicted of any felony?"
            name="custody_criminal_felony"
            type="radio"
            value={data.custody_criminal_felony}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_criminal_felony === "yes" && (
            <>
              <FormField
                label="What were they charged with or convicted of?"
                name="custody_criminal_felony_details"
                type="textarea"
                value={data.custody_criminal_felony_details}
                onChange={onChange}
                placeholder="Charge, conviction details, when it happened, and what county/state..."
                rows={3}
              />
              <FormField
                label="Was it related to harming or endangering the child?"
                name="custody_criminal_child_related"
                type="radio"
                value={data.custody_criminal_child_related}
                onChange={onChange}
                options={YES_NO}
              />
            </>
          )}
          <FormField
            label="Is this person currently on probation or parole?"
            name="custody_on_probation"
            type="radio"
            value={data.custody_on_probation}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_on_probation === "yes" && (
            <FormField
              label="Probation officer's name and office (if known)"
              name="custody_probation_officer"
              value={data.custody_probation_officer}
              onChange={onChange}
              placeholder="Officer name, department, phone number if known"
            />
          )}
          <FormField
            label="Does probation restrict where they can live or whether they can be around the child?"
            name="custody_probation_restrictions"
            type="radio"
            value={data.custody_probation_restrictions}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Was CPS ever involved with this person or this family?"
            name="custody_cps_history"
            type="radio"
            value={data.custody_cps_history}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_cps_history === "yes" && (
            <FormField
              label="Describe the CPS involvement"
              name="custody_cps_history_details"
              type="textarea"
              value={data.custody_cps_history_details}
              onChange={onChange}
              placeholder="When, what happened, outcome..."
              rows={3}
            />
          )}
          <FormField
            label="Does this person have drug, alcohol, violence, weapons, or mental health issues that concern you?"
            name="custody_other_safety_issues"
            type="textarea"
            value={data.custody_other_safety_issues}
            onChange={onChange}
            placeholder="Describe any substance abuse, violent history, weapons, or mental health concerns..."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 9: Parenting Conduct */}
      <FormCard title="Parenting Conduct" description="Document specific parenting failures or violations.">
        <div className="space-y-5">
          <FormField
            label="Missed exchanges or late pickups?"
            name="custody_missed_exchanges"
            type="radio"
            value={data.custody_missed_exchanges}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="School absences or medical neglect?"
            name="custody_school_neglect"
            type="radio"
            value={data.custody_school_neglect}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Parental alienation concerns?"
            name="custody_alienation"
            type="radio"
            value={data.custody_alienation}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Coaching the child to lie or make false statements?"
            name="custody_coaching"
            type="radio"
            value={data.custody_coaching}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Additional parenting conduct concerns"
            name="custody_conduct_notes"
            type="textarea"
            value={data.custody_conduct_notes}
            onChange={onChange}
            placeholder="Missed appointments, medication issues, interference with visitation, etc."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 10: Court Order Violations */}
      <FormCard title="Court Order Violations" description="Select any violations that have occurred.">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {COURT_VIOLATIONS.map((violation) => {
              const checked = (data.custody_violations || []).includes(violation);
              return (
                <label key={violation} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary/30 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleMultiCheck("custody_violations", violation, e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm text-foreground">{violation}</span>
                </label>
              );
            })}
          </div>
          <FormField
            label="Explain court order violations"
            name="custody_violations_explain"
            type="textarea"
            value={data.custody_violations_explain}
            onChange={onChange}
            placeholder="Describe what happened, dates, and any documentation you have..."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 11: Steps Already Taken */}
      <FormCard title="Steps Already Taken" description="Let us know what you've already done so we don't duplicate efforts.">
        <div className="space-y-5">
          <FormField
            label="Have you called the police?"
            name="custody_called_police"
            type="radio"
            value={data.custody_called_police}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_called_police === "yes" && (
            <FormField
              label="What did police say or do?"
              name="custody_police_response"
              type="textarea"
              value={data.custody_police_response}
              onChange={onChange}
              placeholder="Their response, case number, officer name if available..."
              rows={2}
            />
          )}
          <FormField
            label="Have you contacted CPS?"
            name="custody_called_cps"
            type="radio"
            value={data.custody_called_cps}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_called_cps === "yes" && (
            <FormField
              label="What did CPS say or do?"
              name="custody_cps_response"
              type="textarea"
              value={data.custody_cps_response}
              onChange={onChange}
              placeholder="Their response, case number, worker name if available..."
              rows={2}
            />
          )}
          <FormField
            label="Has a welfare check been performed on the child?"
            name="custody_welfare_check"
            type="radio"
            value={data.custody_welfare_check}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_welfare_check === "yes" && (
            <FormField
              label="What were the results of the welfare check?"
              name="custody_welfare_check_results"
              value={data.custody_welfare_check_results}
              onChange={onChange}
              placeholder="What happened, was child found, what was determined..."
            />
          )}
          <FormField
            label="Has anyone told you where the child is?"
            name="custody_child_location_tip"
            type="textarea"
            value={data.custody_child_location_tip}
            onChange={onChange}
            placeholder="Who told you, what they said, when..."
            rows={2}
          />
        </div>
      </FormCard>

      {/* SECTION 12: Court Preparation */}
      <FormCard title="Court & Legal Information" description="If this case is headed to court, provide case details.">
        <div className="space-y-5">
          <FormField
            label="Are you and the other parent divorced?"
            name="custody_divorced"
            type="radio"
            value={data.custody_divorced}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Is there an existing custody order, parenting plan, or child support order?"
            name="custody_existing_orders"
            type="radio"
            value={data.custody_existing_orders}
            onChange={onChange}
            options={YES_NO}
          />
          {data.custody_existing_orders === "yes" && (
            <>
              <FormField
                label="What court/county issued the order?"
                name="custody_court_name"
                value={data.custody_court_name}
                onChange={onChange}
                placeholder="e.g., Family Court of Lackawanna County, PA"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Case Number"
                  name="custody_case_number"
                  value={data.custody_case_number}
                  onChange={onChange}
                  placeholder="Docket/case number"
                />
                <FormField
                  label="Who has primary physical custody?"
                  name="custody_arrangement"
                  value={data.custody_arrangement}
                  onChange={onChange}
                  placeholder="e.g., Primary with mother, 50/50..."
                />
              </div>
              <FormField
                label="What visitation does the other parent normally have?"
                name="custody_visitation_schedule"
                value={data.custody_visitation_schedule}
                onChange={onChange}
                placeholder="e.g., Every other weekend, Wednesday evenings..."
              />
              <FormField
                label="Are there any restrictions on their contact with the child?"
                name="custody_contact_restrictions"
                type="textarea"
                value={data.custody_contact_restrictions}
                onChange={onChange}
                placeholder="Any supervised visitation requirements, no-contact orders, or geographic restrictions..."
                rows={2}
              />
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Judge's Name (if known)"
              name="custody_judge"
              value={data.custody_judge}
              onChange={onChange}
              placeholder="Assigned judge"
            />
            <FormField
              label="Attorney(s)"
              name="custody_attorneys"
              value={data.custody_attorneys}
              onChange={onChange}
              placeholder="Your attorney and/or opposing counsel"
            />
          </div>
          <FormField
            label="Upcoming Hearings / Court Dates"
            name="custody_hearings"
            value={data.custody_hearings}
            onChange={onChange}
            placeholder="Dates and type of hearing"
          />
          <FormField
            label="Emergency Petitions Filed?"
            name="custody_emergency_petitions"
            type="radio"
            value={data.custody_emergency_petitions}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Desired Outcome"
            name="custody_desired_outcome"
            type="textarea"
            value={data.custody_desired_outcome}
            onChange={onChange}
            placeholder="What result are you seeking from this investigation and/or court case?"
            rows={3}
          />
        </div>
      </FormCard>
    </div>
  );
}