import { Button } from "@/components/ui/button";
import { Percent, DollarSign, Calendar } from "lucide-react";

export const SpecialOffers = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const offers = [
    {
      icon: DollarSign,
      title: "Tune-Up Special",
      description: "Complete system inspection and tune-up",
      price: "$89",
      details: "Includes 21-point inspection, filter replacement, and system optimization"
    },
    {
      icon: Percent,
      title: "New System Savings",
      description: "Save up to $1,500 on new HVAC systems",
      price: "Up to $1,500 OFF",
      details: "Premium equipment with extended warranty included"
    },
    {
      icon: Calendar,
      title: "Comfort Club",
      description: "Annual maintenance plan with priority service",
      price: "$199/year",
      details: "2 tune-ups per year, priority scheduling, and exclusive member discounts"
    }
  ];

  return (
    <section className="py-20 bg-secondary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Special Offers Just for You
          </h2>
          <div className="w-24 h-1.5 bg-secondary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality service doesn't have to break the bank. Check out our current deals!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-2xl shadow-friendly hover:shadow-friendly-hover transition-all duration-300 border-2 border-secondary/20 animate-fade-in group hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-secondary/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/25 transition-colors">
                <offer.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">{offer.title}</h3>
              <p className="text-muted-foreground mb-4">{offer.description}</p>
              <div className="text-3xl font-bold text-secondary mb-4">{offer.price}</div>
              <p className="text-sm text-muted-foreground mb-6 border-t pt-4">
                {offer.details}
              </p>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={scrollToContact}
              >
                Claim This Offer
              </Button>
            </div>
          ))}
        </div>

        {/* Financing CTA */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground p-8 md:p-12 rounded-2xl shadow-xl max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Flexible Financing Available
          </h3>
          <p className="text-lg mb-6 opacity-90">
            0% APR for 60 months on qualifying systems. Make comfort affordable with approved credit.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={scrollToContact}
          >
            Learn About Financing
          </Button>
        </div>
      </div>
    </section>
  );
};