import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AlertCircle, Building2, DollarSign, TrendingUp, Phone } from "lucide-react";
import { JobberDialog } from "@/components/JobberDialog";

export default function AnalysisPage() {
  const [showJobberDialog, setShowJobberDialog] = useState(false);
  const [formData, setFormData] = useState({
    units: "",
    avgSquareFeet: "",
    buildingAge: "",
    currentMaintenanceBudget: "",
  });
  const [results, setResults] = useState<{
    totalCost: number;
    costPerUnit: number;
    potentialFines: number;
    maintenanceSavings: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateCosts = () => {
    // Placeholder calculation - will be replaced with actual formulas
    const units = parseInt(formData.units) || 0;
    const sqft = parseInt(formData.avgSquareFeet) || 0;
    const age = parseInt(formData.buildingAge) || 0;
    const budget = parseFloat(formData.currentMaintenanceBudget) || 0;

    // TODO: Replace with actual formulas
    const totalCost = units * 5000 + (age > 15 ? units * 2000 : 0);
    const costPerUnit = totalCost / units;
    const potentialFines = units * 1500;
    const maintenanceSavings = budget * 0.3;

    setResults({
      totalCost,
      costPerUnit,
      potentialFines,
      maintenanceSavings,
    });
  };

  return (
    <>
      <Helmet>
        <title>EPA Compliance Cost Calculator | Multi-Family HVAC Analysis</title>
        <meta
          name="description"
          content="Calculate the financial impact of new EPA HVAC regulations on your multi-family property. Understand compliance costs and maintenance requirements."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full mb-6">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-semibold">2025 EPA Regulations Now In Effect</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Calculate Your Compliance Costs
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                New EPA regulations require significant HVAC system upgrades for multi-family properties.
                Understand your financial exposure and plan your budget accordingly.
              </p>
            </div>

            {/* Calculator Card */}
            <Card className="p-8 shadow-2xl bg-card/50 backdrop-blur">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className={`space-y-6 ${results ? 'hidden md:block' : ''}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <Building2 className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Property Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="units">Number of Units</Label>
                      <Input
                        id="units"
                        name="units"
                        type="number"
                        placeholder="e.g., 50"
                        value={formData.units}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="avgSquareFeet">Average Unit Square Footage</Label>
                      <Input
                        id="avgSquareFeet"
                        name="avgSquareFeet"
                        type="number"
                        placeholder="e.g., 850"
                        value={formData.avgSquareFeet}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="buildingAge">Building Age (years)</Label>
                      <Input
                        id="buildingAge"
                        name="buildingAge"
                        type="number"
                        placeholder="e.g., 20"
                        value={formData.buildingAge}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currentMaintenanceBudget">Current Annual HVAC Budget ($)</Label>
                      <Input
                        id="currentMaintenanceBudget"
                        name="currentMaintenanceBudget"
                        type="number"
                        placeholder="e.g., 25000"
                        value={formData.currentMaintenanceBudget}
                        onChange={handleInputChange}
                        className="mt-2"
                      />
                    </div>

                    <Button
                      onClick={calculateCosts}
                      className="w-full mt-6"
                      size="lg"
                      disabled={!formData.units || !formData.avgSquareFeet}
                    >
                      Calculate Cost Impact
                    </Button>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <DollarSign className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Cost Analysis</h2>
                  </div>

                  {results ? (
                    <div className="space-y-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setResults(null)} 
                        className="w-full md:hidden mb-4"
                      >
                        ← Edit Property Details
                      </Button>
                      <div className="bg-primary/10 rounded-lg p-6 border-2 border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Estimated Total Compliance Cost</p>
                        <p className="text-4xl font-bold text-primary">
                          ${results.totalCost.toLocaleString()}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Cost Per Unit</p>
                          <p className="text-2xl font-bold">${results.costPerUnit.toLocaleString()}</p>
                        </div>
                        <div className="bg-destructive/10 rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Potential Fines</p>
                          <p className="text-2xl font-bold text-destructive">
                            ${results.potentialFines.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          <p className="text-sm font-semibold">Proactive Maintenance Saves</p>
                        </div>
                        <p className="text-3xl font-bold text-accent">
                          ${results.maintenanceSavings.toLocaleString()}/year
                        </p>
                      </div>

                      <div className="pt-4 space-y-3">
                        <Button onClick={() => setShowJobberDialog(true)} className="w-full" size="lg">
                          Get Your Custom Quote
                        </Button>
                        <Button variant="outline" className="w-full" size="lg" asChild>
                          <a href="tel:573-808-3669">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now: (573) 808-3669
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground">
                      <div className="text-center">
                        <Building2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>Enter your property details to see your cost analysis</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Info Section */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <AlertCircle className="w-10 h-10 text-destructive mb-4" />
                <h3 className="text-lg font-bold mb-2">Compliance Deadline</h3>
                <p className="text-sm text-muted-foreground">
                  New EPA regulations require all multi-family properties to meet updated refrigerant
                  and efficiency standards. Non-compliance can result in significant fines.
                </p>
              </Card>

              <Card className="p-6">
                <DollarSign className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">Cost of Inaction</h3>
                <p className="text-sm text-muted-foreground">
                  Delaying maintenance leads to emergency repairs costing 3-5x more than preventive
                  service, plus potential regulatory penalties and tenant complaints.
                </p>
              </Card>

              <Card className="p-6">
                <TrendingUp className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-lg font-bold mb-2">Smart Investment</h3>
                <p className="text-sm text-muted-foreground">
                  Proactive HVAC maintenance and upgrades reduce energy costs by 20-30%, extend equipment
                  life, and maintain property value.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <JobberDialog open={showJobberDialog} onOpenChange={setShowJobberDialog} />
    </>
  );
}
