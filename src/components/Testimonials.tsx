import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Overland Park, KS",
      rating: 5,
      text: "Fast, polite, and honest. They fixed it same day — I'll never call anyone else. The technician explained everything clearly and the price was exactly what they quoted.",
    },
    {
      name: "Mike Roberts",
      location: "Lee's Summit, MO",
      rating: 5,
      text: "Vital Home Pros saved us during a heat wave! Called in the morning, they came out that afternoon. Professional, friendly, and they cleaned up after themselves. Highly recommend!",
    },
    {
      name: "Jennifer Martinez",
      location: "Kansas City, MO",
      rating: 5,
      text: "Best HVAC company in KC! They treat you like family. Fair pricing, no surprises, and they even helped me set up a maintenance plan to save money. These folks care.",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="label-patch text-secondary mb-4">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">Why Homeowners Love Vital Home Pros</h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear from your neighbors
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border-[3px] border-primary/10 hover:border-secondary transition-all duration-300 shadow-card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed text-sm">"{testimonial.text}"</p>
              <div className="border-t border-primary/10 pt-4">
                <p className="font-bold text-primary">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-12 border-t border-primary/10">
          <div className="text-center">
            <div className="text-3xl font-black text-secondary mb-1">50+</div>
            <div className="text-sm text-muted-foreground font-bold">5-Star Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-secondary mb-1">A+</div>
            <div className="text-sm text-muted-foreground font-bold">BBB Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-secondary mb-1">100%</div>
            <div className="text-sm text-muted-foreground font-bold">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-secondary mb-1">Local</div>
            <div className="text-sm text-muted-foreground font-bold">Family Owned</div>
          </div>
        </div>
      </div>
    </section>
  );
};
