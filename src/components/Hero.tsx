import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import logo from "@/assets/show-me-logo.png";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-texture-overlay opacity-30" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center animate-fade-in">
        <img 
          src={logo} 
          alt="Show-Me Contracting Logo" 
          className="w-64 h-auto mx-auto mb-8 drop-shadow-2xl"
        />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Missouri's Trusted Partner for<br />
          <span className="text-secondary">Apartment & Multi-Family Renovations</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
          We handle everything from tenant turnovers to full-scale unit renovations — done right, on time, every time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => scrollToSection('contact')}
          >
            Request a Quote <ArrowRight className="ml-2" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection('portfolio')}
            className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm"
          >
            See Our Work
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-white/80">
          <Phone className="w-5 h-5" />
          <a href="tel:+15551234567" className="text-lg hover:text-secondary transition-colors">
            (555) 123-4567
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
