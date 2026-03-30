import FormCard from "./FormCard";
import FormField from "./FormField";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const FREQUENCY_OPTIONS = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "rarely", label: "Rarely" },
];

export default function StepEvents({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Social Events & Travel
        </h2>
        <p className="text-muted-foreground">
          Upcoming events, reunions, and travel plans can be valuable surveillance windows. Share anything that may be relevant.
        </p>
      </div>

      <FormCard title="Upcoming Events & Outings">
        <div className="space-y-5">
          <FormField
            label="Any upcoming conferences, events, or trips?"
            name="upcoming_events"
            type="textarea"
            value={data.upcoming_events}
            onChange={onChange}
            placeholder="Conferences, business trips, social events..."
            rows={3}
          />

          <FormField
            label="How often does the subject go out with friends?"
            name="outings_frequency"
            type="radio"
            value={data.outings_frequency}
            onChange={onChange}
            options={FREQUENCY_OPTIONS}
          />

          <FormField
            label="Details about outings"
            name="outings_details"
            value={data.outings_details}
            onChange={onChange}
            placeholder="Where they go, who they go with, what time..."
          />
        </div>
      </FormCard>

      <FormCard title="Reunions" description="Reunion events often involve travel and extended time away.">
        <div className="space-y-5">
          <FormField
            label="High school reunion coming up?"
            name="hs_reunion"
            type="radio"
            value={data.hs_reunion}
            onChange={onChange}
            options={YES_NO}
          />
          {data.hs_reunion === "yes" && (
            <FormField
              label="When?"
              name="hs_reunion_date"
              value={data.hs_reunion_date}
              onChange={onChange}
              placeholder="Date or approximate timeframe"
            />
          )}

          <FormField
            label="College reunion coming up?"
            name="college_reunion"
            type="radio"
            value={data.college_reunion}
            onChange={onChange}
            options={YES_NO}
          />
          {data.college_reunion === "yes" && (
            <FormField
              label="When?"
              name="college_reunion_date"
              value={data.college_reunion_date}
              onChange={onChange}
              placeholder="Date or approximate timeframe"
            />
          )}
        </div>
      </FormCard>

      <FormCard title="Travel Plans" description="Upcoming travel is often a key time for investigation activity.">
        <FormField
          label="Any travel plans in the near future?"
          name="travel_plans"
          type="textarea"
          value={data.travel_plans}
          onChange={onChange}
          placeholder="Destinations, dates, who they're traveling with, reason for travel..."
          rows={4}
          helper="Include as much detail as possible — even tentative plans."
        />
      </FormCard>
    </div>
  );
}