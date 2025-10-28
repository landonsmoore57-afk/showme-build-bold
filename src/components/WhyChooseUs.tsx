import { Clock, DollarSign, Award, Shield, Users, Wrench } from "lucide-react";

export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Clock,
      title: "Fast & Friendly",
      description: "We show up on time and ready to roll. No delays, no excuses — just quick, professional service with a smile."
    },
    {
      icon: DollarSign,
      title: "Fair & Transparent",
      description: "Upfront pricing, no surprises. We explain what needs doing and why, so you can make informed decisions."
    },
    {
      icon: Award,
      title: "Expert & Local",
      description: "Born and raised right here in Missouri. Licensed, certified, and committed to excellence."
    },
    {
      icon: Shield,
      title: "100% Satisfaction Guaranteed",
      description: "We stand behind every installation and repair. If you're not happy, we're not done."
    },
    {
      icon: Users,
      title: "Family-Owned & Operated",
      description: "When you call Vital Home Pros, you're supporting a local family business. We treat your home like our own because we're part of this community."
    },
    {
      icon: Wrench,
      title: "Latest Technology",
      description: "Our team stays up-to-date with the newest HVAC technology and techniques for quality workmanship."
    }
  ];

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, white 35px, white 36px)`,
        }}/>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="label-patch text-secondary mb-4">Why Choose Us</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Why Choose Vital Home Pros?
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto mb-6" />
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Comfort done right. The Missouri way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border-[3px] border-white/20 hover:bg-white/20 hover:border-secondary transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <reason.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
              <p className="text-sm text-white/90 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
