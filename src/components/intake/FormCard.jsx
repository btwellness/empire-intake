import { cn } from "@/lib/utils";

export default function FormCard({ children, className, title, description }) {
  return (
    <div className={cn(
      "bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg shadow-black/20",
      className
    )}>
      {title && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}