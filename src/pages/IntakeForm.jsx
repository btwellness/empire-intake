import { useState, useEffect, useCallback, useMemo } from "react";
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
import StepCustody from "../components/intake/StepCustody";
import StepReview from "../components/intake/StepReview";

// Define which step components appear for each case type (after the initial CaseType step)
const FLOW_DEFINITIONS = {
  infidelity: [
    { id: "client_info",   label: "Your Info",     component: "StepClientInfo" },
    { id: "subject_info",  label: "Subject",        component: "StepSubjectInfo" },
    { id: "relationships", label: "Relationships",  component: "StepRelationships" },
    { id: "employment",    label: "Employment",     component: "StepEmployment" },
    { id: "behavior",      label: "Behavior",       component: "StepBehavior" },
    { id: "events",        label: "Events",         component: "StepEvents" },
    { id: "goals",         label: "Goals",          component: "StepGoals" },
    { id: "review",        label: "Review",         component: "StepReview" },
  ],
  child_custody: [
    { id: "client_info",   label: "Your Info",     component: "StepClientInfo" },
    { id: "custody",       label: "Custody Case",  component: "StepCustody" },
    { id: "employment",    label: "Employment",    component: "StepEmployment" },
    { id: "goals",         label: "Goals",         component: "StepGoals" },
    { id: "review",        label: "Review",        component: "StepReview" },
  ],
  corporate: [
    { id: "client_info",  label: "Your Info",    component: "StepClientInfo" },
    { id: "subject_info", label: "Subject",       component: "StepSubjectInfo" },
    { id: "employment",   label: "Employment",    component: "StepEmployment" },
    { id: "goals",        label: "Goals",         component: "StepGoals" },
    { id: "review",       label: "Review",        component: "StepReview" },
  ],
  default: [
    { id: "client_info",  label: "Your Info",  component: "StepClientInfo" },
    { id: "subject_info", label: "Subject",     component: "StepSubjectInfo" },
    { id: "goals",        label: "Goals",       component: "StepGoals" },
    { id: "review",       label: "Review",      component: "StepReview" },
  ],
};

function getFlow(caseType) {
  return FLOW_DEFINITIONS[caseType] || FLOW_DEFINITIONS.default;
}

