import FormCard from "./FormCard";
import FormField from "./FormField";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export default function StepSituational({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Incident Details
        </h2>
        <p className="text-muted-foreground">
          Provide as much detail as you can about the incident. If you're unsure of something, write "unknown" or leave it blank.
        </p>
      </div>

      {/* SECTION 1: Incident Basics */}
      <FormCard title="Incident Basics" description="When and where the incident occurred.">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Date and exact time it occurred"
              name="sit_incident_date"
              value={data.sit_incident_date}
              onChange={onChange}
              placeholder="e.g., June 15, 2025 at 3:45 PM"
              required
            />
            <FormField
              label="Time it ended"
              name="sit_incident_end_time"
              value={data.sit_incident_end_time}
              onChange={onChange}
              placeholder="e.g., 3:52 PM"
            />
          </div>
          <FormField
            label="Location"
            name="sit_incident_location"
            type="textarea"
            value={data.sit_incident_location}
            onChange={onChange}
            placeholder="Street, intersection, mile marker, city, state, GPS if known..."
            rows={2}
          />
          <FormField
            label="Direction of travel / lane / side of road"
            name="sit_travel_direction"
            value={data.sit_travel_direction}
            onChange={onChange}
            placeholder="e.g., Northbound, right lane, east side of the road"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Weather, lighting & road conditions"
              name="sit_weather_conditions"
              value={data.sit_weather_conditions}
              onChange={onChange}
              placeholder="e.g., Clear, sunny, dry pavement, daylight"
            />
            <FormField
              label="Traffic conditions and density"
              name="sit_traffic_conditions"
              value={data.sit_traffic_conditions}
              onChange={onChange}
              placeholder="e.g., Heavy, moderate, light, stop-and-go"
            />
          </div>
        </div>
      </FormCard>

      {/* SECTION 2: People Involved */}
      <FormCard title="People Involved" description="Information about everyone connected to the incident.">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Your Date of Birth"
              name="sit_client_dob"
              value={data.sit_client_dob}
              onChange={onChange}
              placeholder="MM/DD/YYYY"
            />
            <FormField
              label="Your Contact Information"
              name="sit_client_contact"
              value={data.sit_client_contact}
              onChange={onChange}
              placeholder="Phone, email"
            />
          </div>
          <FormField
            label="Your Driver's License Number"
            name="sit_client_license"
            value={data.sit_client_license}
            onChange={onChange}
            placeholder="License number and state"
          />
          <FormField
            label="Other Party — Name (if known)"
            name="sit_other_party_name"
            value={data.sit_other_party_name}
            onChange={onChange}
            placeholder="Full name if you know it"
          />
          <FormField
            label="Other Party — Description, clothing, demeanor"
            name="sit_other_party_description"
            type="textarea"
            value={data.sit_other_party_description}
            onChange={onChange}
            placeholder="Physical description, what they were wearing, their behavior and demeanor..."
            rows={3}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Passengers in your vehicle"
              name="sit_your_passengers"
              type="textarea"
              value={data.sit_your_passengers}
              onChange={onChange}
              placeholder="Names, ages, where they were seated"
              rows={2}
            />
            <FormField
              label="Passengers in their vehicle"
              name="sit_their_passengers"
              type="textarea"
              value={data.sit_their_passengers}
              onChange={onChange}
              placeholder="How many, descriptions if known"
              rows={2}
            />
          </div>
          <FormField
            label="Witnesses"
            name="sit_witnesses"
            type="textarea"
            value={data.sit_witnesses}
            onChange={onChange}
            placeholder="Names, contact info, where they were positioned..."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 3: Vehicles */}
      <FormCard title="Vehicles" description="Details about all vehicles involved.">
        <div className="space-y-5">
          <FormField
            label="Your Vehicle"
            name="sit_your_vehicle"
            type="textarea"
            value={data.sit_your_vehicle}
            onChange={onChange}
            placeholder="Make, model, year, color, plate, VIN, and damage..."
            rows={3}
          />
          <FormField
            label="Other Vehicle(s)"
            name="sit_other_vehicle"
            type="textarea"
            value={data.sit_other_vehicle}
            onChange={onChange}
            placeholder="Make, model, year, color, plate, plus any decals, dents, distinguishing marks..."
            rows={3}
          />
          <FormField
            label="Direction each vehicle was traveling and final resting position"
            name="sit_vehicle_directions"
            type="textarea"
            value={data.sit_vehicle_directions}
            onChange={onChange}
            placeholder="e.g., I was heading north, they were heading south, both came to rest on the shoulder..."
            rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 4: Sequence of Events */}
      <FormCard title="Sequence of Events" description="Walk us through exactly what happened, step by step.">
        <div className="space-y-5">
          <FormField
            label="What were you doing in the moments before it started?"
            name="sit_before_start"
            type="textarea"
            value={data.sit_before_start}
            onChange={onChange}
            placeholder="e.g., Driving home from work, stopped at a red light..."
            rows={2}
          />
          <FormField
            label="What was the first action that triggered the incident?"
            name="sit_first_action"
            type="textarea"
            value={data.sit_first_action}
            onChange={onChange}
            placeholder="Describe the first thing that set it off..."
            rows={2}
          />
          <FormField
            label="Step by step, what happened next?"
            name="sit_step_by_step"
            type="textarea"
            value={data.sit_step_by_step}
            onChange={onChange}
            placeholder="Gestures, words, maneuvers, contact — be as detailed as possible..."
            rows={5}
          />
          <FormField
            label="How did it end? Who left first, in what direction?"
            name="sit_how_ended"
            type="textarea"
            value={data.sit_how_ended}
            onChange={onChange}
            placeholder="Describe how the encounter concluded..."
            rows={2}
          />
          <FormField
            label="Total duration of the encounter"
            name="sit_total_duration"
            value={data.sit_total_duration}
            onChange={onChange}
            placeholder="e.g., About 3 minutes, 30 seconds"
          />
        </div>
      </FormCard>

      {/* SECTION 5: Communication & Behavior */}
      <FormCard title="Communication & Behavior" description="What was said and how people acted during the incident.">
        <div className="space-y-5">
          <FormField
            label="Verbal exchanges (exact words if possible)"
            name="sit_verbal_exchanges"
            type="textarea"
            value={data.sit_verbal_exchanges}
            onChange={onChange}
            placeholder="What was said — by you, by them, exact words if you can recall..."
            rows={3}
          />
          <FormField
            label="Gestures, signals, honking"
            name="sit_gestures"
            type="textarea"
            value={data.sit_gestures}
            onChange={onChange}
            placeholder="Hand gestures, headlight flashes, horn use, turn signals..."
            rows={2}
          />
          <FormField
            label="Any threats, displayed weapons, or physical contact?"
            name="sit_threats_weapons"
            type="radio"
            value={data.sit_threats_weapons}
            onChange={onChange}
            options={YES_NO}
          />
          {data.sit_threats_weapons === "yes" && (
            <FormField
              label="Describe the threats, weapons, or physical contact"
              name="sit_threats_weapons_details"
              type="textarea"
              value={data.sit_threats_weapons_details}
              onChange={onChange}
              placeholder="What was threatened or displayed, what physical contact occurred..."
              rows={3}
            />
          )}
          <FormField
            label="Signs of impairment (alcohol, drugs, distraction, phone use)"
            name="sit_impairment_signs"
            type="textarea"
            value={data.sit_impairment_signs}
            onChange={onChange}
            placeholder="Did you notice signs of impairment in the other party? Slurred speech, texting, erratic driving..."
              rows={3}
          />
        </div>
      </FormCard>

      {/* SECTION 6: Evidence */}
      <FormCard title="Evidence" description="Any documentation or physical evidence related to the incident.">
        <div className="space-y-5">
          <FormField
            label="Dashcam, phone video, or nearby security footage?"
            name="sit_dashcam_footage"
            type="textarea"
            value={data.sit_dashcam_footage}
            onChange={onChange}
            placeholder="What footage exists, who has it, doorbell/security cameras nearby..."
            rows={2}
          />
          <FormField
            label="Photos taken (scene, damage, injuries, plates)"
            name="sit_photos_taken"
            type="textarea"
            value={data.sit_photos_taken}
            onChange={onChange}
            placeholder="What photos were taken and by whom..."
            rows={2}
          />
          <FormField
            label="Audio recordings"
            name="sit_audio_recordings"
            type="textarea"
            value={data.sit_audio_recordings}
            onChange={onChange}
            placeholder="Any audio recordings of the incident..."
            rows={2}
          />
          <FormField
            label="Physical evidence preserved"
            name="sit_physical_evidence"
            type="textarea"
            value={data.sit_physical_evidence}
            onChange={onChange}
            placeholder="Clothing, vehicle damage, items thrown or left behind..."
            rows={3}
          />
        </div>
      </FormCard>
    </div>
  );
}