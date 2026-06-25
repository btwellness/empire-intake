import FormCard from "./FormCard";
import FormField from "./FormField";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export default function StepSituationalAftermath({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Aftermath & Resolution
        </h2>
        <p className="text-muted-foreground">
          Tell us about the impact, any authorities involved, and what you're hoping to achieve.
        </p>
      </div>

      {/* SECTION 1: Injuries & Damage */}
      <FormCard title="Injuries & Damage" description="Physical, property, and emotional impact of the incident.">
        <div className="space-y-5">
          <FormField
            label="Physical injuries"
            name="sit_injuries"
            type="textarea"
            value={data.sit_injuries}
            onChange={onChange}
            placeholder="Who was injured, where on the body, treated by whom..."
            rows={3}
          />
          <FormField
            label="Property damage (itemized, estimated cost)"
            name="sit_property_damage"
            type="textarea"
            value={data.sit_property_damage}
            onChange={onChange}
            placeholder="List damaged items and estimated repair/replacement costs..."
            rows={3}
          />
          <FormField
            label="Emotional / psychological impact"
            name="sit_emotional_impact"
            type="textarea"
            value={data.sit_emotional_impact}
            onChange={onChange}
            placeholder="How has this affected you emotionally or psychologically?"
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 2: Authorities & Reports */}
      <FormCard title="Authorities & Reports" description="Law enforcement, medical, and insurance involvement.">
        <div className="space-y-5">
          <FormField
            label="Was 911 called?"
            name="sit_911_called"
            type="radio"
            value={data.sit_911_called}
            onChange={onChange}
            options={YES_NO}
          />
          {data.sit_911_called === "yes" && (
            <FormField
              label="Who called and at what time?"
              name="sit_911_called_details"
              type="textarea"
              value={data.sit_911_called_details}
              onChange={onChange}
              placeholder="Who called 911 and what time the call was made..."
              rows={2}
            />
          )}
          <FormField
            label="Police response"
            name="sit_police_response"
            type="textarea"
            value={data.sit_police_response}
            onChange={onChange}
            placeholder="Officer name, badge number, agency, report number..."
            rows={3}
          />
          <FormField
            label="Were citations issued? To whom?"
            name="sit_citations"
            type="textarea"
            value={data.sit_citations}
            onChange={onChange}
            placeholder="Were any citations or tickets issued, and to whom?"
            rows={2}
          />
          <FormField
            label="Medical response"
            name="sit_medical_response"
            type="textarea"
            value={data.sit_medical_response}
            onChange={onChange}
            placeholder="EMS response, hospital, treating providers..."
            rows={2}
          />
          <FormField
            label="Insurance reported? Claim number?"
            name="sit_insurance_reported"
            type="textarea"
            value={data.sit_insurance_reported}
            onChange={onChange}
            placeholder="Was insurance contacted, which company, claim number..."
            rows={2}
          />
        </div>
      </FormCard>

      {/* SECTION 3: Context & History */}
      <FormCard title="Context & History" description="Background that may be relevant to the investigation.">
        <div className="space-y-5">
          <FormField
            label="Did you know the other party before this?"
            name="sit_knew_party"
            type="radio"
            value={data.sit_knew_party}
            onChange={onChange}
            options={YES_NO}
          />
          {data.sit_knew_party === "yes" && (
            <FormField
              label="Any prior incidents with them?"
              name="sit_prior_incidents"
              type="textarea"
              value={data.sit_prior_incidents}
              onChange={onChange}
              placeholder="Describe any prior incidents or history with this person..."
              rows={3}
            />
          )}
          <FormField
            label="Were you on a regular route or somewhere unusual?"
            name="sit_regular_route"
            value={data.sit_regular_route}
            onChange={onChange}
            placeholder="e.g., Daily commute, unusual detour, first time in the area..."
          />
          <FormField
            label="Any reason someone might target you specifically?"
            name="sit_targeted_reason"
            type="textarea"
            value={data.sit_targeted_reason}
            onChange={onChange}
            placeholder="Any reason to believe you were specifically targeted..."
            rows={2}
          />
        </div>
      </FormCard>

      {/* SECTION 4: Aftermath */}
      <FormCard title="Aftermath" description="What has happened since the incident and your desired outcome.">
        <div className="space-y-5">
          <FormField
            label="Did the other party follow you, contact you, or threaten further action?"
            name="sit_followed_contacted"
            type="textarea"
            value={data.sit_followed_contacted}
            onChange={onChange}
            placeholder="Describe any follow-up contact, following, or threats..."
            rows={2}
          />
          <FormField
            label="Messages, social media contact, or visits received since"
            name="sit_messages_received"
            type="textarea"
            value={data.sit_messages_received}
            onChange={onChange}
            placeholder="Any messages, posts, or visits since the incident..."
            rows={2}
          />
          <FormField
            label="Current safety concerns"
            name="sit_current_safety_concerns"
            type="textarea"
            value={data.sit_current_safety_concerns}
            onChange={onChange}
            placeholder="Do you feel unsafe now? Any ongoing threats?"
            rows={3}
          />
          <FormField
            label="What outcome are you seeking?"
            name="sit_desired_outcome"
            type="textarea"
            value={data.sit_desired_outcome}
            onChange={onChange}
            placeholder="Criminal charges, civil claim, insurance, restraining order, etc."
            rows={3}
          />
        </div>
      </FormCard>
    </div>
  );
}