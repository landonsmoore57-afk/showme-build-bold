import { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PropertyValueChart } from "./PropertyValueChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface DepreciationChartProps {
  remainingLifeNoService: number;
  remainingLifeWithService: number;
  units: number;
  formData: {
    avgAge: number;
  };
}

export function DepreciationChart({ units }: DepreciationChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null);
  const generateDepreciationData = () => {
    const years = Array.from({ length: 10 }, (_, i) => i + 1);
    const noServiceData: number[] = [];
    const withServiceData: number[] = [];
    const noServiceBreakdown: Array<{ depreciation: number; repairs: number; maintenance: number }> = [];
    const withServiceBreakdown: Array<{ depreciation: number; repairs: number; maintenance: number }> = [];

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
      
      const totalNoService = costPerUnitNoService * units;
      const totalWithService = costPerUnitWithService * units;
      
      noServiceData.push(totalNoService);
      withServiceData.push(totalWithService);
      
      noServiceBreakdown.push({
        depreciation: depreciationNoService * units,
        repairs: repairsNoService * units,
        maintenance: baseMaintenanceNoService * units,
      });
      
      withServiceBreakdown.push({
        depreciation: depreciationWithService * units,
        repairs: repairsWithService * units,
        maintenance: maintenanceWithService * units,
      });
    }

    return { years, noServiceData, withServiceData, noServiceBreakdown, withServiceBreakdown };
  };

  const { years, noServiceData, withServiceData, noServiceBreakdown, withServiceBreakdown } = generateDepreciationData();

  const data = {
    labels: years.map((y) => `Year ${y}`),
    datasets: [
      {
        label: "No Service",
        data: noServiceData,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 3,
        borderDash: [5, 5],
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(239, 68, 68)",
      },
      {
        label: "With Preventive Maintenance",
        data: withServiceData,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "rgb(16, 185, 129)",
        fill: "-1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 13,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: 600,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            const dataIndex = context.dataIndex;
            const isWithService = context.datasetIndex === 1;

            const breakdown = isWithService
              ? withServiceBreakdown[dataIndex]
              : noServiceBreakdown[dataIndex];

            const formatCurrency = (val: number) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }).format(val);

            const lines = [
              `${label}: ${formatCurrency(value)}`,
              `  • Depreciation: ${formatCurrency(breakdown.depreciation)}`,
              `  • Emergency Repairs: ${formatCurrency(breakdown.repairs)}`,
            ];

            if (isWithService) {
              lines.push(`  • Maintenance: ${formatCurrency(breakdown.maintenance)}`);
            }

            if (isWithService && noServiceData[dataIndex]) {
              const savings = noServiceData[dataIndex] - value;
              lines.push(`  → Saves ${formatCurrency(savings)} vs No Service`);
            }

            return lines;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Number(value));
          },
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Line ref={chartRef} data={data} options={options} />
      <PropertyValueChart noServiceData={noServiceData} withServiceData={withServiceData} />
    </div>
  );
}
