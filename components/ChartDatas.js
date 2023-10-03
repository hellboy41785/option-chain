import dynamic from "next/dynamic";
const Charts = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartData = ({ chart, name }) => {
  const formatData = (data) => {
    return data.t
      .map((el, index) => {
        const yValue = data.i[index];
        if (!isNaN(yValue) && yValue >= -4 && yValue <= 4) {
          // Check if yValue is not NaN
          return {
            x: el,
            y: yValue,
          };
        } else {
          return null; // Skip this data point by returning null
        }
      })
      .filter((point) => point !== null); // Filter out the null values
  };
  const formatData1 = (data) => {
    return data.t
      .map((el, index) => {
        const yValue = data.w[index];
        if (!isNaN(yValue ) && yValue >= -4 && yValue <= 4) {
          // Check if yValue is not NaN
          return {
            x: el,
            y: yValue,
          };
        } else {
          return null; // Skip this data point by returning null
        }
      })
      .filter((point) => point !== null);
  };
  const formatData2 = (data) => {
    return data.t
    .map((el, index) => {
      const yValue = data.v[index];
      if (!isNaN(yValue ) && yValue >= -4 && yValue <= 4) {
        // Check if yValue is not NaN
        return {
          x: el,
          y: yValue,
        };
      } else {
        return null; // Skip this data point by returning null
      }
    })
    .filter((point) => point !== null);
  };
  const formatData3 = (data) => {
    return data.t
    .map((el, index) => {
      const yValue = data.wp[index];
      if (!isNaN(yValue ) && yValue >= -4 && yValue <= 4) {
        // Check if yValue is not NaN
        return {
          x: el,
          y: yValue,
        };
      } else {
        return null; // Skip this data point by returning null
      }
    })
    .filter((point) => point !== null);
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
    },
    xaxis: {
      type: "datetime",
      labels: {
        rotate: 0,
        formatter: function (val) {
          const date = new Date(val * 1000);

          return date.toLocaleString("en-us", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
    },
    yaxis: {
      decimalsInFloat: 2,
      tickAmount: 20,
      tickPlacement: "between",
      multiYaxis: true,
      min: -5,
      max: 5
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
