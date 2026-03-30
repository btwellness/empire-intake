import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DynamicList({
  label,
  items = [],
  onChange,
  placeholder = "Enter item...",
  addLabel = "Add Another",
  helper,
  maxItems = 10,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() && items.length < maxItems) {
      onChange([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      {/* Existing Items */}
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-secondary/50 border border-border rounded-lg group"
            >
              <span className="flex-1 text-sm text-foreground">{item}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-50 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => handleRemove(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Item */}
      {items.length < maxItems && (
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 h-12 bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAdd}
            disabled={!inputValue.trim()}
            className="h-12 px-4 border-border hover:bg-secondary hover:text-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      )}

      {helper && (
        <p className="text-xs text-muted-foreground">{helper}</p>
      )}
    </div>
  );
}