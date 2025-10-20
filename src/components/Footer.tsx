import logo from "@/assets/show-me-logo-footer.png";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div>
            <img src={logo} alt="Show-Me Air" className="w-48 mb-6 hover:scale-105 transition-transform duration-300" />
            <p className="text-base font-bold text-white mb-3">
              Don't Sweat It — We'll Keep You Cool.
            </p>
            <p className="text-sm text-primary-foreground/80 mb-6 leading-relaxed">
              Missouri's trusted partner for heating, cooling, and air quality. Family-owned, community-focused.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-base">
              <li><a href="#about" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 inline-block font-medium">About Us</a></li>
              <li><a href="#services" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 inline-block font-medium">Services</a></li>
              <li><a href="#portfolio" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 inline-block font-medium">Our Work</a></li>
              <li><a href="#contact" className="hover:text-secondary transition-all duration-300 hover:translate-x-1 inline-block font-medium">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-black text-xl mb-6 text-white">Our Services</h3>
            <ul className="space-y-3 text-base text-primary-foreground/90 font-medium">
              <li>AC Installation & Repair</li>
              <li>Heating Services</li>
              <li>Air Quality Solutions</li>
              <li>System Maintenance</li>
              <li className="text-secondary font-bold">24/7 Emergency Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-black text-xl mb-6 text-white">Contact Us</h3>
            <div className="space-y-4 text-base">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <a href="tel:+19133982500" className="hover:text-secondary transition-colors font-bold text-lg mt-1.5">
                  (913) 398-2500
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:hello@showmeair.com" className="hover:text-secondary transition-colors font-medium mt-2">
                  hello@showmeair.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-primary-foreground/90 font-medium mt-2 leading-relaxed">
                  Serving Kansas City, KS • Kansas City, MO • Overland Park • Olathe • Lenexa • Shawnee • Lee's Summit • Independence • Blue Springs • Liberty
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-white/20 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-white font-bold">© {currentYear} Show-Me Air. All rights reserved. • Don't Sweat It.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-secondary transition-colors font-medium">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors font-medium">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
