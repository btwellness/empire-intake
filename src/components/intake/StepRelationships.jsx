import FormCard from "./FormCard";
import FormField from "./FormField";
import DynamicList from "./DynamicList";

export default function StepRelationships({ data, onChange }) {
  const handleListChange = (name, items) => {
    onChange({ target: { name, value: items } });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Relationships & Associates
        </h2>
        <p className="text-muted-foreground">
          Understanding the subject's social circle helps build a complete picture. Include as many details as you're comfortable sharing.
        </p>
      </div>

      <FormCard
        title="Close Friends & Work Colleagues"
        description="Names, addresses, and phone numbers if available."
      >
        <DynamicList
          items={data.subject_friends || []}
          onChange={(items) => handleListChange("subject_friends", items)}
          placeholder="Name, relationship, and contact info if known"
          addLabel="Add another person"
          helper="Include anyone the subject spends significant time with."
        />
      </FormCard>

      <FormCard
        title="Subject's Children"
        description="Name, age, and who they live with."
      >
        <DynamicList
          items={data.subject_children || []}
          onChange={(items) => handleListChange("subject_children", items)}
          placeholder="Child's name, age, custody arrangement"
          addLabel="Add another child"
          helper="This helps us understand family dynamics and scheduling patterns."
        />
      </FormCard>

      <FormCard
        title="Persons of Concern"
        description="Are there any individuals the subject spends time with that concern you?"
      >
        <FormField
          label="Relatives or acquaintances of the opposite sex that concern you"
          name="opposite_sex_relatives"
          type="textarea"
          value={data.opposite_sex_relatives}
          onChange={onChange}
          placeholder="Names and any details about the relationship or interactions you've observed"
          rows={4}
          helper="We treat this information with the utmost discretion."
        />
      </FormCard>
    </div>
  );
}