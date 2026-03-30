import FormCard from "./FormCard";
import FormField from "./FormField";

const CONTACT_OPTIONS = [
  { value: "phone", label: "Phone call" },
  { value: "text", label: "Text message" },
  { value: "email", label: "Email" },
];

const RELATIONSHIP_OPTIONS = [
  { value: "spouse", label: "Spouse" },
  { value: "partner", label: "Partner / Significant Other" },
  { value: "parent", label: "Parent" },
  { value: "employer", label: "Employer" },
  { value: "business_partner", label: "Business Partner" },
  { value: "attorney", label: "Attorney" },
  { value: "other", label: "Other" },
];

export default function StepClientInfo({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Your Information
        </h2>
        <p className="text-muted-foreground">
          We need a few details to maintain secure communication with you throughout the process.
        </p>
      </div>

      <FormCard title="Contact Details" description="We will never share or disclose your information.">
        <div className="space-y-5">
          <FormField
            label="Your Full Name"
            name="client_name"
            value={data.client_name}
            onChange={onChange}
            placeholder="First and last name"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              label="Secure Phone Number"
              name="client_phone"
              type="tel"
              value={data.client_phone}
              onChange={onChange}
              placeholder="(555) 555-5555"
              helper="A private number we can safely reach you at."
              required
            />
            <FormField
              label="Secure Email Address"
              name="client_email"
              type="email"
              value={data.client_email}
              onChange={onChange}
              placeholder="your@email.com"
              helper="Use an email only you have access to."
            />
          </div>

          <FormField
            label="Preferred Contact Method"
            name="preferred_contact"
            type="radio"
            value={data.preferred_contact}
            onChange={onChange}
            options={CONTACT_OPTIONS}
          />

          <FormField
            label="Safe Times to Contact You"
            name="safe_contact_times"
            value={data.safe_contact_times}
            onChange={onChange}
            placeholder="e.g., Weekdays 9am–5pm, avoid evenings"
            helper="Let us know when it's safe to reach out."
          />
        </div>
      </FormCard>

      <FormCard title="Your Address" description="This information helps us understand jurisdictional needs.">
        <div className="space-y-5">
          <FormField
            label="Street Address"
            name="client_address"
            value={data.client_address}
            onChange={onChange}
            placeholder="123 Main Street"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField
              label="City"
              name="client_city"
              value={data.client_city}
              onChange={onChange}
              placeholder="City"
            />
            <FormField
              label="State"
              name="client_state"
              value={data.client_state}
              onChange={onChange}
              placeholder="State"
            />
            <FormField
              label="ZIP Code"
              name="client_zip"
              value={data.client_zip}
              onChange={onChange}
              placeholder="ZIP"
              className="col-span-2 md:col-span-1"
            />
          </div>
        </div>
      </FormCard>

      <FormCard title="Your Relationship to the Subject" description="Understanding your connection helps us tailor our approach.">
        <FormField
          name="client_relationship"
          type="select"
          value={data.client_relationship}
          onChange={onChange}
          options={RELATIONSHIP_OPTIONS}
          placeholder="Select your relationship"
        />
      </FormCard>
    </div>
  );
}