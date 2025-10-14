import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      toast.success("Thank you! We'll get back to you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Get Your Free Quote
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Need HVAC service or installation? Fill out the form below and we'll get back to you with a detailed estimate.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg shadow-lg animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Smith"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(555) 123-4567"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select 
                  value={formData.propertyType}
                  onValueChange={(value) => setFormData({...formData, propertyType: value})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential Home</SelectItem>
                    <SelectItem value="apartment">Apartment/Condo</SelectItem>
                    <SelectItem value="commercial">Commercial Building</SelectItem>
                    <SelectItem value="multi-family">Multi-Family Property</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Service Details *</Label>
                <Textarea 
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe your HVAC needs (repair, installation, maintenance, etc.)..."
                  className="mt-2 min-h-32"
                />
              </div>

              <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Request Your Free Quote"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Call Us</h4>
                    <a href="tel:+19133982500" className="text-muted-foreground hover:text-secondary transition-colors">
                      (913) 398-2500
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Email Us</h4>
                    <a href="mailto:hello@showmeair.com" className="text-muted-foreground hover:text-secondary transition-colors">
                      hello@showmeair.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Service Areas</h4>
                    <p className="text-muted-foreground">
                      Kansas City, KS • Kansas City, MO • Overland Park • Olathe • Lenexa • Shawnee • Lee's Summit • Independence • Blue Springs • Liberty
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent text-accent-foreground p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">7:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-semibold">8:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-semibold">Closed</span>
                </p>
              </div>
              <p className="mt-4 text-sm opacity-90">
                Emergency services available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
