import { Shield, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground tracking-tight">Empire Investigation</h1>
            <p className="text-xs text-muted-foreground">Confidential Intake</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">
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
              {[
                { n: 1, title: "Secure Review", desc: "A senior member of our team will review your submission within 24 hours." },
                { n: 2, title: "Initial Contact", desc: "We'll reach out using your preferred contact method during your safe contact times." },
                { n: 3, title: "Case Assessment", desc: "We'll discuss your situation, answer questions, and outline a recommended investigation plan with transparent pricing." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">{n}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <Lock className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground">
              Your data is encrypted and accessible only by authorized personnel.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline" className="border-border hover:bg-secondary text-foreground">
                Return Home
              </Button>
            </Link>
            <Link to="/intake">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Submit Another Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}