import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save, Send, Shield } from "lucide-react";
import { toast } from "sonner";

import ProgressBar from "../components/intake/ProgressBar";
import StepCaseType from "../components/intake/StepCaseType";
import StepClientInfo from "../components/intake/StepClientInfo";
import StepSubjectInfo from "../components/intake/StepSubjectInfo";
import StepRelationships from "../components/intake/StepRelationships";
import StepEmployment from "../components/intake/StepEmployment";
import StepBehavior from "../components/intake/StepBehavior";
import StepEvents from "../components/intake/StepEvents";
import StepGoals from "../components/intake/StepGoals";
import StepReview from "../components/intake/StepReview";


const TOTAL_STEPS = 9;

const INITIAL_DATA = {
  status: "draft",
  case_type: "",
  urgency: "",
  client_name: "",
  client_phone: "",
  client_email: "",
  client_address: "",
  client_city: "",
  client_state: "",
  client_zip: "",
  client_relationship: "",
  preferred_contact: "",
  safe_contact_times: "",
  subject_name: "",
  subject_nicknames: "",
  subject_phone: "",
  subject_address: "",
  subject_city: "",
  subject_state: "",
  subject_zip: "",
  lights_on_timer: "",
  other_residents: "",
  dog_at_location: "",
  dog_details: "",
  subject_gender: "",
  subject_age: "",
  subject_dob: "",
  subject_height: "",
  subject_weight: "",
  subject_hair_color: "",
  subject_skin_tone: "",
  subject_facial_hair: "",
  subject_glasses: "",
  subject_identifying_features: "",
  vehicle_make_model: "",
  vehicle_color: "",
  vehicle_plate: "",
  vehicle_year: "",
  vehicle_identifiers: "",
  vehicle_co_own: "",
  subject_friends: [],
  subject_children: [],
  opposite_sex_relatives: "",
  work_name: "",
  work_address: "",
  work_city: "",
  work_state: "",
  work_zip: "",
  work_phone: "",
  work_days: "",
  work_hours: "",
  work_job_title: "",
  subject_parking: "",
  subject_lunch: "",
  subject_hobbies: "",
  subject_rec_vehicles: "",
  subject_weekend_routine: "",
  subject_frequented_places: "",
  subject_time_away: "",
  upcoming_events: "",
  outings_frequency: "",
  outings_details: "",
  hs_reunion: "",
  hs_reunion_date: "",
  college_reunion: "",
  college_reunion_date: "",
  prior_surveillance: "",
  prior_surveillance_when: "",
  prior_surveillance_results: "",
  prior_surveillance_who: "",
  subject_seeing_someone: "",
  suspicious_behavior: "",
  suspicious_times_where: "",
  hiding_phone_bills: "",
  staying_late_work: "",
  secretive_devices: "",
  travel_plans: "",
  info_to_find: "",
  plan_for_info: "",
  has_evidence: "",
  evidence_files: [],
  additional_notes: "",
  consent_acknowledged: false,
  current_step: 1,
};

