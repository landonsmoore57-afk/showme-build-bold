import { Button } from "@/components/ui/button";
import { Phone, Clock, Award, Shield } from "lucide-react";
import heroImage from "@/assets/hero-multifamily-service.jpg";
import { JobberDialog } from "./JobberDialog";
import { useState } from "react";

export const Hero = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-muted pt-24 pb-16 overflow-hidden">
      {/* Hero image background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional HVAC technician servicing outdoor unit at multi-family apartment building"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-muted/70 via-muted/60 to-muted/80" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(205 58% 13%) 35px, hsl(205 58% 13%) 36px)`,
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-32 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto text-center space-y-8 md:space-y-10 animate-fade-in">
          {/* Eyebrow - Patch style */}
          <div className="inline-block">
            <div className="label-patch text-secondary flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg border-2 border-primary/10 shadow-md text-sm md:text-base">
              <Clock className="w-5 h-5" />
              24/7 Emergency Service Available
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary leading-tight">
            Right Fix, Right Now
            <br />
            <span className="text-secondary">Heating & Cooling</span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            Licensed HVAC pros serving Kansas City metro. Honest pricing, same-day service, and workmanship you can
            trust.
          </p>

          {/* Trust stats banner */}
          <div className="relative max-w-5xl mx-auto pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-black text-primary">100%</div>
                </div>
                <div className="text-center text-sm font-semibold text-muted-foreground">
                  Licensed & Insured
                </div>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-secondary/10 hover:shadow-xl hover:border-secondary/20 transition-all duration-300">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="text-3xl font-black text-secondary">15+</div>
                </div>
                <div className="text-center text-sm font-semibold text-muted-foreground">
                  Years Experience
                </div>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-black text-primary">24/7</div>
                </div>
                <div className="text-center text-sm font-semibold text-muted-foreground">
                  Emergency Service
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-6 justify-center max-w-3xl mx-auto">
            <Button
              size="lg"
              onClick={() => setQuoteDialogOpen(true)}
              className="bg-secondary hover:bg-secondary/90 text-white font-bold border-2 border-primary shadow-glow-orange text-lg px-10 py-7"
            >
              Book Service Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "tel:+19133982500")}
              className="border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-white font-bold text-lg px-10 py-7"
            >
              <Phone className="w-5 h-5 mr-2" />
              (913) 398-2500
            </Button>
          </div>

          <JobberDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
        </div>
      </div>
    </section>
  );
};
