import { Button } from "@/components/ui/button";
import { Phone, Clock, Award, Shield } from "lucide-react";
import heroImage from "@/assets/hero-multifamily-service.jpg";
import { JobberDialog } from "./JobberDialog";
import { useState } from "react";

export const Hero = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-muted pt-28 pb-16 overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Eyebrow - Patch style */}
          <div className="inline-block">
            <div className="label-patch text-secondary flex items-center gap-2 bg-white px-4 py-2 rounded-md border-2 border-primary/10 shadow-sm">
              <Clock className="w-4 h-4" />
              24/7 Emergency Service Available
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary leading-tight">
            Right Fix, Right Now
            <br />
            <span className="text-secondary">Heating & Cooling</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Licensed HVAC pros serving Kansas City metro. Honest pricing, same-day service, and workmanship you can
            trust.
          </p>

          {/* Trust badges */}
          <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white border-2 border-primary/20 flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-sm font-bold text-primary">Licensed</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white border-2 border-primary/20 flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-sm font-bold text-primary">15+ Years</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white border-2 border-primary/20 flex items-center justify-center shadow-lg">
                <Phone className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-sm font-bold text-primary">Same Day</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Button
              size="lg"
              onClick={() => setQuoteDialogOpen(true)}
              className="bg-secondary hover:bg-secondary/90 text-white font-bold border-2 border-primary shadow-glow-orange text-lg px-8 py-6"
            >
              Book Service Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "tel:+19133982500")}
              className="border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-white font-bold text-lg px-8 py-6"
            >
              <Phone className="w-5 h-5 mr-2" />
              (913) 398-2500
            </Button>
          </div>

          {/* Upfront pricing badge */}
          <div className="inline-block mt-8 bg-white/90 backdrop-blur-sm rounded-lg px-8 py-4 border-2 border-primary/20 shadow-card">
            <div className="label-patch text-secondary mb-1">Upfront Pricing</div>
            <div className="text-primary font-bold text-lg">No Surprises. No Hidden Fees.</div>
          </div>

          <JobberDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
        </div>
      </div>
    </section>
  );
};
