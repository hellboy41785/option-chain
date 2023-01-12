// import Chart from 'react-apexcharts'
import { useOptionChainStore } from "../query/useOptionChainStore";
import dynamic from "next/dynamic";
import { useStockDataQuery, fetchStockData } from "../query/useStockData";
import goBack from "../public/goBack.png";
import Image from "next/image";
import Link from "next/link";
import Loader from "../components/Loader";
const MyCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const Charts = () => {
  const contracts = useOptionChainStore((state) => state.contracts);
  const addContracts = useOptionChainStore((state) => state.addContracts);

  const { data, isLoading } = useStockDataQuery(contracts);

  if (isLoading) return <Loader />;

  const chart = data[0];
  // console.log(chart)

  const formatData = (data) => {
    return data.t.map((el, index) => {
      const date = new Date(el * 1000);
      return {
        x: date.toLocaleTimeString("en-US", {
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
        x: date.toLocaleTimeString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    }),
        y: data.w[index],
      };
    });
  };
  const formatData2 = (data) => {
    return data.t.map((el, index) => {
      const date = new Date(el * 1000);
      return {
        x: date.toLocaleTimeString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    }),
        y: data.v[index],
      };
    });
  };
  const formatData3 = (data) => {
    return data.t.map((el, index) => {
      const date = new Date(el * 1000);
      return {
        x: date.toLocaleTimeString("en-US", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
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
      text: contracts,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 4,
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    // xaxis: {
    //   type : 'datetime'
    // },
    yaxis: {
      forceNiceScale: true,
      decimalsInFloat: 1,
      tickAmount: 8,
      tickInterval: 0.5
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

  const handleChange = (event) => {
    event.preventDefault();
    addContracts(event.target.value);
  };

  return (
    <div className="p-3 ">
      <div className="flex justify-between ">
        <Link href={`/`}>
          <Image
            className="w-[65px] h-[60px]"
            src={goBack}
            width={70}
            height={40}
            alt="back"
          />
        </Link>
        <select
          className="w-full max-w-xs select select-accent"
          onChange={handleChange}
          value={contracts}
        >
          <option>NIFTY</option>
          <option>BANKNIFTY</option>
          {/* <option>FINNIFTY</option> */}
        </select>
      </div>
      <div className=" flex justify-center mt-7">
        <MyCharts
          options={options}
          series={series}
          type="line"
          width={1500}
          height={650}
        />
      </div>
    </div>
  );
};

export default Charts;


