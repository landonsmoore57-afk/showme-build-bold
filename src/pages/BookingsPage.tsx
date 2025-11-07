import { Helmet } from "react-helmet-async";
import { JobberEmbed } from "@/components/JobberEmbed";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookingsPage = () => {
  return (
    <>
      <Helmet>
        <title>Book HVAC Service - Vital Home Pros | Kansas City</title>
        <meta 
          name="description" 
          content="Schedule your HVAC service appointment online. Fast, reliable heating and cooling service for Kansas City homes and businesses." 
        />
        <link rel="canonical" href="https://vitalhomepros.com/bookings" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Vital Home Pros</h1>
              <p className="text-sm text-muted-foreground">HVAC Experts in Kansas City</p>
            </div>
            <Button variant="outline" size="lg" asChild className="gap-2">
              <a href="tel:+18165551234">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">(816) 555-1234</span>
              </a>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Intro Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Schedule Your HVAC Service
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fill out the form below and we'll reach out within 24 hours with your free, no-pressure quote.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">✓</span>
                Licensed & Insured
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">✓</span>
                15+ Years Experience
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">✓</span>
                24/7 Emergency Service
              </div>
            </div>

            {/* Jobber Form */}
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
              <JobberEmbed />
            </div>

            {/* Footer Note */}
            <div className="text-center mt-8 text-sm text-muted-foreground">
              <p>Need immediate assistance? Call us at <a href="tel:+18165551234" className="text-primary font-semibold hover:underline">(816) 555-1234</a></p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default BookingsPage;
