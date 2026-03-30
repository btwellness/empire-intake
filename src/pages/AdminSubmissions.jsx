import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Clock, AlertTriangle, CheckCircle, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  draft: { label: "Draft", color: "text-muted-foreground", bg: "bg-secondary", icon: FileText },
  submitted: { label: "Submitted", color: "text-primary", bg: "bg-primary/10", icon: Clock },
  under_review: { label: "Under Review", color: "text-blue-400", bg: "bg-blue-500/10", icon: Eye },
  assigned: { label: "Assigned", color: "text-green-400", bg: "bg-green-500/10", icon: CheckCircle },
};

const URGENCY_CONFIG = {
  standard: { label: "Standard", color: "text-muted-foreground" },
  urgent: { label: "Urgent", color: "text-yellow-400" },
  emergency: { label: "Emergency", color: "text-red-400" },
};

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const data = await base44.entities.IntakeSubmission.list("-created_date", 100);
    setSubmissions(data);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await base44.entities.IntakeSubmission.update(id, { status });
    loadSubmissions();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Staff Dashboard</h1>
              <p className="text-xs text-muted-foreground">Intake Submissions</p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{submissions.length} total submissions</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {submissions.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => {
              const statusCfg = STATUS_CONFIG[sub.status] || STATUS_CONFIG.draft;
              const urgencyCfg = URGENCY_CONFIG[sub.urgency] || URGENCY_CONFIG.standard;
              const isExpanded = expandedId === sub.id;
              const StatusIcon = statusCfg.icon;

              return (
                <div key={sub.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  {/* Summary Row */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                    className="w-full flex items-center gap-4 p-4 md:p-5 text-left hover:bg-secondary/30 transition-colors"
                  >
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", statusCfg.bg)}>
                      <StatusIcon className={cn("w-4 h-4", statusCfg.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-foreground">{sub.client_name || "Unknown Client"}</span>
                        <span className="text-xs text-muted-foreground">→</span>
                        <span className="text-sm text-muted-foreground">{sub.subject_name || "Unknown Subject"}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground capitalize">{sub.case_type || "Unspecified"}</span>
                        <span className={cn("text-xs font-medium", urgencyCfg.color)}>{urgencyCfg.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {sub.created_date ? new Date(sub.created_date).toLocaleDateString() : ""}
                        </span>
                      </div>
                    </div>

                    <div className={cn("px-3 py-1 rounded-full text-xs font-medium", statusCfg.bg, statusCfg.color)}>
                      {statusCfg.label}
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="border-t border-border p-4 md:p-6 space-y-6">
                      {/* Quick Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(sub.id, "under_review")}
                          className="border-border text-foreground text-xs"
                        >
                          Mark Under Review
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(sub.id, "assigned")}
                          className="border-border text-foreground text-xs"
                        >
                          Mark Assigned
                        </Button>
                      </div>

                      {/* Internal Summary */}
                      {sub.internal_summary && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Internal Summary</h4>
                          <pre className="bg-secondary/50 border border-border rounded-lg p-4 text-xs text-foreground whitespace-pre-wrap font-inter">
                            {sub.internal_summary}
                          </pre>
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Client Contact</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Phone: {sub.client_phone || "N/A"}</p>
                            <p>Email: {sub.client_email || "N/A"}</p>
                            <p>Preferred: {sub.preferred_contact || "N/A"}</p>
                            <p>Safe times: {sub.safe_contact_times || "N/A"}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Subject Details</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Name: {sub.subject_name || "N/A"}</p>
                            <p>Phone: {sub.subject_phone || "N/A"}</p>
                            <p>Vehicle: {[sub.vehicle_make_model, sub.vehicle_color].filter(Boolean).join(", ") || "N/A"}</p>
                            <p>Plate: {sub.vehicle_plate || "N/A"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Goals */}
                      {sub.info_to_find && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Information Sought</h4>
                          <p className="text-sm text-muted-foreground">{sub.info_to_find}</p>
                        </div>
                      )}

                      {/* Evidence */}
                      {sub.evidence_files?.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2">Evidence Files ({sub.evidence_files.length})</h4>
                          <div className="space-y-1">
                            {sub.evidence_files.map((file, i) => (
                              <a
                                key={i}
                                href={typeof file === "object" ? file.url : file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-primary hover:underline"
                              >
                                {typeof file === "object" ? file.name : `File ${i + 1}`}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}