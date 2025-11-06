import { useState } from "react";
import { DepreciationChart } from "./DepreciationChart";
import { ContactDialog, ContactFormData } from "./ContactDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Calendar, Lightbulb } from "lucide-react";
import vitalLogo from "@/assets/vital-home-pros-logo.png";

export function HVACCalculator() {
  const [formData, setFormData] = useState({
    units: 0,
    avgAge: 10, // Hidden from UI, used for calculations
  });
  const [showResults, setShowResults] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const { toast } = useToast();

  const annualServiceCost = 250;
  const depreciationNoService = 692;
  const maintenanceNoService = 0;
  const emergencyRepairsNoService = 250;
  const totalNoService = 942;

  const depreciationWithService = 350; // Lower due to better prevention with maintenance
  const maintenanceWithService = 250;
  const emergencyRepairsWithService = 110;
  const totalWithService = 710;

  const annualSavingsPerUnit = 232;
  const totalAnnualSavings = annualSavingsPerUnit * formData.units;
  const fiveYearSavings = totalAnnualSavings * 5;
  const tenYearSavings = totalAnnualSavings * 10;

  // ROI Calculation: Per unit savings / Per unit costs
  const roiPercentage = ((annualSavingsPerUnit / annualServiceCost) * 100).toFixed(1);

  // Calculate values for the chart component
  const typicalLifespan = 13;
  const extendedLifespan = 20.8; // 60% increase with maintenance
  const remainingLifeNoService = Math.max(0, typicalLifespan - formData.avgAge);
  const remainingLifeWithService = Math.max(0, extendedLifespan - formData.avgAge);

  const calculate = () => {
    if (formData.units > 0) {
      setShowResults(true);
    }
  };

  const handleDownloadReport = (contactData: ContactFormData) => {
    console.log("Download report requested by:", contactData);
    toast({
      title: "Report Download Started",
      description: "Your HVAC ROI report will download shortly.",
    });
    setShowDownloadDialog(false);

    // Create a simple text report
    const reportContent = `
HVAC ROI CALCULATOR REPORT
=========================

Contact Information:
Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone}
${contactData.company ? `Company: ${contactData.company}` : ''}

Property Information:
Units: ${formData.units}
Average Age: ${formData.avgAge} years

Financial Summary:
Annual Savings: $${totalAnnualSavings.toLocaleString()}
Savings per Unit: $${annualSavingsPerUnit}/year
5-Year Savings: $${fiveYearSavings.toLocaleString()}
10-Year Impact: $${tenYearSavings.toLocaleString()}

Cost Breakdown (Per Unit Annually):
- New Install (Amortized): $692 → $350 (saves $342)
- Maintenance: $0 → $250 ($0)
- Emergency Repairs: $250 → $110 (saves $140)
Total Annual Cost: $942 → $710 (saves $232)

Generated on: ${new Date().toLocaleString()}
`.trim();

    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HVAC-ROI-Report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleScheduleConsultation = (contactData: ContactFormData) => {
    console.log("Consultation scheduled by:", contactData);
    toast({
      title: "Request Received",
      description: "We'll contact you shortly to schedule your consultation.",
    });
    setShowScheduleDialog(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, hsl(205 58% 13%) 0%, hsl(205 58% 20%) 40%, hsl(44 28% 94%) 100%)",
        padding: "1rem",
      }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <img
            src={vitalLogo}
            alt="Vital Home Pros Logo"
            style={{
              height: "120px",
              margin: "0 auto 1.5rem",
              display: "block"
            }}
          />
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              color: "hsl(0 0% 100%)",
              marginBottom: "0.5rem",
            }}
          >
            HVAC ROI Calculator
          </h1>
          <p style={{ fontSize: "1.125rem", color: "hsl(209 45% 83%)" }}>
            How much are the new EPA regulations going to cost you?
          </p>
        </div>

        <div
          style={{
            background: "hsl(44 28% 94%)",
            borderRadius: "0.75rem",
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15)",
            padding: "2.5rem",
            marginBottom: "2rem",
            maxWidth: "600px",
            margin: "0 auto 2rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "700", marginBottom: "0.75rem", color: "hsl(205 58% 13%)" }}>
              Calculate Your Savings
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label
                htmlFor="units-input"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "hsl(205 58% 13%)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Number of HVAC Units
              </label>
              <input
                id="units-input"
                type="number"
                min="1"
                max="10000"
                placeholder="Enter number of units"
                value={formData.units || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({ ...formData, units: val === '' ? 0 : (parseInt(val) || 0) });
                }}
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#2563eb";
                  e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              onClick={calculate}
              disabled={!formData.units || formData.units <= 0}
              style={{
                width: "100%",
                background: formData.units > 0 ? "linear-gradient(135deg, hsl(21 70% 46%) 0%, hsl(21 70% 52%) 100%)" : "#9ca3af",
                color: "white",
                fontWeight: "700",
                fontSize: "1.125rem",
                padding: "1.25rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: formData.units > 0 ? "pointer" : "not-allowed",
                transition: "all 0.3s",
                boxShadow: formData.units > 0 ? "0 8px 32px hsl(21 70% 46% / 0.35)" : "none",
              }}
              onMouseEnter={(e) => {
                if (formData.units > 0) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px hsl(21 70% 46% / 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = formData.units > 0 ? "0 8px 32px hsl(21 70% 46% / 0.35)" : "none";
              }}
            >
              Calculate My Savings
            </button>
          </div>
        </div>

        {showResults && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                  borderLeft: "4px solid #22c55e",
                }}
              >
                <h3 style={{ color: "#22c55e", fontWeight: "600", marginBottom: "0.5rem" }}>
                  Annual Savings
                </h3>
                <div style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#111827" }}>
                  ${totalAnnualSavings.toLocaleString()}
                </div>
                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "0.5rem" }}>
                  ${annualSavingsPerUnit}/unit per year
                </p>
              </div>

              <div
                style={{
                  background: "hsl(44 28% 94%)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                  borderLeft: "4px solid hsl(205 58% 13%)",
                }}
              >
                <h3 style={{ color: "hsl(205 58% 13%)", fontWeight: "600", marginBottom: "0.5rem" }}>
                  5-Year Savings
                </h3>
                <div style={{ fontSize: "1.875rem", fontWeight: "bold", color: "hsl(205 58% 13%)" }}>
                  ${fiveYearSavings.toLocaleString()}
                </div>
                <p style={{ fontSize: "0.875rem", color: "hsl(205 30% 35%)", marginTop: "0.5rem" }}>
                  Total portfolio savings
                </p>
              </div>

              <div
                style={{
                  background: "hsl(44 28% 94%)",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  padding: "1.5rem",
                  borderLeft: "4px solid hsl(21 70% 46%)",
                }}
              >
                <h3 style={{ color: "hsl(21 70% 46%)", fontWeight: "600", marginBottom: "0.5rem" }}>
                  10-Year Impact
                </h3>
                <div style={{ fontSize: "1.875rem", fontWeight: "bold", color: "hsl(21 70% 46%)" }}>
                  ${tenYearSavings.toLocaleString()}
                </div>
                <p style={{ fontSize: "0.875rem", color: "hsl(205 30% 35%)", marginTop: "0.5rem" }}>
                  Long-term value creation
                </p>
              </div>
            </div>

            {/* EPA Regulations Comparison Chart */}
            <div
              style={{
                background: "hsl(44 28% 94%)",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
              }}
            >
              {/* Row A - Headline bar with EPA link */}
              <div style={{
                background: "hsl(0 0% 100%)",
                border: "2px solid hsl(21 70% 46%)",
                borderRadius: "0.5rem",
                padding: "1rem",
                marginBottom: "1.5rem",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  color: "hsl(205 58% 13%)",
                  marginBottom: "0.75rem"
                }}>
                  2025 Refrigerant Change = Any failure ➜ Full system replacement
                </div>

                <a
                  href="https://www.epa.gov/climate-hfcs-reduction/technology-transitions-hfc-restrictions-sector"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit", display: "inline-block" }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      gap: "0.5rem",
                      alignItems: "center",
                      padding: "0.5rem 1rem",
                      background: "white",
                      borderRadius: "0.375rem",
                      border: "1px solid hsl(209 45% 83%)",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      color: "hsl(205 58% 13%)",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "hsl(209 45% 83%)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                    }}
                  >
                    <Lightbulb size={16} />
                    <span>Learn more about EPA regulations</span>
                  </div>
                </a>
              </div>

              {/* Row B - Big BEFORE vs AFTER panels */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginBottom: "1.5rem",
                maxWidth: "900px",
                margin: "0 auto 1.5rem"
              }}>
                {/* Left card - PRE-2025 */}
                <div style={{
                  background: "white",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  {/* Top label pill */}
                  <div style={{
                    background: "hsl(209 45% 83%)",
                    padding: "0.5rem",
                    textAlign: "center"
                  }}>
                    <span style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "hsl(205 58% 13%)"
                    }}>
                      PRE-2025
                    </span>
                  </div>

                  {/* Center - two separate blocks */}
                  <div style={{
                    padding: "2rem",
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    minHeight: "200px",
                    flex: 1
                  }}>
                    <div style={{
                      background: "hsl(205 58% 13%)",
                      color: "white",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      textAlign: "center",
                      minWidth: "100px"
                    }}>
                      <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Condenser</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>$4k</div>
                    </div>
                    <div style={{
                      background: "hsl(205 58% 13%)",
                      color: "white",
                      padding: "1rem",
                      borderRadius: "0.375rem",
                      textAlign: "center",
                      minWidth: "100px"
                    }}>
                      <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Heater/Coil</div>
                      <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>$4k</div>
                    </div>
                  </div>

                  {/* Bottom footer */}
                  <div style={{
                    background: "hsl(209 45% 83%)",
                    padding: "0.5rem",
                    textAlign: "center"
                  }}>
                    <span style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "hsl(205 58% 13%)"
                    }}>
                      Replace Either
                    </span>
                  </div>
                </div>

                {/* Right card - POST-2025 */}
                <div style={{
                  background: "white",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}>
                  {/* Top label pill */}
                  <div style={{
                    background: "hsl(0 84% 95%)",
                    padding: "0.5rem",
                    textAlign: "center"
                  }}>
                    <span style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "hsl(0 84% 60%)"
                    }}>
                      POST-2025
                    </span>
                  </div>

                  {/* Center - stacked column with lock icon */}
                  <div style={{
                    padding: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                    position: "relative",
                    flex: 1
                  }}>
                    <div style={{
                      position: "relative",
                      minWidth: "120px"
                    }}>
                      <div style={{
                        background: "hsl(0 84% 60%)",
                        color: "white",
                        padding: "1rem",
                        borderTopLeftRadius: "0.375rem",
                        borderTopRightRadius: "0.375rem",
                        textAlign: "center",
                        borderBottom: "2px dashed white"
                      }}>
                        <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Condenser</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>$4.5k</div>
                      </div>
                      <div style={{
                        background: "hsl(0 84% 50%)",
                        color: "white",
                        padding: "1rem",
                        borderBottomLeftRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                        textAlign: "center"
                      }}>
                        <div style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Heater/Coil</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>$4.5k</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom footer */}
                  <div style={{
                    background: "hsl(0 84% 95%)",
                    padding: "0.5rem",
                    textAlign: "center"
                  }}>
                    <span style={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "hsl(0 84% 60%)"
                    }}>
                      Must Replace Both!
                    </span>
                  </div>
                </div>
              </div>

              {/* Row C - Dollar math strip */}
              <div style={{
                background: "white",
                border: "2px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1.5rem"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                  marginBottom: "0.75rem"
                }}>
                  <div style={{
                    background: "hsl(209 45% 90%)",
                    border: "2px solid hsl(205 58% 13%)",
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1.5rem"
                  }}>
                    <div style={{ fontSize: "0.875rem", color: "hsl(205 58% 13%)", marginBottom: "0.25rem" }}>Before</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "hsl(205 58% 13%)" }}>$4k</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(205 30% 35%)" }}>typical single failure</div>
                  </div>

                  <div style={{ fontSize: "2rem", color: "hsl(21 70% 46%)", fontWeight: "bold" }}>➜</div>

                  <div style={{
                    background: "hsl(0 84% 95%)",
                    border: "2px solid hsl(0 84% 60%)",
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1.5rem"
                  }}>
                    <div style={{ fontSize: "0.875rem", color: "hsl(0 84% 50%)", marginBottom: "0.25rem" }}>After</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "hsl(0 84% 60%)" }}>$9k</div>
                    <div style={{ fontSize: "0.75rem", color: "hsl(205 30% 35%)" }}>same failure forces both</div>
                  </div>
                </div>

                <div style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  textAlign: "center",
                  fontStyle: "italic"
                }}>
                  Prices are typical examples; actual quotes vary.
                </div>
              </div>

            </div>

            <div
              style={{
                background: "hsl(44 28% 94%)",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
                position: "relative"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  Per Unit Savings
                </h3>

                {/* Green Sticker Badge */}
                <div
                  style={{
                    background: "#10b981",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    boxShadow: "0 4px 12px -2px rgba(16, 185, 129, 0.3)",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    whiteSpace: "nowrap"
                  }}
                >
                  Preventative Maintenance{' '}
                  <span style={{
                    borderBottom: "2px solid white",
                    paddingBottom: "1px"
                  }}>
                    Saves
                  </span>
                </div>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #d1d5db" }}>
                      <th style={{ textAlign: "left", padding: "0.75rem 1rem" }}>
                        Cost Category
                      </th>
                      <th style={{ textAlign: "right", padding: "0.75rem 1rem" }}>
                        Without Maintenance
                      </th>
                      <th style={{ textAlign: "right", padding: "0.75rem 1rem" }}>
                        With Maintenance
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "0.75rem 1rem",
                          color: "#22c55e",
                        }}
                      >
                        Savings
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "0.75rem 1rem" }}>Replacement Cost per Unit</td>
                      <td style={{ textAlign: "right", padding: "0.75rem 1rem" }}>$692</td>
                      <td style={{ textAlign: "right", padding: "0.75rem 1rem" }}>$350</td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "0.75rem 1rem",
                          color: "#22c55e",
                        }}
                      >
                        $342
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "0.75rem 1rem" }}>Emergency Repairs</td>
                      <td style={{ textAlign: "right", padding: "0.75rem 1rem" }}>$250</td>
                      <td style={{ textAlign: "right", padding: "0.75rem 1rem" }}>$110</td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "0.75rem 1rem",
                          color: "#22c55e",
                        }}
                      >
                        $140
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                      <td style={{ padding: "0.75rem 1rem" }}>Maintenance</td>
                      <td style={{ textAlign: "right", padding: "0.75rem 1rem" }}>$0</td>
                      <td style={{ textAlign: "right", padding: "0.75rem 1rem", color: "#000000" }}>$250</td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "0.75rem 1rem",
                          color: "#ef4444",
                        }}
                      >
                        -$250
                      </td>
                    </tr>
                    <tr style={{ background: "#f9fafb", fontWeight: "bold" }}>
                      <td style={{ padding: "0.75rem 1rem" }}>TOTAL PER UNIT SAVINGS</td>
                      <td style={{ textAlign: "right", padding: "0.75rem 1rem" }}>$942</td>
                      <td style={{ textAlign: "right", padding: "0.75rem 1rem" }}>$710</td>
                      <td
                        style={{
                          textAlign: "right",
                          padding: "0.75rem 1rem",
                          color: "#22c55e",
                          fontSize: "1.125rem",
                        }}
                      >
                        $232
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Our Chart Component */}
            <div
              style={{
                background: "hsl(44 28% 94%)",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>
                10-Year HVAC Forecast
              </h3>
              <DepreciationChart
                remainingLifeNoService={remainingLifeNoService}
                remainingLifeWithService={remainingLifeWithService}
                units={formData.units}
                formData={formData}
              />
            </div>

            {/* Info Callout */}
            <div
              style={{
                background: "linear-gradient(135deg, hsl(209 45% 90%) 0%, hsl(209 45% 83%) 100%)",
                border: "2px solid hsl(205 58% 13%)",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                textAlign: "center",
              }}
            >
              <a
                href="https://worktrek.com/blog/hvac-maintenance-statistics/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit", display: "inline-block" }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                    background: "white",
                    borderRadius: "0.375rem",
                    border: "1px solid hsl(209 45% 83%)",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    color: "hsl(205 58% 13%)",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "hsl(209 45% 83%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  <Lightbulb size={16} />
                  <span>With rising replacement costs, it's never been more important to keep existing HVAC systems operational</span>
                </div>
              </a>
            </div>

            <div
              style={{
                background: "linear-gradient(to right, hsl(120 60% 96%), hsl(209 45% 90%))",
                border: "2px solid #22c55e",
                borderRadius: "0.5rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "2rem", textAlign: "center" }}>
                Preventative Maintenance Summary
              </h3>
              {/* Hero Section - Total Portfolio Savings */}
              <div
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  padding: "2.5rem 2rem",
                  borderRadius: "0.75rem",
                  marginBottom: "2rem",
                  boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.3)",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-10%",
                  width: "300px",
                  height: "300px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  filter: "blur(60px)"
                }}></div>

                <div style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: "600px",
                  margin: "0 auto",
                  width: "100%"
                }}>
                  <div style={{
                    fontSize: "0.875rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    marginBottom: "1rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }}>
                    Your Portfolio Savings This Year
                  </div>

                  <div style={{
                    fontSize: "4.5rem",
                    fontWeight: "bold",
                    color: "white",
                    lineHeight: "1",
                    marginBottom: "1rem",
                    textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
                  }}>
                    ${totalAnnualSavings.toLocaleString()}
                  </div>

                  <div style={{
                    fontSize: "1.125rem",
                    color: "rgba(255, 255, 255, 0.95)",
                    fontWeight: "500",
                    marginBottom: "1.5rem"
                  }}>
                    With preventative maintenance across {formData.units} units
                  </div>

                  <div style={{
                    paddingTop: "1.5rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                    width: "100%",
                    marginBottom: "1.5rem"
                  }}>
                    <div style={{
                      fontSize: "1rem",
                      color: "rgba(255, 255, 255, 0.85)",
                      fontWeight: "500"
                    }}>
                      Save {((annualSavingsPerUnit / totalNoService) * 100).toFixed(1)}% on HVAC today!
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "1rem",
                      width: "100%",
                      maxWidth: "500px"
                    }}
                  >
                    <Button
                      onClick={() => setShowScheduleDialog(true)}
                      size="lg"
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, hsl(21 70% 46%) 0%, hsl(21 70% 52%) 100%)",
                        color: "white",
                        boxShadow: "0 8px 32px hsl(21 70% 46% / 0.35)",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 12px 40px hsl(21 70% 46% / 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 8px 32px hsl(21 70% 46% / 0.35)";
                      }}
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule Consultation
                    </Button>
                    <Button
                      onClick={() => setShowDownloadDialog(true)}
                      size="lg"
                      style={{
                        width: "100%",
                        background: "hsl(205 58% 13%)",
                        color: "white",
                        boxShadow: "0 4px 20px hsl(205 58% 13% / 0.3)",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 10px 35px hsl(205 58% 13% / 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 20px hsl(205 58% 13% / 0.3)";
                      }}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <h4 style={{ fontWeight: "600", fontSize: "1.125rem", marginBottom: "0.75rem" }}>
                    Key Benefits
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
                      <span>10% off all repairs/replacements</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
                      <span>Reduce annual new install cost by $258 per unit</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
                      <span>67% reduction in emergency repair costs</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
                      <span>Extended equipment lifespan</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#22c55e", fontWeight: "bold" }}>✓</span>
                      <span>Predictable maintenance costs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 style={{ fontWeight: "600", fontSize: "1.125rem", marginBottom: "0.75rem" }}>
                    Program Details
                  </h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontWeight: "bold" }}>•</span>
                      <span>Bi-annual filter replacement</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontWeight: "bold" }}>•</span>
                      <span>Coil and condenser cleaning</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontWeight: "bold" }}>•</span>
                      <span>Refrigerant level adjustment</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontWeight: "bold" }}>•</span>
                      <span>Electrical system inspection</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontWeight: "bold" }}>•</span>
                      <span>Ductwork damage inspection</span>
                    </li>
                    <li
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontWeight: "bold" }}>•</span>
                      <span>Condenser fan and motor inspection</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Contact Dialogs */}
        <ContactDialog
          open={showDownloadDialog}
          onOpenChange={setShowDownloadDialog}
          onSubmit={handleDownloadReport}
          title="Download Your ROI Report"
          description="Enter your contact information to receive your detailed HVAC ROI analysis."
        />
        <ContactDialog
          open={showScheduleDialog}
          onOpenChange={setShowScheduleDialog}
          onSubmit={handleScheduleConsultation}
          title="Schedule a Consultation"
          description="Let's discuss how we can help optimize your HVAC maintenance program."
        />
      </div>
    </div>
  );
}
