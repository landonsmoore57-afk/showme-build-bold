import { PropertyValueChart } from "./PropertyValueChart";

interface DepreciationChartProps {
  remainingLifeNoService: number;
  remainingLifeWithService: number;
  units: number;
  formData: {
    avgAge: number;
  };
}

export function DepreciationChart({ units }: DepreciationChartProps) {
  const generateDepreciationData = () => {
    const years = Array.from({ length: 10 }, (_, i) => i + 1);
    const noServiceData: number[] = [];
    const withServiceData: number[] = [];

    const baseDepreciationNoService = 692;
    const baseMaintenanceNoService = 0;
    const baseRepairsNoService = 250;
    const baseDepreciationWithService = 350;
    const baseMaintenanceWithService = 250;
    const baseRepairsWithService = 110;
    const inflationRate = 0.05;
    const maintenanceInflation = 0.03;

    for (let year = 1; year <= 10; year++) {
      const inflationMultiplier = Math.pow(1 + inflationRate, year - 1);
      const maintInflationMultiplier = Math.pow(1 + maintenanceInflation, year - 1);
      
      const depreciationNoService = baseDepreciationNoService * inflationMultiplier;
      const repairsNoService = baseRepairsNoService * inflationMultiplier;
      const costPerUnitNoService = depreciationNoService + baseMaintenanceNoService + repairsNoService;
      
      const depreciationWithService = baseDepreciationWithService * inflationMultiplier;
      const maintenanceWithService = baseMaintenanceWithService * maintInflationMultiplier;
      const repairsWithService = baseRepairsWithService * inflationMultiplier;
      const costPerUnitWithService = depreciationWithService + maintenanceWithService + repairsWithService;
      
      noServiceData.push(costPerUnitNoService * units);
      withServiceData.push(costPerUnitWithService * units);
    }

    return { years, noServiceData, withServiceData };
  };

  const { noServiceData, withServiceData } = generateDepreciationData();

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground text-center py-4">
        Chart visualization - Install chart.js to see full visualization
      </div>
      <PropertyValueChart noServiceData={noServiceData} withServiceData={withServiceData} />
    </div>
  );
}
