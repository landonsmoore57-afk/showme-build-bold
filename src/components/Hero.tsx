import { Button } from "@/components/ui/button";
import { Phone, Clock, Award, Shield } from "lucide-react";
import heroImage from "@/assets/hero-maintenance.jpg";
import { JobberDialog } from "./JobberDialog";
import { useState } from "react";

export const Hero = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center bg-muted pt-32 pb-20 overflow-hidden">
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
      <div className="absolute top-32 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-10 animate-fade-in text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-block">
                <div className="label-patch text-secondary flex items-center gap-3 bg-white px-6 py-3 rounded-lg border-2 border-primary/10 shadow-sm text-base">
                  <Clock className="w-5 h-5" />
                  24/7 Emergency Service Available
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-primary leading-tight">
                Right Fix, Right Now
                <br />
                <span className="text-secondary">Heating & Cooling</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Licensed HVAC pros serving Kansas City metro. Honest pricing, same-day service, and workmanship you can
                trust.
              </p>

              {/* Trust badges */}
              <div className="flex justify-center lg:justify-start gap-8 pt-4">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-white border-2 border-primary/20 flex items-center justify-center shadow-lg">
                    <Shield className="w-10 h-10 text-secondary" />
                  </div>
                  <div className="text-base font-bold text-primary">Licensed</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-white border-2 border-primary/20 flex items-center justify-center shadow-lg">
                    <Award className="w-10 h-10 text-secondary" />
                  </div>
                  <div className="text-base font-bold text-primary">15+ Years</div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-white border-2 border-primary/20 flex items-center justify-center shadow-lg">
                    <Phone className="w-10 h-10 text-secondary" />
                  </div>
                  <div className="text-base font-bold text-primary">Same Day</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 pt-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={() => setQuoteDialogOpen(true)}
                  className="bg-secondary hover:bg-secondary/90 text-white font-bold border-2 border-primary shadow-glow-orange text-xl px-10 py-8 h-auto"
                >
                  Book Service Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => (window.location.href = "tel:+19133982500")}
                  className="border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-white font-bold text-xl px-10 py-8 h-auto"
                >
                  <Phone className="w-6 h-6 mr-3" />
                  (913) 398-2500
                </Button>
              </div>

              {/* Upfront pricing badge */}
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-lg px-8 py-5 border-2 border-primary/20 shadow-card">
                <div className="label-patch text-secondary mb-2 text-base">Upfront Pricing</div>
                <div className="text-primary font-bold text-xl">No Surprises. No Hidden Fees.</div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative animate-slide-up order-first lg:order-last">
              <div className="relative rounded-2xl overflow-hidden shadow-card border-4 border-primary">
                <img
                  src={heroImage}
                  alt="Professional HVAC technician servicing air conditioning system"
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary/95 to-primary/80 backdrop-blur-sm p-8 border-t-4 border-secondary">
                  <div className="label-patch text-secondary mb-3 text-base">Professional Service</div>
                  <div className="text-white font-bold text-2xl">Your Comfort Is Our Priority</div>
                </div>
              </div>

              {/* Decorative accents */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-secondary/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/30 rounded-2xl -z-10" />
            </div>
          </div>

          <JobberDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
        </div>
      </div>
    </section>
  );
};
