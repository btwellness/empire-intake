import FormCard from "./FormCard";
import FormField from "./FormField";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function StepSubjectInfo({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Subject Information
        </h2>
        <p className="text-muted-foreground">
          Tell us everything you can about the person being investigated. Approximate details are perfectly fine if exact information is unknown.
        </p>
      </div>

      <FormCard title="Basic Information" description="The more detail you can provide, the more effective the investigation.">
        <div className="space-y-5">
          <FormField
            label="Subject's Full Name"
            name="subject_name"
            value={data.subject_name}
            onChange={onChange}
            placeholder="Full legal name"
            required
          />
          <FormField
            label="Nicknames or Aliases"
            name="subject_nicknames"
            value={data.subject_nicknames}
            onChange={onChange}
            placeholder="Any known nicknames or alternative names"
          />
          <FormField
            label="Subject's Phone Number"
            name="subject_phone"
            type="tel"
            value={data.subject_phone}
            onChange={onChange}
            placeholder="If known"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="SSN (last 4 digits, if known)"
              name="subject_ssn_last4"
              value={data.subject_ssn_last4}
              onChange={onChange}
              placeholder="e.g., 1234"
              helper="Optional — helps confirm identity."
            />
            <FormField
              label="Photo Available?"
              name="subject_photo_available"
              type="radio"
              value={data.subject_photo_available}
              onChange={onChange}
              options={YES_NO}
            />
          </div>
          <FormField
            label="Social Media Accounts"
            name="subject_social_media"
            value={data.subject_social_media}
            onChange={onChange}
            placeholder="Facebook, Instagram, Snapchat usernames or profile URLs"
            helper="Any known social media handles or profile links."
          />
        </div>
      </FormCard>

      <FormCard title="Subject's Home Address" description="Where does the subject currently reside?">
        <div className="space-y-5">
          <FormField
            label="Street Address"
            name="subject_address"
            value={data.subject_address}
            onChange={onChange}
            placeholder="Street address"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField label="City" name="subject_city" value={data.subject_city} onChange={onChange} placeholder="City" />
            <FormField label="State" name="subject_state" value={data.subject_state} onChange={onChange} placeholder="State" />
            <FormField label="ZIP" name="subject_zip" value={data.subject_zip} onChange={onChange} placeholder="ZIP" className="col-span-2 md:col-span-1" />
          </div>

          <FormField
            label="Are lights on a timer at this address?"
            name="lights_on_timer"
            type="radio"
            value={data.lights_on_timer}
            onChange={onChange}
            options={YES_NO}
          />

          <FormField
            label="Other residents at this address"
            name="other_residents"
            value={data.other_residents}
            onChange={onChange}
            placeholder="Names and relationship to subject"
            helper="This helps our team understand who else may be present."
          />

          <FormField
            label="Is there a dog at this location?"
            name="dog_at_location"
            type="radio"
            value={data.dog_at_location}
            onChange={onChange}
            options={YES_NO}
          />

          {data.dog_at_location === "yes" && (
            <FormField
              label="Dog type and where it's kept"
              name="dog_details"
              value={data.dog_details}
              onChange={onChange}
              placeholder="e.g., German Shepherd, kept in backyard"
              helper="Helps our team prepare for on-site visits."
            />
          )}
        </div>
      </FormCard>

      <FormCard title="Physical Description" description="Any details help our investigators identify the subject.">
        <div className="space-y-5">
          <FormField
            label="Gender"
            name="subject_gender"
            type="radio"
            value={data.subject_gender}
            onChange={onChange}
            options={GENDER_OPTIONS}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Age" name="subject_age" value={data.subject_age} onChange={onChange} placeholder="Approximate age" />
            <FormField label="Date of Birth" name="subject_dob" type="date" value={data.subject_dob} onChange={onChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Height" name="subject_height" value={data.subject_height} onChange={onChange} placeholder="e.g., 5'10&quot;" />
            <FormField label="Weight" name="subject_weight" value={data.subject_weight} onChange={onChange} placeholder="e.g., 180 lbs" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Hair Color" name="subject_hair_color" value={data.subject_hair_color} onChange={onChange} placeholder="e.g., Brown" />
            <FormField label="Skin Tone" name="subject_skin_tone" value={data.subject_skin_tone} onChange={onChange} placeholder="e.g., Fair, Medium, Dark" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Facial Hair?"
              name="subject_facial_hair"
              type="radio"
              value={data.subject_facial_hair}
              onChange={onChange}
              options={YES_NO}
            />
            <FormField
              label="Wears Glasses?"
              name="subject_glasses"
              type="radio"
              value={data.subject_glasses}
              onChange={onChange}
              options={YES_NO}
            />
          </div>

          <FormField
            label="Unique Identifying Features"
            name="subject_identifying_features"
            type="textarea"
            value={data.subject_identifying_features}
            onChange={onChange}
            placeholder="Tattoos, scars, moles, piercings, or other distinguishing marks"
            rows={3}
          />
        </div>
      </FormCard>

      <FormCard title="Vehicle #1" description="Primary vehicle information — critical for surveillance.">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Make & Model" name="vehicle_make_model" value={data.vehicle_make_model} onChange={onChange} placeholder="e.g., Toyota Camry" />
            <FormField label="Color" name="vehicle_color" value={data.vehicle_color} onChange={onChange} placeholder="e.g., Silver" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="State & Plate Number" name="vehicle_plate" value={data.vehicle_plate} onChange={onChange} placeholder="e.g., NY ABC-1234" />
            <FormField label="Year" name="vehicle_year" value={data.vehicle_year} onChange={onChange} placeholder="e.g., 2020" />
          </div>
          <FormField
            label="Unique Identifiers on Vehicle"
            name="vehicle_identifiers"
            value={data.vehicle_identifiers}
            onChange={onChange}
            placeholder="Stickers, decals, dents, modifications, etc."
          />
          <FormField
            label="Do you co-own this vehicle?"
            name="vehicle_co_own"
            type="radio"
            value={data.vehicle_co_own}
            onChange={onChange}
            options={YES_NO}
          />
        </div>
      </FormCard>

      <FormCard title="Vehicle #2 (if applicable)" description="Second vehicle if the subject drives more than one.">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Make & Model" name="vehicle2_make_model" value={data.vehicle2_make_model} onChange={onChange} placeholder="e.g., Honda Accord" />
            <FormField label="Color" name="vehicle2_color" value={data.vehicle2_color} onChange={onChange} placeholder="e.g., Black" />
          </div>
          <FormField label="State & Plate Number" name="vehicle2_plate" value={data.vehicle2_plate} onChange={onChange} placeholder="e.g., NJ XYZ-5678" />
        </div>
      </FormCard>
    </div>
  );
}