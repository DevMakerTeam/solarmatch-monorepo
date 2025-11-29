import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Spinner } from "@repo/ui/spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BiddingStatsChartData = {
  label: string;
  date: string;
  count: number;
};

type BiddingStatsChartProps = {
  chartData?: BiddingStatsChartData[];
  isLoading?: boolean;
};

const BiddingStatsChart = ({
  chartData,
  isLoading,
}: BiddingStatsChartProps) => {
  // 차트 옵션
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            font: {
              size: 12,
            },
          },
        },
      },
    }),
    []
  );

  // 차트 데이터 구성
  const chartDataConfig = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return {
        labels: [] as string[],
        datasets: [
          {
            label: "입찰 건수",
            data: [] as number[],
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
        ],
        maxY: 1,
      };
    }

    const labels = chartData.map(item => item.label);
    const data = chartData.map(item => item.count);

    // 최대값 계산
    const maxValue = Math.max(...data, 0);
    const maxY = maxValue === 0 ? 1 : Math.ceil(maxValue * 1.2);

    return {
      labels,
      datasets: [
        {
          label: "입찰 건수",
          data,
          backgroundColor: data.map((_, index) =>
            index % 2 === 0 ? "rgba(0, 4, 64, 1)" : "rgba(182, 183, 185, 1)"
          ),
          maxBarThickness: 50,
        },
      ],
      maxY,
    };
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="w-full h-[240px] flex justify-center items-center">
        <Spinner size="lg" className="text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full h-[240px]">
      <Bar
        data={{
          labels: chartDataConfig.labels,
          datasets: chartDataConfig.datasets,
        }}
        options={{
          ...chartOptions,
          scales: {
            ...chartOptions.scales,
            y: {
              ...chartOptions.scales.y,
              max: chartDataConfig.maxY,
            },
          },
        }}
      />
    </div>
  );
};

export default BiddingStatsChart;
