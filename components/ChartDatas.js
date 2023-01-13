import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartData = ({ chart, name }) => {
  const formatData = (data) => {
    return data.t.map((el, index) => {
      const date = new Date(el * 1000);
      return {
        x: date.toLocaleString("en-us", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        y: data.i[index],
      };
    });
  };
  const formatData1 = (data) => {
    return data.t.map((el, index) => {
      const date = new Date(el * 1000);
      return {
        x: date.toLocaleString("en-us", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        y: data.w[index],
      };
    });
  };
  const formatData2 = (data) => {
    return data.t.map((el, index) => {
      const date = new Date(el * 1000);
      return {
        x: date.toLocaleString("en-us", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        y: data.v[index],
      };
    });
  };
  const formatData3 = (data) => {
    return data.t.map((el, index) => {
      const date = new Date(el * 1000);
      return {
        x: date.toLocaleString("en-us", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        y: data.wp[index],
      };
    });
  };

  const myChartData = {
    intraDa: formatData(chart),
    weightedIntra: formatData1(chart),
    volume: formatData2(chart),
    weightedPCR: formatData3(chart),
  };
  const { intraDa, weightedIntra, volume, weightedPCR } = myChartData;
  const options = {
    title: {
      text: name,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    stroke: {
      curve: "smooth",
    },
    chart: {
      id: "stock data",
    },
    stroke: {
      width: 3,
    },
    xaxis: {
      tickAmount: 0,
      tickInterval: 0.5,
    },
    yaxis: {
      forceNiceScale: true,
      decimalsInFloat: 1,
      // tickAmount: 3,
    },
  };

  const series = [
    {
      name: "IP",
      data: intraDa,
    },
    {
      name: "WIP",
      data: weightedIntra,
    },
    {
      name: "VWP",
      data: volume,
    },
    {
      name: "WP",
      data: weightedPCR,
    },
  ];
  return (
    <Charts
      options={options}
      series={series}
      type="line"
      width={`100%`}
      height={`100%`}
    />
  );
};

export default ChartData;
