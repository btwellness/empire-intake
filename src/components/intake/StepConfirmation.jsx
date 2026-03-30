import { Shield, CheckCircle, Phone, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function StepConfirmation({ data }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 py-8">
      {/* Success Icon */}
      <div className="relative mx-auto w-20 h-20">
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
        <div className="relative w-20 h-20 bg-primary rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>

      {/* Heading */}
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-3">
          Thank You for Your Information
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          We will contact you as soon as possible.
        </p>
      </div>

      {/* What Happens Next */}
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 text-left space-y-6">
        <h3 className="text-lg font-semibold text-foreground text-center">What Happens Next</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-primary">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Secure Review</p>
              <p className="text-sm text-muted-foreground">
                A senior member of our team will review your submission within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-primary">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Initial Contact</p>
              <p className="text-sm text-muted-foreground">
                We'll reach out using your preferred contact method
                {data.preferred_contact ? ` (${data.preferred_contact})` : ""} during your safe contact times.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-primary">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Case Assessment</p>
              <p className="text-sm text-muted-foreground">
                We'll discuss your situation, answer questions, and outline a recommended investigation plan with transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Reassurance */}
      <div className="flex items-center justify-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <Lock className="w-5 h-5 text-primary flex-shrink-0" />
        <p className="text-sm text-foreground">
          Your data is encrypted and accessible only by authorized personnel.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="border-border hover:bg-secondary text-foreground"
        >
          Return Home
        </Button>
        <Button
          onClick={() => navigate("/intake")}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Submit Another Inquiry
        </Button>
      </div>
    </div>
  );
}