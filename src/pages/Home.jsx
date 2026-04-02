import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Clock, ChevronRight, Eye, FileText } from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative">
        <BackgroundPaths title="Empire Investigation">
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-3">
            Licensed Private Investigation Services
          </p>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-10">
            Discretion. Precision. Results. Our team of experienced investigators
            provides confidential, thorough, and legally sound investigation services.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/intake">
              <div className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Button
                  variant="ghost"
                  className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md bg-black/95 hover:bg-black/100 text-white transition-all duration-300 group-hover:-translate-y-0.5 border border-white/10 hover:shadow-md"
                >
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">Begin Confidential Intake</span>
                  <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">→</span>
                </Button>
              </div>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-10 mt-12 text-neutral-400">
            <div className="flex items-center gap-2 text-xs">
              <Lock className="w-4 h-4 text-neutral-300" />
              <span>256-bit Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Shield className="w-4 h-4 text-neutral-300" />
              <span>Fully Confidential</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-neutral-300" />
              <span>24hr Response</span>
            </div>
          </div>
        </BackgroundPaths>
      </header>

      {/* Services */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground text-center mb-4">
            Investigation Services
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Each case is handled with the highest level of professionalism, discretion, and legal compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Surveillance",
                desc: "Domestic investigations, infidelity, custody, and personal matters handled with care and discretion."
              },
              {
                icon: Shield,
                title: "Corporate Intelligence",
                desc: "Background checks, employee investigations, due diligence, and corporate risk assessment."
              },
              {
                icon: FileText,
                title: "Technical Services",
                desc: "Bug sweeps (TSCM), digital forensics, electronic surveillance detection and countermeasures."
              },
            ].map((service, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Complete our secure intake form and a member of our team will review your case within 24 hours. 
            All communications are treated with absolute confidentiality.
          </p>
          <Link to="/intake">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base">
              Start Your Inquiry
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Empire Investigation LLC</span>
          </div>
          <p className="text-xs text-muted-foreground">
            All information is confidential and protected under applicable privacy laws.
          </p>
        </div>
      </footer>
    </div>
  );
}