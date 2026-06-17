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
          <FormField
            label="Created new passwords or changed existing ones?"
            name="new_passwords"
            type="radio"
            value={data.new_passwords}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Suspected use of a burner/secondary phone?"
            name="burner_phones"
            type="radio"
            value={data.burner_phones}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Unexplained spending or cash withdrawals?"
            name="unexplained_spending"
            type="radio"
            value={data.unexplained_spending}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="New wardrobe, cosmetic changes, or appearance upgrades?"
            name="new_wardrobe"
            type="radio"
            value={data.new_wardrobe}
            onChange={onChange}
            options={YES_NO}
          />
          <FormField
            label="Changed sleeping habits (staying up late, sleeping in separate room)?"
            name="changed_sleeping_habits"
            type="radio"
            value={data.changed_sleeping_habits}
            onChange={onChange}
            options={YES_NO}
          />
        </div>
      </FormCard>

      <FormCard title="Possible Affair Partner" description="If you suspect someone specific, share what you know. Any detail helps.">
        <div className="space-y-5">
          <FormField
            label="Possible Affair Partner Name"
            name="affair_partner_name"
            value={data.affair_partner_name}
            onChange={onChange}
            placeholder="Full name or partial name if known"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Their Address"
              name="affair_partner_address"
              value={data.affair_partner_address}
              onChange={onChange}
              placeholder="Home or work address if known"
            />
            <FormField
              label="Their Employer"
              name="affair_partner_employer"
              value={data.affair_partner_employer}
              onChange={onChange}
              placeholder="Where they work"
            />
          </div>
          <FormField
            label="Their Vehicle"
            name="affair_partner_vehicle"
            value={data.affair_partner_vehicle}
            onChange={onChange}
            placeholder="Make, model, color, plate if known"
          />
        </div>
      </FormCard>
    </div>
  );
}