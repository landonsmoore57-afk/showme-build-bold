import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuoteDialog = ({ open, onOpenChange }: QuoteDialogProps) => {
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
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Schedule Your Service</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll reach out within 24 hours with your free, no-pressure quote.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div>
            <Label htmlFor="dialog-name">Full Name *</Label>
            <Input 
              id="dialog-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="John Smith"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="dialog-email">Email Address *</Label>
            <Input 
              id="dialog-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="dialog-phone">Phone Number *</Label>
            <Input 
              id="dialog-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="(555) 123-4567"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="dialog-propertyType">Property Type *</Label>
            <Select 
              value={formData.propertyType}
              onValueChange={(value) => setFormData({...formData, propertyType: value})}
              required
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
            <Label htmlFor="dialog-message">Service Details *</Label>
            <Textarea 
              id="dialog-message"
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Describe your HVAC needs (repair, installation, maintenance, etc.)..."
              className="mt-2 min-h-28"
            />
          </div>

          <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Request Your Free Quote"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
