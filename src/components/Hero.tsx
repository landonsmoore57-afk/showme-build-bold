import { Button } from "@/components/ui/button";
import { Phone, Clock, Award, Shield } from "lucide-react";
import heroImage from "@/assets/hero-multifamily-service.jpg";
import { JobberDialog } from "./JobberDialog";
import { useState } from "react";

export const Hero = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted pt-24 pb-16 overflow-hidden">
      {/* Hero image background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional HVAC technician servicing outdoor unit at multi-family apartment building"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/80 to-muted/90" />
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto text-center space-y-6 md:space-y-8 animate-fade-in">
          {/* Eyebrow - Bold service badge */}
          <div className="inline-block">
            <div className="bg-secondary text-white px-6 py-3 rounded-md shadow-lg text-sm md:text-base font-bold uppercase tracking-wide flex items-center gap-2 border-b-4 border-secondary/80">
              <Clock className="w-5 h-5" />
              Emergency Service 24/7
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-primary leading-[1.1] tracking-tight">
            KANSAS CITY'S<br />
            <span className="text-secondary">HVAC EXPERTS</span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed font-semibold">
            Fast, reliable heating & cooling service.<br className="hidden md:block" />
            Licensed pros. Honest pricing. Done right.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4">
            <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded font-bold text-sm shadow-md">
              <Shield className="w-5 h-5" />
              LICENSED & INSURED
            </div>
            
            <div className="flex items-center gap-2 bg-white text-primary px-4 py-2 rounded font-bold text-sm shadow-md border-2 border-primary">
              <Award className="w-5 h-5" />
              15+ YEARS
            </div>
            
            <div className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded font-bold text-sm shadow-md">
              <Phone className="w-5 h-5" />
              (913) 398-2500
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center max-w-4xl mx-auto">
            <Button
              size="lg"
              onClick={() => setQuoteDialogOpen(true)}
              className="bg-secondary hover:bg-secondary/90 text-white font-black text-lg md:text-xl px-12 py-8 shadow-xl uppercase tracking-wide border-b-4 border-secondary/80 hover:border-secondary rounded-md"
            >
              Get Free Quote
            </Button>
            <Button
              size="lg"
              onClick={() => (window.location.href = "tel:+19133982500")}
              className="bg-primary hover:bg-primary/90 text-white font-black text-lg md:text-xl px-12 py-8 shadow-xl uppercase tracking-wide border-b-4 border-primary/80 hover:border-primary rounded-md"
            >
              <Phone className="w-6 h-6 mr-3" />
              Call Now
            </Button>
          </div>

          <JobberDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
        </div>
      </div>
    </section>
  );
};
