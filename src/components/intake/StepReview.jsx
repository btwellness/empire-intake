import { Shield, User, Users, Briefcase, Eye, Calendar, Target, CheckCircle } from "lucide-react";
import FormCard from "./FormCard";
import { cn } from "@/lib/utils";

const CASE_TYPE_LABELS = {
  infidelity: "Infidelity / Domestic",
  corporate: "Corporate / Business",
  surveillance: "General Surveillance",
  tscm: "Bug Sweep / TSCM",
  background: "Background Check",
  other: "Other Investigation",
};

const URGENCY_LABELS = {
  standard: "Standard",
  urgent: "Urgent",
  emergency: "Emergency",
};

function ReviewSection({ icon: Icon, title, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      <div className="ml-11 space-y-2">
        {children}
      </div>
    </div>
  );
}

function ReviewItem({ label, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  const displayValue = Array.isArray(value) 
    ? value.map((v, i) => typeof v === 'object' ? v.name : v).join(", ")
    : value;

  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-1.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground min-w-[180px] flex-shrink-0">{label}</span>
      <span className="text-sm text-foreground break-words">{String(displayValue)}</span>
    </div>
  );
}

export default function StepReview({ data }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Review Your Submission
        </h2>
        <p className="text-muted-foreground">
          Please review all information carefully before submitting. You can go back to any section to make changes.
        </p>
      </div>

      <FormCard className="divide-y divide-border/50 space-y-6 [&>*+*]:pt-6">
        <ReviewSection icon={Shield} title="Case Details">
          <ReviewItem label="Case Type" value={CASE_TYPE_LABELS[data.case_type]} />
          <ReviewItem label="Urgency" value={URGENCY_LABELS[data.urgency]} />
        </ReviewSection>

        <ReviewSection icon={User} title="Your Information">
          <ReviewItem label="Name" value={data.client_name} />
          <ReviewItem label="Phone" value={data.client_phone} />
          <ReviewItem label="Email" value={data.client_email} />
          <ReviewItem label="Address" value={[data.client_address, data.client_city, data.client_state, data.client_zip].filter(Boolean).join(", ")} />
          <ReviewItem label="Preferred Contact" value={data.preferred_contact} />
          <ReviewItem label="Safe Contact Times" value={data.safe_contact_times} />
          <ReviewItem label="Relationship to Subject" value={data.client_relationship} />
        </ReviewSection>

        <ReviewSection icon={Eye} title="Subject Information">
          <ReviewItem label="Name" value={data.subject_name} />
          <ReviewItem label="Nicknames" value={data.subject_nicknames} />
          <ReviewItem label="Phone" value={data.subject_phone} />
          <ReviewItem label="Address" value={[data.subject_address, data.subject_city, data.subject_state, data.subject_zip].filter(Boolean).join(", ")} />
          <ReviewItem label="Gender" value={data.subject_gender} />
          <ReviewItem label="Age" value={data.subject_age} />
          <ReviewItem label="DOB" value={data.subject_dob} />
          <ReviewItem label="Height" value={data.subject_height} />
          <ReviewItem label="Weight" value={data.subject_weight} />
          <ReviewItem label="Hair Color" value={data.subject_hair_color} />
          <ReviewItem label="Skin Tone" value={data.subject_skin_tone} />
          <ReviewItem label="Identifying Features" value={data.subject_identifying_features} />
          <ReviewItem label="Vehicle" value={[data.vehicle_make_model, data.vehicle_color, data.vehicle_year].filter(Boolean).join(", ")} />
          <ReviewItem label="License Plate" value={data.vehicle_plate} />
        </ReviewSection>

        <ReviewSection icon={Users} title="Relationships & Associates">
          <ReviewItem label="Friends/Colleagues" value={data.subject_friends} />
          <ReviewItem label="Children" value={data.subject_children} />
          <ReviewItem label="Persons of Concern" value={data.opposite_sex_relatives} />
        </ReviewSection>

        <ReviewSection icon={Briefcase} title="Employment & Lifestyle">
          <ReviewItem label="Employer" value={data.work_name} />
          <ReviewItem label="Work Address" value={[data.work_address, data.work_city, data.work_state].filter(Boolean).join(", ")} />
          <ReviewItem label="Schedule" value={[data.work_days, data.work_hours].filter(Boolean).join(", ")} />
          <ReviewItem label="Job Title" value={data.work_job_title} />
          <ReviewItem label="Hobbies" value={data.subject_hobbies} />
          <ReviewItem label="Frequented Places" value={data.subject_frequented_places} />
          <ReviewItem label="Weekend Routine" value={data.subject_weekend_routine} />
        </ReviewSection>

        <ReviewSection icon={Eye} title="Surveillance & Behavior">
          <ReviewItem label="Prior Surveillance" value={data.prior_surveillance} />
          {data.prior_surveillance === "yes" && (
            <>
              <ReviewItem label="Prior Results" value={data.prior_surveillance_results} />
              <ReviewItem label="Conducted By" value={data.prior_surveillance_who} />
            </>
          )}
          <ReviewItem label="Suspected Contacts" value={data.subject_seeing_someone} />
          <ReviewItem label="Hiding Bills" value={data.hiding_phone_bills} />
          <ReviewItem label="Staying Late" value={data.staying_late_work} />
          <ReviewItem label="Secretive w/ Devices" value={data.secretive_devices} />
        </ReviewSection>

        <ReviewSection icon={Calendar} title="Social Events & Travel">
          <ReviewItem label="Upcoming Events" value={data.upcoming_events} />
          <ReviewItem label="Outings Frequency" value={data.outings_frequency} />
          <ReviewItem label="Travel Plans" value={data.travel_plans} />
          <ReviewItem label="HS Reunion" value={data.hs_reunion === "yes" ? `Yes — ${data.hs_reunion_date || "Date TBD"}` : data.hs_reunion} />
          <ReviewItem label="College Reunion" value={data.college_reunion === "yes" ? `Yes — ${data.college_reunion_date || "Date TBD"}` : data.college_reunion} />
        </ReviewSection>

        <ReviewSection icon={Target} title="Goals & Evidence">
          <ReviewItem label="Information Sought" value={data.info_to_find} />
          <ReviewItem label="Intended Use" value={data.plan_for_info} />
          <ReviewItem label="Evidence Uploaded" value={data.evidence_files?.length ? `${data.evidence_files.length} file(s)` : "None"} />
          <ReviewItem label="Additional Notes" value={data.additional_notes} />
          <ReviewItem label="Consent" value={data.consent_acknowledged ? "Acknowledged" : "Not yet acknowledged"} />
        </ReviewSection>
      </FormCard>

      <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
        <p className="text-sm text-foreground">
          Once submitted, your information will be reviewed discreetly by our team. We'll reach out using your preferred contact method within 24 hours.
        </p>
      </div>
    </div>
  );
}