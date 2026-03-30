import FormCard from "./FormCard";
import FormField from "./FormField";

export default function StepEmployment({ data, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Employment & Lifestyle
        </h2>
        <p className="text-muted-foreground">
          Routine information is essential for effective surveillance planning. Share what you know — even small details matter.
        </p>
      </div>

      <FormCard title="Employment Details" description="Where does the subject work, and what is their schedule?">
        <div className="space-y-5">
          <FormField
            label="Employer / Company Name"
            name="work_name"
            value={data.work_name}
            onChange={onChange}
            placeholder="Company or business name"
          />
          <FormField
            label="Work Address"
            name="work_address"
            value={data.work_address}
            onChange={onChange}
            placeholder="Street address"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <FormField label="City" name="work_city" value={data.work_city} onChange={onChange} placeholder="City" />
            <FormField label="State" name="work_state" value={data.work_state} onChange={onChange} placeholder="State" />
            <FormField label="ZIP" name="work_zip" value={data.work_zip} onChange={onChange} placeholder="ZIP" className="col-span-2 md:col-span-1" />
          </div>
          <FormField
            label="Work Phone"
            name="work_phone"
            type="tel"
            value={data.work_phone}
            onChange={onChange}
            placeholder="Office phone number"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Days Worked" name="work_days" value={data.work_days} onChange={onChange} placeholder="e.g., Mon–Fri" />
            <FormField label="Working Hours" name="work_hours" value={data.work_hours} onChange={onChange} placeholder="e.g., 8am–5pm" />
            <FormField label="Job Title" name="work_job_title" value={data.work_job_title} onChange={onChange} placeholder="e.g., Sales Manager" />
          </div>
          <FormField
            label="Where does the subject park at work?"
            name="subject_parking"
            value={data.subject_parking}
            onChange={onChange}
            placeholder="Parking lot, garage, street location"
          />
          <FormField
            label="Where does the subject go for lunch?"
            name="subject_lunch"
            value={data.subject_lunch}
            onChange={onChange}
            placeholder="Restaurant, cafeteria, specific location"
            helper="Lunch breaks can be important windows for surveillance."
          />
        </div>
      </FormCard>

      <FormCard title="Lifestyle & Habits" description="Daily routines and patterns provide valuable intelligence.">
        <div className="space-y-5">
          <FormField
            label="Hobbies & Interests"
            name="subject_hobbies"
            value={data.subject_hobbies}
            onChange={onChange}
            placeholder="Sports, gym, clubs, activities..."
          />
          <FormField
            label="Recreational Vehicles"
            name="subject_rec_vehicles"
            value={data.subject_rec_vehicles}
            onChange={onChange}
            placeholder="Motorcycles, boats, ATVs, etc."
          />
          <FormField
            label="Weekend Routine (When Not Working)"
            name="subject_weekend_routine"
            type="textarea"
            value={data.subject_weekend_routine}
            onChange={onChange}
            placeholder="Describe a typical weekend for the subject"
            rows={3}
          />
          <FormField
            label="Places Subject Frequents"
            name="subject_frequented_places"
            type="textarea"
            value={data.subject_frequented_places}
            onChange={onChange}
            placeholder="Bars, restaurants, gyms, churches, stores, country clubs..."
            rows={3}
          />
          <FormField
            label="Time Away from Home"
            name="subject_time_away"
            value={data.subject_time_away}
            onChange={onChange}
            placeholder="How often and for how long?"
            helper="Frequency and duration of absences from home."
          />
        </div>
      </FormCard>
    </div>
  );
}