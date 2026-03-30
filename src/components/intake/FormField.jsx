import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  helper,
  required,
  options = [],
  error,
  className,
  rows = 4,
  disabled,
}) {
  const baseInputClasses = "bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary transition-all";

  const handleChange = (val) => {
    onChange({ target: { name, value: val } });
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-foreground flex items-center gap-1">
          {label}
          {required && <span className="text-primary">*</span>}
        </Label>
      )}

      {type === "text" && (
        <Input
          id={name}
          name={name}
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className={cn(baseInputClasses, "h-12")}
          disabled={disabled}
        />
      )}

      {type === "email" && (
        <Input
          id={name}
          name={name}
          type="email"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className={cn(baseInputClasses, "h-12")}
          disabled={disabled}
        />
      )}

      {type === "tel" && (
        <Input
          id={name}
          name={name}
          type="tel"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className={cn(baseInputClasses, "h-12")}
          disabled={disabled}
        />
      )}

      {type === "date" && (
        <Input
          id={name}
          name={name}
          type="date"
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          className={cn(baseInputClasses, "h-12")}
          disabled={disabled}
        />
      )}

      {type === "textarea" && (
        <Textarea
          id={name}
          name={name}
          value={value || ""}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className={cn(baseInputClasses, "min-h-[100px] resize-y")}
          rows={rows}
          disabled={disabled}
        />
      )}

      {type === "select" && (
        <Select value={value || ""} onValueChange={handleChange} disabled={disabled}>
          <SelectTrigger className={cn(baseInputClasses, "h-12")}>
            <SelectValue placeholder={placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-foreground focus:bg-secondary">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {type === "radio" && (
        <RadioGroup value={value || ""} onValueChange={handleChange} className="flex flex-wrap gap-4" disabled={disabled}>
          {options.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={opt.value} 
                id={`${name}-${opt.value}`}
                className="border-border text-primary"
              />
              <Label 
                htmlFor={`${name}-${opt.value}`} 
                className="text-sm text-foreground cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      {type === "checkbox" && (
        <div className="flex items-start space-x-3">
          <Checkbox
            id={name}
            checked={value || false}
            onCheckedChange={handleChange}
            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
            disabled={disabled}
          />
          <Label htmlFor={name} className="text-sm text-foreground cursor-pointer leading-relaxed">
            {placeholder}
          </Label>
        </div>
      )}

      {helper && !error && (
        <p className="text-xs text-muted-foreground">{helper}</p>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}