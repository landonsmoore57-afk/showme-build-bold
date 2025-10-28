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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="label-patch text-secondary mb-4">Special Offers</div>
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
            Special Offers Just for You
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality service doesn't have to break the bank. Check out our current deals!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {offers.map((offer, index) => (
            <div 
              key={index}
              className="bg-muted p-6 rounded-lg border-[3px] border-primary/10 hover:border-secondary transition-all duration-300 shadow-card group"
            >
              <div className="w-14 h-14 bg-white border-2 border-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:border-secondary transition-all">
                <offer.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{offer.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm">{offer.description}</p>
              <div className="text-2xl font-black text-secondary mb-4">{offer.price}</div>
              <p className="text-xs text-muted-foreground mb-6 border-t border-primary/10 pt-4">
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
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg border-[3px] border-primary shadow-card max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-black mb-4">
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