import logo from "@/assets/show-me-logo.svg";
import { Button } from "@/components/ui/button";
import { Phone, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

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
    <nav ref={menuRef} className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b-2 border-accent/30 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="Show-Me Air" 
              className="h-16 w-auto cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={handleLogoClick}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/services"
              className="text-primary hover:text-secondary transition-all duration-300 font-black text-sm hover:scale-110"
            >
              Services
            </Link>
            <Link 
              to="/service-area"
              className="text-primary hover:text-secondary transition-all duration-300 font-black text-sm hover:scale-110"
            >
              Locations
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-primary hover:text-secondary transition-all duration-300 font-black text-sm hover:scale-110"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-primary hover:text-secondary transition-all duration-300 font-black text-sm hover:scale-110"
            >
              Our Work
            </button>
            <div className="flex items-center gap-2 text-accent font-bold">
              <Phone className="w-5 h-5" />
              <a href="tel:+19133982500" className="hover:text-secondary transition-colors text-base">
                (913) 398-2500
              </a>
            </div>
            <Button 
              variant="secondary" 
              onClick={() => scrollToSection('contact')}
              size="default"
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
          <div className="absolute top-full left-0 right-0 md:hidden py-6 border-t-2 border-accent/20 animate-fade-in bg-white shadow-xl z-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col gap-5">
                <Link 
                  to="/services"
                  className="text-left text-primary hover:text-secondary transition-all duration-300 font-black py-2 hover:translate-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/service-area"
                  className="text-left text-primary hover:text-secondary transition-all duration-300 font-black py-2 hover:translate-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Locations
                </Link>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-left text-primary hover:text-secondary transition-all duration-300 font-black py-2 hover:translate-x-2"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="text-left text-primary hover:text-secondary transition-all duration-300 font-black py-2 hover:translate-x-2"
                >
                  Our Work
                </button>
                <a href="tel:+19133982500" className="flex items-center gap-2 text-accent hover:text-secondary transition-all duration-300 py-2 font-bold text-lg">
                  <Phone className="w-5 h-5" />
                  (913) 398-2500
                </a>
                <Button 
                  variant="secondary" 
                  onClick={() => scrollToSection('contact')}
                  className="w-full"
                  size="lg"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
