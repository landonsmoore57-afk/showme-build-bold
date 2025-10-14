import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
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
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-accent/5 to-background pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="bg-secondary/15 text-secondary px-5 py-2.5 rounded-full text-sm font-bold border-2 border-secondary/20">
                ❄️ Don't Sweat It — We'll Keep You Cool
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
              Cool Comfort.{" "}
              <span className="text-secondary">Warm Service.</span>{" "}
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                Schedule Your Service <ArrowRight className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToSection('offers')}
              >
                See Financing Options
              </Button>
            </div>

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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Professional HVAC technician installing air conditioning system" 
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              {/* Overlay card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Recent Project</div>
                    <div className="font-bold text-primary text-lg">Complete HVAC System Installation</div>
                  </div>
                  <div className="text-accent font-bold text-xl">✓</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};
