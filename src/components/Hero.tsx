import { Button } from "@/components/ui/button";
import { Phone, Clock, Award, Shield } from "lucide-react";
import heroImage from "@/assets/hero-maintenance.jpg";
import { JobberDialog } from "./JobberDialog";
import { useState } from "react";

export const Hero = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center bg-muted pt-28 pb-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, hsl(205 58% 13%) 35px, hsl(205 58% 13%) 36px)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6 animate-fade-in">
            {/* Eyebrow - Patch style */}
            <div className="inline-block">
              <div className="label-patch text-secondary flex items-center gap-2 bg-white px-4 py-2 rounded-md border-2 border-primary/10 shadow-sm">
                <Clock className="w-4 h-4" />
                24/7 Emergency Service Available
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight">
              Comfort You Can Count On
              <br />
              <span className="text-secondary">Heating & Cooling</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Licensed HVAC pros serving Kansas City metro. Honest pricing, same-day service, and workmanship you can
              trust.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-muted border-2 border-primary/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-xs font-bold text-primary">Licensed</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-muted border-2 border-primary/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-xs font-bold text-primary">15+ Years</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-muted border-2 border-primary/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-xs font-bold text-primary">Same Day</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => setQuoteDialogOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-white font-bold border-2 border-primary shadow-glow-orange"
              >
                Book Service Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = "tel:+19133982500")}
                className="border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-white font-bold"
              >
                <Phone className="w-4 h-4 mr-2" />
                (913) 398-2500
              </Button>
            </div>

            <JobberDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
          </div>

          {/* Right: Visual */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-lg overflow-hidden shadow-card border-[3px] border-primary">
              <img
                src={heroImage}
                alt="Professional HVAC technician servicing air conditioning system"
                className="w-full h-[450px] lg:h-[550px] object-cover"
              />
              {/* Bottom badge overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-primary/95 backdrop-blur-sm p-6 border-t-[3px] border-secondary">
                <div className="label-patch text-secondary mb-2">Upfront Pricing</div>
                <div className="text-white font-bold text-lg">No Surprises. No Hidden Fees.</div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/30 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