export default function IntakeForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [submissionId, setSubmissionId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Check for draft from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const draftId = params.get("draft");
    if (draftId) {
      loadDraft(draftId);
    }
  }, []);

  const loadDraft = async (id) => {
    const submissions = await base44.entities.IntakeSubmission.filter({ id });
    if (submissions.length > 0) {
      const draft = submissions[0];
      setFormData({ ...INITIAL_DATA, ...draft });
      setSubmissionId(draft.id);
      setCurrentStep(draft.current_step || 1);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const saveDraft = async () => {
    setSaving(true);
    const saveData = { ...formData, current_step: currentStep, status: "draft" };
    // Remove id and built-in fields before saving
    delete saveData.id;
    delete saveData.created_date;
    delete saveData.updated_date;
    delete saveData.created_by;

    if (submissionId) {
      await base44.entities.IntakeSubmission.update(submissionId, saveData);
    } else {
      const created = await base44.entities.IntakeSubmission.create(saveData);
      setSubmissionId(created.id);
    }
    setSaving(false);
    toast.success("Draft saved securely");
  };

  const handleSubmit = async () => {
    if (!formData.consent_acknowledged) {
      toast.error("Please acknowledge the confidentiality agreement before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const submitData = { ...formData, status: "submitted", current_step: TOTAL_STEPS };
      delete submitData.id;
      delete submitData.created_date;
      delete submitData.updated_date;
      delete submitData.created_by;

      submitData.internal_summary = generateSummary(formData);

      if (submissionId) {
        await base44.entities.IntakeSubmission.update(submissionId, submitData);
      } else {
        const created = await base44.entities.IntakeSubmission.create(submitData);
        setSubmissionId(created.id);
      }
      navigate("/thank-you");
    } catch (err) {
      toast.error("Submission failed: " + (err?.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  const generateSummary = (d) => {
    const lines = [];
    lines.push(`CASE TYPE: ${d.case_type || "Not specified"}`);
    lines.push(`URGENCY: ${d.urgency || "Not specified"}`);
    lines.push(`CLIENT: ${d.client_name || "Unknown"} | ${d.client_phone || ""} | ${d.client_email || ""}`);
    lines.push(`RELATIONSHIP: ${d.client_relationship || "Not specified"}`);
    lines.push(`SUBJECT: ${d.subject_name || "Unknown"}`);
    lines.push(`SUBJECT ADDRESS: ${[d.subject_address, d.subject_city, d.subject_state].filter(Boolean).join(", ") || "Not provided"}`);
    lines.push(`SUBJECT VEHICLE: ${[d.vehicle_make_model, d.vehicle_color, d.vehicle_plate].filter(Boolean).join(", ") || "Not provided"}`);
    lines.push(`EMPLOYER: ${d.work_name || "Not provided"}`);
    lines.push(`INFORMATION SOUGHT: ${d.info_to_find || "Not specified"}`);
    lines.push(`INTENDED USE: ${d.plan_for_info || "Not specified"}`);
    lines.push(`EVIDENCE: ${d.evidence_files?.length ? `${d.evidence_files.length} file(s)` : "None"}`);

    const redFlags = [];
    if (d.hiding_phone_bills === "yes") redFlags.push("Hiding phone/bills");
    if (d.staying_late_work === "yes") redFlags.push("Staying late at work");
    if (d.secretive_devices === "yes") redFlags.push("Secretive with devices");
    if (d.suspicious_behavior === "yes") redFlags.push("Suspicious behavior reported");
    lines.push(`RED FLAGS: ${redFlags.length ? redFlags.join(", ") : "None noted"}`);

    return lines.join("\n");
  };

  const nextStep = () => {
    if (currentStep === 8 && !formData.consent_acknowledged) {
      toast.error("Please acknowledge the confidentiality agreement before continuing.");
      return;
    }
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Sticky Progress */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ProgressBar currentStep={currentStep} />
        </div>
      </div>

      {/* Form Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {currentStep === 1 && <StepCaseType data={formData} onChange={handleChange} />}
        {currentStep === 2 && <StepClientInfo data={formData} onChange={handleChange} />}
        {currentStep === 3 && <StepSubjectInfo data={formData} onChange={handleChange} />}
        {currentStep === 4 && <StepRelationships data={formData} onChange={handleChange} />}
        {currentStep === 5 && <StepEmployment data={formData} onChange={handleChange} />}
        {currentStep === 6 && <StepBehavior data={formData} onChange={handleChange} />}
        {currentStep === 7 && <StepEvents data={formData} onChange={handleChange} />}
        {currentStep === 8 && <StepGoals data={formData} onChange={handleChange} />}
        {currentStep === 9 && <StepReview data={formData} onEditStep={goToStep} />}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <div>
            {currentStep > 1 && (
              <Button
                variant="ghost"
                onClick={prevStep}
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={saveDraft}
              disabled={saving}
              className="border-border text-foreground hover:bg-secondary"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Draft"}
            </Button>

            {currentStep < TOTAL_STEPS ? (
              <Button
                onClick={nextStep}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="w-4 h-4 mr-2" />
                {submitting ? "Submitting..." : "Submit Securely"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">Empire Investigation</h1>
            <p className="text-xs text-muted-foreground">Confidential Intake</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Secure & Encrypted
        </div>
      </div>
    </header>
  );
}