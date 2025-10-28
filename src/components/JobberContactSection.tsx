import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { JobberEmbed } from "./JobberEmbed";

export const JobberContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Get Your Free Quote</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule your service today and experience the Vital Home Pros difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-xl mb-4 text-foreground">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Call Us</p>
                    <a href="tel:+15551234567" className="text-primary hover:underline">
                      (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:hello@showmeair.com" className="text-primary hover:underline">
                      hello@showmeair.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Service Areas</p>
                    <p className="text-muted-foreground text-sm">
                      St. Louis, Kansas City, Springfield, Columbia & Beyond
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-xl mb-4 text-foreground">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <div className="flex justify-between w-full">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span className="font-medium text-foreground">7AM - 7PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <div className="flex justify-between w-full">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-medium text-foreground">8AM - 5PM</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <div className="flex justify-between w-full">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="font-medium text-foreground">Closed</span>
                  </div>
                </div>
                <p className="text-primary font-medium mt-4">24/7 Emergency Service Available</p>
              </div>
            </div>
          </div>

          {/* Jobber Embed Form */}
          <div className="lg:col-span-2">
            <div className="bg-card p-8 rounded-lg border shadow-sm">
              <JobberEmbed className="min-h-[600px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
