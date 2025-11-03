import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle2, FileCode, Hash, AlignLeft, BarChart3 } from "lucide-react";

/**
 * Internal documentation page showing SEMrush issues and fixes
 * This page is noindex to prevent it from appearing in search results
 */
const SEOFixesPage = () => {
  const fixes = [
    {
      id: "duplicate-title-tags",
      icon: FileCode,
      title: "Duplicate Title Tags",
      image: "/seo-guides/duplicate-title-tags.png",
      description: "Multiple pages were sharing the same <title> tag, which confuses search engines and reduces individual page rankings.",
      codeChanges: [
        "Created src/seo/generator.ts with generateTitle() function",
        "Implemented unique title templates for each route type (home, city, service, city+service)",
        "Added <Helmet> blocks to all page components with dynamic titles",
        "Removed static title from index.html",
      ],
    },
    {
      id: "duplicate-meta-descriptions",
      icon: AlignLeft,
      title: "Duplicate Meta Descriptions",
      image: "/seo-guides/duplicate-meta-descriptions.png",
      description: "Pages shared identical meta descriptions, missing opportunities for unique search result snippets.",
      codeChanges: [
        "Created generateDescription() in src/seo/generator.ts",
        "Generated 150-160 char descriptions with city/service/phone variations",
        "Updated all pages to use unique, localized descriptions via <Helmet>",
        "Removed static meta description from index.html",
      ],
    },
    {
      id: "missing-h1",
      icon: Hash,
      title: "Missing H1 Tags",
      image: "/seo-guides/missing-h1.png",
      description: "Some pages lacked a proper H1 heading, which is critical for SEO and accessibility.",
      codeChanges: [
        "Added generateH1() function to programmatically create page-specific H1s",
        "Ensured exactly ONE H1 per page across all routes",
        "Used semantic HTML with h2/h3 for subheadings",
        "Positioned H1s prominently in hero sections",
      ],
    },
    {
      id: "low-word-count",
      icon: BarChart3,
      title: "Low Word Count",
      image: "/seo-guides/low-word-count.png",
      description: "Pages contained fewer than 300 words, which search engines may interpret as thin content.",
      codeChanges: [
        "Created ServiceCityContent.tsx component with 400-800 word content blocks",
        "Added sections: intro, common issues, neighborhoods, seasonal tips, FAQs",
        "Included rich, helpful text that provides real value to users",
        "Integrated component into city and city+service pages",
      ],
    },
    {
      id: "low-text-to-html-ratio",
      icon: BarChart3,
      title: "Low Text-to-HTML Ratio",
      image: "/seo-guides/low-text-to-html-ratio.png",
      description: "Too much HTML markup relative to actual text content. Search engines prefer pages with substantial readable text.",
      codeChanges: [
        "Reduced nested div wrappers in ServiceCityContent component",
        "Used semantic HTML elements (section, article, p) instead of excessive divs",
        "Added plain text paragraphs with minimal styling classes",
        "Lazy-loaded heavy UI components that don't contribute to core content",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>SEO Fixes Documentation | Internal</title>
        <meta name="description" content="Internal documentation of SEMrush issues and code fixes" />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen">
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Internal Documentation</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SEMrush Issues & Fixes
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                This page documents the five major SEMrush SEO issues identified and how they were resolved through 
                programmatic SEO implementation. Each section shows the original SEMrush report screenshot and lists 
                the specific code changes made to fix the issue.
              </p>

              <div className="bg-card border border-primary/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3">Implementation Summary</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>692+ pages</strong> now have unique titles, descriptions, and H1s</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>400-800 words</strong> of helpful content per city/service page</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Improved text-to-HTML ratio</strong> through semantic markup</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>Sitemap updated</strong> to include all city×service combinations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Issues & Fixes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-16">
              {fixes.map((fix, index) => {
                const Icon = fix.icon;
                return (
                  <div key={fix.id} className="scroll-mt-24" id={fix.id}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Issue #{index + 1}</div>
                        <h2 className="text-3xl font-bold mb-2">{fix.title}</h2>
                        <p className="text-muted-foreground">{fix.description}</p>
                      </div>
                    </div>

                    {/* SEMrush Screenshot */}
                    <div className="mb-6 border rounded-lg overflow-hidden bg-card">
                      <div className="bg-muted px-4 py-2 border-b">
                        <p className="text-sm font-medium">SEMrush Report Screenshot</p>
                      </div>
                      <div className="p-4">
                        <img
                          src={fix.image}
                          alt={`${fix.title} - SEMrush report`}
                          className="w-full h-auto rounded border"
                        />
                      </div>
                    </div>

                    {/* Code Changes */}
                    <div className="bg-card border rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-primary" />
                        Code Changes Made
                      </h3>
                      <ul className="space-y-3">
                        {fix.codeChanges.map((change, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Files Modified */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Key Files Modified</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { file: "src/seo/generator.ts", desc: "Programmatic SEO generation" },
                  { file: "src/components/SEO/ServiceCityContent.tsx", desc: "Rich content component" },
                  { file: "src/data/site.ts", desc: "Centralized config" },
                  { file: "index.html", desc: "Removed static meta tags" },
                  { file: "src/pages/*.tsx", desc: "Added <Helmet> to all pages" },
                  { file: "vite-plugin-sitemap.ts", desc: "Enhanced sitemap generation" },
                ].map((item) => (
                  <div key={item.file} className="bg-card border rounded-lg p-4">
                    <code className="text-sm text-primary font-mono block mb-1">{item.file}</code>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Next Steps</h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Monitor SEMrush</h3>
                    <p className="text-sm text-muted-foreground">
                      Re-run SEMrush site audit in 1-2 weeks to verify all issues are resolved
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Validate Sitemap</h3>
                    <p className="text-sm text-muted-foreground">
                      Submit updated sitemap.xml to Google Search Console
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Content Variations</h3>
                    <p className="text-sm text-muted-foreground">
                      Consider adding more service-specific content variations to avoid near-duplicate text
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SEOFixesPage;
