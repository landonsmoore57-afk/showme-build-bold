import { MapPin, ShieldCheck, Clock, TrendingUp, Users, Star } from "lucide-react";

export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: MapPin,
      title: "Missouri Proud",
      description: "Local, family-owned business bringing Show-Me State values to every job."
    },
    {
      icon: ShieldCheck,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for your peace of mind and protection."
    },
    {
      icon: Clock,
      title: "Reliable Timelines",
      description: "We respect your schedule and deliver projects on time, every time."
    },
    {
      icon: TrendingUp,
      title: "Clear Estimates",
      description: "Transparent pricing with no hidden fees or surprise charges."
    },
    {
      icon: Star,
      title: "Workmanship Guarantee",
      description: "We stand behind our work with a quality guarantee you can trust."
    },
    {
      icon: Users,
      title: "Property Manager Specialists",
      description: "Experience working with property managers and understanding their unique needs."
    }
  ];

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-texture-overlay opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Show-Me Contracting?
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            We're more than just contractors — we're your trusted partners in maintaining and improving your properties.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center mb-4">
                <reason.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-white/80">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
