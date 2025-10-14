import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { services, cities, companyInfo, faqs } from "@/data/seoData";

// Utility Icons
const IconCheck = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconPhone = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.31 1.76.57 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.09a2 2 0 0 1 2.11-.45c.84.26 1.71.45 2.6.57A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSparkle = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2l2.5 5L20 9.5 15 11l-3 5-3-5-5-1.5L9.5 7 12 2zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PillLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    to={href}
    className="inline-flex items-center rounded-full border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-white hover:shadow transition"
  >
    <span className="mr-1">{children}</span>
    <span className="ml-2 text-slate-400">→</span>
  </Link>
);

const ServicesDirectory = () => {
  const cityList = Object.entries(cities);
  const serviceList = Object.entries(services);

  // Build JSON-LD structured data
  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: companyInfo.name,
    url: companyInfo.website,
    telephone: companyInfo.phone,
    areaServed: cityList.map(([_, cityData]) => ({ "@type": "City", name: cityData.name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Available Services",
      itemListElement: serviceList.map(([_, serviceData]) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: serviceData.name },
      })),
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: companyInfo.website },
      { "@type": "ListItem", position: 2, name: "All Services", item: `${companyInfo.website}/services` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Object.values(faqs)
      .flat()
      .slice(0, 6)
      .map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
  };

  return (
    <>
      <Helmet>
        <title>HVAC Services in Missouri & Kansas | {companyInfo.name}</title>
        <meta
          name="description"
          content="Professional HVAC services across Missouri and Kansas. AC repair, furnace installation, maintenance, and more. Serving Columbia, Kansas City, Springfield, St. Louis, and Overland Park."
        />
        <link rel="canonical" href={`${companyInfo.website}/services`} />
        <script type="application/ld+json">{JSON.stringify(businessJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbsJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="mx-auto max-w-6xl px-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-card/70 px-4 py-1 text-sm text-muted-foreground shadow ring-1 ring-border">
              <IconSparkle className="h-4 w-4 text-primary" />
              <span>{companyInfo.yearsInBusiness} years of trusted service</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
              Expert HVAC Services
              <span className="block text-primary">Across Missouri & Kansas</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Same-day repairs, professional installations, and honest pricing. Choose your city to get started.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow hover:bg-primary/90 transition"
              >
                <IconPhone className="h-5 w-5" /> Call {companyInfo.phone}
              </a>
              <a
                href="#quote"
                className="rounded-xl border border-border bg-card px-5 py-3 font-semibold shadow hover:bg-accent transition"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </section>

        {/* Proof Bar */}
        <section className="border-y border-border bg-card/70">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-emerald-500" /> {companyInfo.rating.value}★ ({companyInfo.rating.count}+ reviews)
            </div>
            <div className="inline-flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-emerald-500" /> Licensed & Insured #{companyInfo.licenseNumber}
            </div>
            <div className="inline-flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-emerald-500" /> Same-Day Service
            </div>
            <div className="inline-flex items-center gap-2">
              <IconCheck className="h-5 w-5 text-emerald-500" /> 100% Satisfaction Guarantee
            </div>
          </div>
        </section>

        {/* Cities & Services Grid */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-2xl font-bold md:text-3xl">Browse Services by Location</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {cityList.map(([citySlug, cityData]) => (
              <div key={citySlug} className="rounded-2xl bg-card/80 p-5 shadow-sm ring-1 ring-border">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {cityData.name}, {cityData.state}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Serving {cityData.neighborhoods.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {serviceList.map(([serviceSlug, serviceData]) => (
                    <PillLink
                      key={serviceSlug}
                      href={`/service-area/${cityData.state.toLowerCase()}/${citySlug}/${serviceSlug}`}
                    >
                      {serviceData.name}
                    </PillLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Trust Section */}
        <section className="bg-gradient-to-br from-background to-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { title: "Licensed Technicians", desc: "Background-checked, highly trained, and certified." },
                { title: "Same-Day Service", desc: "We're built for speed during peak heat or cold." },
                { title: "Honest Pricing", desc: "Upfront, no-surprise quotes before work begins." },
                { title: "Satisfaction Guaranteed", desc: "We stand behind our work 100%." },
              ].map((f) => (
                <div key={f.title} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                  <IconSparkle className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceList.map(([serviceSlug, serviceData]) => (
              <div key={serviceSlug} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                <h3 className="text-xl font-bold mb-3">{serviceData.name}</h3>
                <p className="text-muted-foreground mb-4">{serviceData.description}</p>
                <p className="text-sm font-medium text-primary">
                  Available in all {cityList.length} service areas
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Copy + FAQ */}
        <section className="mx-auto max-w-6xl px-4 py-12 bg-muted/20">
          <div className="grid items-start gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold">Your Local Comfort Pros</h2>
              <p className="mt-2 text-muted-foreground">
                Our Missouri and Kansas teams handle heating, cooling, and HVAC maintenance needs with care and precision. 
                From AC repair and furnace installation to indoor air quality solutions, we've got you covered.
              </p>
              <p className="mt-3 text-muted-foreground">
                We proudly serve Columbia, Kansas City, Springfield, St. Louis, Overland Park, and surrounding communities 
                with fast response times, quality parts, and friendly service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">FAQs</h3>
              <div className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                {Object.values(faqs)
                  .flat()
                  .slice(0, 4)
                  .map((f) => (
                    <details key={f.question} className="group p-4 open:bg-muted/30">
                      <summary className="cursor-pointer list-none font-medium">
                        {f.question}
                      </summary>
                      <p className="mt-2 text-sm text-muted-foreground">{f.answer}</p>
                    </details>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section id="quote" className="bg-primary/95">
          <div className="mx-auto max-w-6xl items-center justify-between gap-6 px-4 py-8 md:flex">
            <div>
              <h2 className="text-2xl font-bold text-primary-foreground">Need Service Today?</h2>
              <p className="mt-1 text-primary-foreground/80">
                Call us or request a quick quote—most appointments available same day.
              </p>
            </div>
            <div className="mt-4 flex gap-3 md:mt-0">
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-background px-5 py-3 font-semibold text-foreground shadow hover:bg-accent transition"
              >
                <IconPhone className="h-5 w-5" /> Call {companyInfo.phone}
              </a>
            </div>
          </div>
        </section>

        {/* Sticky CTA (mobile) */}
        <div className="fixed inset-x-0 bottom-0 z-40 mx-auto block max-w-md rounded-t-2xl border border-border bg-card p-3 shadow-lg md:hidden">
          <div className="flex items-center justify-between gap-2">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow hover:bg-primary/90 transition"
            >
              <IconPhone className="h-5 w-5" /> Call Now
            </a>
            <a
              href="#quote"
              className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-center font-semibold shadow hover:bg-accent transition"
            >
              Get Quote
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ServicesDirectory;
