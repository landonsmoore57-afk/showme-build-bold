import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { QuoteDialog } from "./QuoteDialog";
import { useState } from "react";

export const Hero = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    "Upfront Pricing — No Surprises",
    "Same-Day Service & Repairs",
    "100% Satisfaction Guaranteed"
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-accent/10 via-background to-secondary/5 pt-20 overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block animate-bounce">
              <span className="bg-gradient-to-r from-secondary to-secondary/80 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-secondary/30 border-2 border-secondary/50">
                ❄️ Don't Sweat It — We'll Keep You Cool
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary leading-[1.1] tracking-tight">
              Cool Comfort.{" "}
              <span className="bg-gradient-to-r from-secondary to-orange-600 bg-clip-text text-transparent">Warm Service.</span>{" "}
              Every Time.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Proudly serving Missouri homes with honest, expert HVAC service — and a smile. Your neighbors trust us, and you will too.
            </p>

            {/* Feature list */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setQuoteDialogOpen(true)}
                className="group"
              >
                Schedule Your Service 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('offers')}
                className="border-2 border-accent hover:border-secondary hover:bg-secondary/5 hover:text-secondary font-bold"
              >
                See Financing Options
              </Button>
            </div>

            <QuoteDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Systems Serviced</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative animate-slide-up lg:order-last order-first">
            {/* Shield-inspired border decoration */}
            <div className="absolute -inset-4 bg-gradient-to-br from-accent via-secondary/20 to-primary rounded-[2rem] opacity-20 blur-xl"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
              <img 
                src={heroImage} 
                alt="Professional HVAC technician installing air conditioning system" 
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Overlay card with friendly styling */}
              <div className="absolute bottom-8 left-8 right-8 bg-white backdrop-blur-sm p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-2 border-accent/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold mb-1 text-secondary">Recent Project ✨</div>
                    <div className="font-black text-primary text-lg">Complete HVAC System Installation</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg">
                    <div className="text-white font-bold text-2xl">✓</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-secondary to-orange-600 rounded-full blur-3xl opacity-30 -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-gradient-to-br from-accent to-primary rounded-full blur-3xl opacity-20 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