const STEP_COMPONENTS = {
  StepClientInfo,
  StepSubjectInfo,
  StepRelationships,
  StepEmployment,
  StepBehavior,
  StepEvents,
  StepGoals,
  StepCustody,
  StepReview,
};

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
  client_attorney_name: "",
  client_court_case_number: "",
  preferred_contact: "",
  safe_contact_times: "",
  subject_name: "",
  subject_nicknames: "",
  subject_phone: "",
  subject_ssn_last4: "",
  subject_social_media: "",
  subject_photo_available: "",
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
  vehicle2_make_model: "",
  vehicle2_color: "",
  vehicle2_plate: "",
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
  new_passwords: "",
  burner_phones: "",
  unexplained_spending: "",
  new_wardrobe: "",
  changed_sleeping_habits: "",
  affair_partner_name: "",
  affair_partner_address: "",
  affair_partner_employer: "",
  affair_partner_vehicle: "",
  affair_meeting_locations: [],
  travel_plans: "",
  // Child location
  custody_child_prior_residence: "",
  custody_last_contact: "",
  custody_immediate_danger: "",
  custody_immediate_danger_details: "",
  custody_child_current_location: "",
  custody_child_with_whom: "",
  custody_child_sighting: "",
  custody_subject_stated_location: "",
  custody_subject_stated_location_details: "",
  custody_possible_locations: "",
  // Subject
  custody_subject_name: "",
  custody_subject_dob: "",
  custody_subject_relationship: "",
  custody_subject_relationship_to_client: "",
  custody_subject_last_address: "",
  custody_subject_address: "",
  custody_subject_phone: "",
  custody_subject_employer: "",
  custody_subject_vehicle: "",
  custody_subject_social_media: "",
  custody_subject_why: "",
  // New partner
  custody_partner_name: "",
  custody_partner_details: "",
  custody_partner_how_learned: "",
  custody_partner_contacted_you: "",
  custody_partner_child_living_with: "",
  custody_partner_safety_concerns: "",
  // Temporary agreement
  custody_exchange_date: "",
  custody_return_date: "",
  custody_exchange_location: "",
  custody_exchange_reason: "",
  custody_exchange_agreed_temp: "",
  custody_exchange_condition: "",
  custody_exchange_relocation_agreed: "",
  // Refusal to return
  custody_refusal_date: "",
  custody_refusal_statement: "",
  custody_refusal_threatened_no_return: "",
  custody_refusal_contact_allowed: "",
  custody_refusal_blocked: "",
  custody_refusal_threats: "",
  custody_refusal_threats_details: "",
  // Criminal history
  custody_criminal_felony: "",
  custody_criminal_felony_details: "",
  custody_criminal_child_related: "",
  custody_on_probation: "",
  custody_probation_officer: "",
  custody_probation_restrictions: "",
  custody_cps_history: "",
  custody_cps_history_details: "",
  custody_other_safety_issues: "",
  // Steps taken
  custody_called_police: "",
  custody_police_response: "",
  custody_called_cps: "",
  custody_cps_response: "",
  custody_welfare_check: "",
  custody_welfare_check_results: "",
  custody_child_location_tip: "",
  // Court
  custody_divorced: "",
  custody_visitation_schedule: "",
  custody_contact_restrictions: "",
  custody_child_names: "",
  custody_child_dobs: "",
  custody_child_ages: "",
  custody_schools: "",
  custody_daycare: "",
  custody_activities: "",
  custody_medical: "",
  custody_arrangement: "",
  custody_transport: "",
  custody_concerns: [],
  custody_safety_details: "",
  custody_drug_users: "",
  custody_weapons: "",
  custody_avoid_persons: "",
  custody_missed_exchanges: "",
  custody_school_neglect: "",
  custody_alienation: "",
  custody_coaching: "",
  custody_conduct_notes: "",
  custody_violations: [],
  custody_violations_explain: "",
  custody_court_name: "",
  custody_case_number: "",
  custody_judge: "",
  custody_attorneys: "",
  custody_hearings: "",
  custody_emergency_petitions: "",
  custody_existing_orders: "",
  custody_desired_outcome: "",
  info_to_find: "",
  plan_for_info: "",
  has_evidence: "",
  evidence_files: [],
  additional_notes: "",
  consent_acknowledged: false,
  current_step: 1,
};

const LOCAL_KEY = "empire_intake_draft";
const LOCAL_TTL = 24 * 60 * 60 * 1000; // 24 hours

function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return null;
    const { data, step, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > LOCAL_TTL) {
      localStorage.removeItem(LOCAL_KEY);
      return null;
    }
    return { data, step };
  } catch {
    return null;
  }
}

function saveLocal(data, step) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ data, step, savedAt: Date.now() }));
  } catch {}
}

function clearLocal() {
  try { localStorage.removeItem(LOCAL_KEY); } catch {}
}

