import project1 from "@/assets/project-1-new.jpg";
import project2 from "@/assets/project-2-new.jpg";
import project3 from "@/assets/project-3-new.jpg";

export const Portfolio = () => {
  const projects = [
    {
      image: project1,
      title: "Wall-Mounted AC Installation",
      description: "Brand new high-efficiency ductless system for a family home in Overland Park. Clean installation with expert workmanship."
    },
    {
      image: project2,
      title: "Furnace Maintenance & Repair",
      description: "Professional furnace diagnostics and tune-up in Lee's Summit. Keeping your heating system running efficiently all winter."
    },
    {
      image: project3,
      title: "Outdoor Unit Installation",
      description: "Complete AC condenser installation in Kansas City. Professional setup with proper clearances and connections."
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <div className="label-patch text-secondary mb-4">Our Work</div>
          <h2 className="text-3xl md:text-4xl font-black text-primary mb-6">
            Recent Projects
          </h2>
          <div className="w-24 h-1 bg-secondary rounded-full mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real homes. Real comfort. See the craftsmanship and care we bring to every Missouri home we serve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg border-[3px] border-primary/10 hover:border-secondary transition-all duration-300 shadow-card"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
