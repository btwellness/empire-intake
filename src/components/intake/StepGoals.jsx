import FormCard from "./FormCard";
import FormField from "./FormField";
import FileUpload from "./FileUpload";

const YES_NO = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export default function StepGoals({ data, onChange }) {
  const handleFilesChange = (files) => {
    onChange({ target: { name: "evidence_files", value: files } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Goals & Supporting Information
        </h2>
        <p className="text-muted-foreground">
          Tell us what you're hoping to learn and share any materials that might help our team move quickly.
        </p>
      </div>

      <FormCard title="What Would You Like Us to Find Out?" description="Give us the clearest version of what you're looking for.">
        <div className="space-y-5">
          <FormField
            label="Information you want us to uncover"
            name="info_to_find"
            type="textarea"
            value={data.info_to_find}
            onChange={onChange}
            placeholder="Describe what you're hoping to learn from this investigation..."
            rows={5}
            required
            helper="Be as specific as possible — this shapes our entire approach."
          />

          <FormField
            label="What do you plan to do with this information?"
            name="plan_for_info"
            type="textarea"
            value={data.plan_for_info}
            onChange={onChange}
            placeholder="e.g., Legal proceedings, personal peace of mind, custody case..."
            rows={3}
            helper="This helps us understand the level of documentation needed."
          />
        </div>
      </FormCard>

      <FormCard title="Supporting Evidence & Documents" description="Upload anything that may help our team assess the matter faster.">
        <div className="space-y-5">
          <FormField
            label="Do you have any evidence or documents to share?"
            name="has_evidence"
            type="radio"
            value={data.has_evidence}
            onChange={onChange}
            options={YES_NO}
          />

          {data.has_evidence === "yes" && (
            <FileUpload
              label="Upload Files"
              files={data.evidence_files || []}
              onChange={handleFilesChange}
              helper="Photos, screenshots, text messages, documents, videos — anything relevant."
              accept="image/*,application/pdf,video/*,.doc,.docx,.txt"
            />
          )}
        </div>
      </FormCard>

      <FormCard title="Additional Notes" description="Anything else we should know?">
        <FormField
          name="additional_notes"
          type="textarea"
          value={data.additional_notes}
          onChange={onChange}
          placeholder="Any other details, concerns, or context that may be helpful for our team..."
          rows={5}
        />
      </FormCard>

      <FormCard>
        <FormField
          name="consent_acknowledged"
          type="checkbox"
          value={data.consent_acknowledged}
          onChange={onChange}
          placeholder="I understand that all information provided will be treated as confidential and used solely for the purpose of this investigation. I acknowledge that Empire Investigation LLC operates within the bounds of applicable laws and regulations."
          required
        />
      </FormCard>
    </div>
  );
}