import logo from "@/assets/show-me-logo.png";
import { Button } from "@/components/ui/button";
import { Phone, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Show-Me Air" 
              className="h-14 w-auto cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/services"
              className="text-foreground hover:text-secondary transition-colors font-medium"
            >
              All Services
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-secondary transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-foreground hover:text-secondary transition-colors font-medium"
            >
              Our Work
            </button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <a href="tel:+19133982500" className="hover:text-secondary transition-colors">
                (913) 398-2500
              </a>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => scrollToSection('contact')}
            >
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/services"
                className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Services
              </Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-left text-foreground hover:text-secondary transition-colors font-medium py-2"
              >
                Our Work
              </button>
              <a href="tel:+19133982500" className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors py-2">
                <Phone className="w-4 h-4" />
                (913) 398-2500
              </a>
              <Button 
                variant="secondary" 
                onClick={() => scrollToSection('contact')}
                className="w-full"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
