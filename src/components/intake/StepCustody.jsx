import FormCard from "./FormCard";
import FormField from "./FormField";
import DynamicList from "./DynamicList";

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
          Provide details about the children and your specific concerns. This information is critical for building your custody investigation case.
        </p>
      </div>

      <FormCard title="Child Information" description="Details about the children involved in this case.">
        <div className="space-y-5">
          <FormField
            label="Full Name(s) of Child(ren)"
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
              placeholder="e.g., 01/15/2015, 06/22/2018"
            />
            <FormField
              label="Age(s)"
              name="custody_child_ages"
              value={data.custody_child_ages}
              onChange={onChange}
              placeholder="e.g., 9, 6"
            />
          </div>
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
          <FormField
            label="Current Custody Arrangement"
            name="custody_arrangement"
            value={data.custody_arrangement}
            onChange={onChange}
            placeholder="e.g., 50/50 split, primary with mother, supervised visitation..."
          />
          <FormField
            label="Transportation Arrangements"
            name="custody_transport"
            value={data.custody_transport}
            onChange={onChange}
            placeholder="Who transports the children and how"
          />
        </div>
      </FormCard>

      <FormCard
        title="Person Being Investigated"
        description="Tell us about the individual whose conduct or fitness as a parent is in question. This is the person our investigators will be focused on."
      >
        <div className="space-y-5">
          <FormField
            label="Full Name of Person Being Investigated"
            name="custody_subject_name"
            value={data.custody_subject_name}
            onChange={onChange}
            placeholder="Full legal name"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Their Relationship to the Child(ren)"
              name="custody_subject_relationship"
              value={data.custody_subject_relationship}
              onChange={onChange}
              placeholder="e.g., Father, Mother, Stepparent, Boyfriend of Mother..."
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
            label="Their Current Address"
            name="custody_subject_address"
            value={data.custody_subject_address}
            onChange={onChange}
            placeholder="Where this person currently lives"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Their Phone Number"
              name="custody_subject_phone"
              value={data.custody_subject_phone}
              onChange={onChange}
              placeholder="If known"
            />
            <FormField
              label="Their Employer / Workplace"
              name="custody_subject_employer"
              value={data.custody_subject_employer}
              onChange={onChange}
              placeholder="Where they work, if known"
            />
          </div>
          <FormField
            label="Their Vehicle(s)"
            name="custody_subject_vehicle"
            value={data.custody_subject_vehicle}
            onChange={onChange}
            placeholder="Make, model, color, and plate number(s)"
          />
          <FormField
            label="Briefly describe why this person is being investigated"
            name="custody_subject_why"
            type="textarea"
            value={data.custody_subject_why}
            onChange={onChange}
            placeholder="e.g., Suspected drug use in the home, violating custody order, exposing child to dangerous individuals..."
            rows={3}
          />
        </div>
      </FormCard>

      <FormCard title="Safety Concerns" description="Select all concerns that apply.">
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
            label="Known Drug Users / Drug Houses"
            name="custody_drug_users"
            value={data.custody_drug_users}
            onChange={onChange}
            placeholder="Names or addresses of known drug users or locations"
          />

          <FormField
            label="Weapons Accessible to Child?"
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
            label="Coaching the child (coaching child to lie or make false statements)?"
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

      <FormCard title="Court Preparation" description="If this case is headed to court, provide case details.">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Court Name"
              name="custody_court_name"
              value={data.custody_court_name}
              onChange={onChange}
              placeholder="e.g., Family Court of New York"
            />
            <FormField
              label="Case Number"
              name="custody_case_number"
              value={data.custody_case_number}
              onChange={onChange}
              placeholder="Court docket/case number"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Judge's Name"
              name="custody_judge"
              value={data.custody_judge}
              onChange={onChange}
              placeholder="Assigned judge if known"
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
            label="Existing Court Orders"
            name="custody_existing_orders"
            type="textarea"
            value={data.custody_existing_orders}
            onChange={onChange}
            placeholder="Describe any existing custody, protective, or restraining orders..."
            rows={3}
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