export default function IntakeForm() {
  const navigate = useNavigate();
  // step 1 = case type selection; step 2+ = flow steps (1-indexed into the flow array)
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [submissionId, setSubmissionId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showConsentWarning, setShowConsentWarning] = useState(false);

  const flow = useMemo(() => getFlow(formData.case_type), [formData.case_type]);
  // Total steps = 1 (case type) + flow steps
  const totalSteps = 1 + flow.length;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const draftId = params.get("draft");
    if (draftId) {
      loadDraft(draftId);
    } else {
      const local = loadLocal();
      if (local) {
        setFormData({ ...INITIAL_DATA, ...local.data });
        setCurrentStep(local.step || 1);
        toast.info("Your previous session has been restored.");
      }
    }
  }, []);

  // Auto-save to localStorage whenever formData or step changes
  useEffect(() => {
    saveLocal(formData, currentStep);
  }, [formData, currentStep]);

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

  const handleCaseTypeChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const saveToBackend = async (data, id) => {
    const res = await base44.functions.invoke("saveIntake", { submissionId: id || null, data });
    // SDK returns axios response — handle both res.data and res directly
    const result = res?.data ?? res;
    if (!result?.id) throw new Error("No ID returned from server");
    return result.id;
  };

  const saveDraft = async () => {
    setSaving(true);
    try {
      const saveData = { ...formData, current_step: currentStep, status: "draft" };
      delete saveData.id;
      delete saveData.created_date;
      delete saveData.updated_date;
      delete saveData.created_by;

      const id = await saveToBackend(saveData, submissionId);
      if (!submissionId) setSubmissionId(id);
      toast.success("Draft saved securely");
    } catch (err) {
      console.error("Save draft error:", err);
      alert("Save failed: " + (err?.message || "Unknown error. Check console."));
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.consent_acknowledged) {
      toast.error("Please acknowledge the confidentiality agreement before submitting.");
      setShowConsentWarning(true);
      return;
    }
    setSubmitting(true);
    try {
      const submitData = { ...formData, status: "submitted", current_step: totalSteps };
      delete submitData.id;
      delete submitData.created_date;
      delete submitData.updated_date;
      delete submitData.created_by;
      submitData.internal_summary = generateSummary(formData);

      const finalId = await saveToBackend(submitData, submissionId);
      if (!submissionId) setSubmissionId(finalId);

      base44.functions.invoke("pushToNotion", { submissionId: finalId }).catch((e) =>
        console.warn("Notion mirror failed:", e)
      );
      clearLocal();
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
    if (d.case_type === "child_custody") {
      lines.push(`INVESTIGATED PARTY: ${d.custody_subject_name || "Unknown"}`);
      lines.push(`CHILD(REN): ${d.custody_child_names || "Not provided"}`);
      lines.push(`CUSTODY ARRANGEMENT: ${d.custody_arrangement || "Not provided"}`);
    } else {
      lines.push(`SUBJECT: ${d.subject_name || "Unknown"}`);
      lines.push(`SUBJECT ADDRESS: ${[d.subject_address, d.subject_city, d.subject_state].filter(Boolean).join(", ") || "Not provided"}`);
      lines.push(`EMPLOYER: ${d.work_name || "Not provided"}`);
    }
    lines.push(`INFORMATION SOUGHT: ${d.info_to_find || "Not specified"}`);
    lines.push(`EVIDENCE: ${d.evidence_files?.length ? `${d.evidence_files.length} file(s)` : "None"}`);
    return lines.join("\n");
  };

  const nextStep = () => {
    // On the goals step (second to last), enforce consent
    const goalsStepIndex = flow.findIndex(s => s.component === "StepGoals");
    const goalsAbsoluteStep = goalsStepIndex >= 0 ? goalsStepIndex + 2 : -1;
    if (currentStep === goalsAbsoluteStep && !formData.consent_acknowledged) {
      setShowConsentWarning(true);
      return;
    }
    if (currentStep < totalSteps) {
      const next = currentStep + 1;
      setCurrentStep(next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render the current step component
  const renderStep = () => {
    if (currentStep === 1) {
      return <StepCaseType data={formData} onChange={handleCaseTypeChange} />;
    }
    const flowStep = flow[currentStep - 2]; // -2 because step 1 is case type
    if (!flowStep) return null;
    const Component = STEP_COMPONENTS[flowStep.component];
    if (!Component) return null;

    if (flowStep.component === "StepGoals") {
      return (
        <Component
          data={formData}
          onChange={handleChange}
          showConsentWarning={showConsentWarning}
          onWarningSeen={() => setShowConsentWarning(false)}
        />
      );
    }
    if (flowStep.component === "StepReview") {
      return <Component data={formData} onEditStep={goToStep} />;
    }
    return <Component data={formData} onChange={handleChange} />;
  };

  // Build step labels for progress bar
  const progressSteps = useMemo(() => [
    { id: 1, label: "Case Type" },
    ...flow.map((s, i) => ({ id: i + 2, label: s.label })),
  ], [flow]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ProgressBar currentStep={currentStep} steps={progressSteps} />
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {renderStep()}

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

            {currentStep < totalSteps ? (
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