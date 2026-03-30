import FormCard from "./FormCard";
import FormField from "./FormField";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export default function StepBehavior({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Surveillance & Behavior
        </h2>
        <p className="text-muted-foreground">
          Help us understand what you've observed and any prior efforts to gather information. This section is especially important for domestic investigations.
        </p>
      </div>

      <FormCard title="Prior Surveillance" description="Has this person been surveilled or investigated before?">
        <div className="space-y-5">
          <FormField
            label="Have you ever followed this person yourself or had them under surveillance?"
            name="prior_surveillance"
            type="radio"
            value={data.prior_surveillance}
            onChange={onChange}
            options={YES_NO}
          />

          {data.prior_surveillance === "yes" && (
            <>
              <FormField
                label="When did this take place?"
                name="prior_surveillance_when"
                value={data.prior_surveillance_when}
                onChange={onChange}
                placeholder="Approximate dates and duration"
              />
              <FormField
                label="What were the results?"
                name="prior_surveillance_results"
                type="textarea"
                value={data.prior_surveillance_results}
                onChange={onChange}
                placeholder="Describe what was found or observed"
                rows={3}
              />
              <FormField
                label="Who conducted the investigation?"
                name="prior_surveillance_who"
                value={data.prior_surveillance_who}
                onChange={onChange}
                placeholder="Name of investigator or agency, if applicable"
              />
            </>
          )}
        </div>
      </FormCard>

      <FormCard title="Suspected Activity" description="What behaviors have raised your concern?">
        <div className="space-y-5">
          <FormField
            label="Do you have any ideas who the subject may be seeing?"
            name="subject_seeing_someone"
            type="textarea"
            value={data.subject_seeing_someone}
            onChange={onChange}
            placeholder="Names, descriptions, how they may have met..."
            rows={3}
            helper="Share whatever comes to mind — no detail is too small."
          />

          <FormField
            label="Any specific behavior that makes you suspect something is going on?"
            name="suspicious_behavior"
            type="radio"
            value={data.suspicious_behavior}
            onChange={onChange}
            options={YES_NO}
          />

          {data.suspicious_behavior === "yes" && (
            <FormField
              label="When, where, and what happened?"
              name="suspicious_times_where"
              type="textarea"
              value={data.suspicious_times_where}
              onChange={onChange}
              placeholder="Describe the incidents, times, and locations"
              rows={4}
            />
          )}
        </div>
      </FormCard>

      <FormCard title="Behavioral Red Flags" description="Check any behaviors you've noticed recently.">
        <div className="space-y-5">
          <FormField
            label="Hiding phone or credit card bills?"
            name="hiding_phone_bills"
            type="radio"
            value={data.hiding_phone_bills}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Staying late at work more than usual?"
            name="staying_late_work"
            type="radio"
            value={data.staying_late_work}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Secretive about computer or cell phone?"
            name="secretive_devices"
            type="radio"
            value={data.secretive_devices}
            onChange={onChange}
            options={YES_NO}
          />
        </div>
      </FormCard>
    </div>
  );
}