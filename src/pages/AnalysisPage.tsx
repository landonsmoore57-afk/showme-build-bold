import { Helmet } from "react-helmet-async";
import { HVACCalculator } from "@/components/HVACCalculator";

export default function AnalysisPage() {
  return (
    <>
      <Helmet>
        <title>EPA Compliance Cost Calculator | Multi-Family HVAC Analysis</title>
        <meta
          name="description"
          content="Calculate the financial impact of new EPA HVAC regulations on your multi-family property. Understand compliance costs and maintenance requirements."
        />
      </Helmet>
      <HVACCalculator />
    </>
  );
}
