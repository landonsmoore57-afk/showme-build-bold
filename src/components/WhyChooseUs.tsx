import { Clock, DollarSign, Award, Shield, Users, Wrench } from "lucide-react";

export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Clock,
      title: "Fast & Friendly",
      description: "We show up on time and ready to roll. No delays, no excuses — just quick, professional service with a smile. Your time matters to us."
    },
    {
      icon: DollarSign,
      title: "Fair & Transparent",
      description: "Upfront pricing, no surprises. We explain what needs doing and why, so you can make informed decisions. Honest work, honest prices — the Missouri way."
    },
    {
      icon: Award,
      title: "Expert & Local",
      description: "Born and raised right here in Missouri. We're your neighbors, and we know what works in our climate. Licensed, certified, and committed to excellence."
    },
    {
      icon: Shield,
      title: "100% Satisfaction Guaranteed",
      description: "We stand behind every installation and repair. If you're not happy, we're not done. That's our promise to you and your family."
    },
    {
      icon: Users,
      title: "Family-Owned & Operated",
      description: "When you call Show-Me Air, you're supporting a local family business. We treat your home like our own because we're part of this community."
    },
    {
      icon: Wrench,
      title: "Latest Technology & Training",
      description: "Our team stays up-to-date with the newest HVAC technology and techniques. Quality workmanship backed by continuous learning and improvement."
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-texture-overlay opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Why Choose Show-Me Air?
          </h2>
          <div className="w-24 h-1.5 bg-secondary rounded-full mx-auto mb-6" />
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Comfort done right. The Missouri way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-7 rounded-2xl border-2 border-white/20 hover:bg-white/20 hover:border-secondary/60 transition-all duration-300 hover:-translate-y-2 animate-fade-in group"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-white/90 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
