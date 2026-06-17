import FormCard from "./FormCard";
import FormField from "./FormField";
import { Shield, Users, Building2, Radio, Search, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const CASE_TYPES = [
  { value: "infidelity", label: "Infidelity / Domestic", icon: Users, desc: "Suspected unfaithfulness, domestic concerns" },
  { value: "child_custody", label: "Child Custody / Welfare", icon: Shield, desc: "Custody violations, child safety concerns" },
  { value: "corporate", label: "Corporate / Business", icon: Building2, desc: "Employee misconduct, corporate intelligence" },
  { value: "surveillance", label: "General Surveillance", icon: Search, desc: "Monitoring, tracking, observation" },
  { value: "tscm", label: "Bug Sweep / TSCM", icon: Radio, desc: "Electronic surveillance detection" },
  { value: "background", label: "Background Check", icon: Shield, desc: "Personal or professional vetting" },
  { value: "other", label: "Other Investigation", icon: FileQuestion, desc: "Something not listed here" },
];

const URGENCY_OPTIONS = [
  { value: "standard", label: "Standard — within the next few weeks" },
  { value: "urgent", label: "Urgent — within the next few days" },
  { value: "emergency", label: "Emergency — immediate attention needed" },
];

export default function StepCaseType({ data, onChange }) {
  const handleCaseType = (value) => {
    onChange({ target: { name: "case_type", value } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          How can we help?
        </h2>
        <p className="text-muted-foreground">
          Select the type of investigation you're looking for. All information is treated with complete discretion.
        </p>
      </div>

      <FormCard title="Type of Investigation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CASE_TYPES.map((caseType) => {
            const Icon = caseType.icon;
            const isSelected = data.case_type === caseType.value;
            return (
              <button
                key={caseType.value}
                type="button"
                onClick={() => handleCaseType(caseType.value)}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl border transition-all text-left",
                  isSelected
                    ? "bg-primary/10 border-primary/50 ring-1 ring-primary/30"
                    : "bg-secondary/30 border-border hover:border-primary/30 hover:bg-secondary/50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className={cn("font-medium text-sm", isSelected ? "text-foreground" : "text-foreground")}>
                    {caseType.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{caseType.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </FormCard>

      <FormCard title="How urgent is this matter?" description="This helps us prioritize your case appropriately.">
        <FormField
          name="urgency"
          type="radio"
          value={data.urgency}
          onChange={onChange}
          options={URGENCY_OPTIONS}
        />
      </FormCard>

      {data.urgency === "emergency" && (
        <FormCard>
          <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <Shield className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Emergency Requests</p>
              <p className="text-xs text-muted-foreground mt-1">
                For immediate threats, please also call our office directly. Emergency cases may require additional fees and coordination.
              </p>
            </div>
          </div>
        </FormCard>
      )}
    </div>
  );
}