import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Portfolio } from "@/components/Portfolio";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SpecialOffers } from "@/components/SpecialOffers";
import { JobberContactSection } from "@/components/JobberContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Portfolio />
      <WhyChooseUs />
      <div id="offers">
        <SpecialOffers />
      </div>
      <JobberContactSection />
      <Footer />
    </div>
  );
};

export default Index;
