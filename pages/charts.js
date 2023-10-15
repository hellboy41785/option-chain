import { useOptionChainStore } from "../query/useOptionChainStore";
import { useStockDataQuery } from "../query/useStockData";
import goBack from "../public/goBack.png";
import Image from "next/image";
import Link from "next/link";
import Loader from "../components/Loader";
import ChartData from "../components/ChartDatas";
import { useState } from "react";

const Charts = () => {
  const contracts = useOptionChainStore((state) => state.contracts);
  const addContracts = useOptionChainStore((state) => state.addContracts);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const { data, isLoading } = useStockDataQuery(contracts);

  if (isLoading) return <Loader />;

  const chart = data[0];

  const handleChange = (event) => {
    event.preventDefault();
    addContracts(event.target.value);
  };

  const datesSet = new Set();
  const currentDates = chart.t
    .map((timestamp) => {
      const dateString = new Date(timestamp * 1000).toISOString().split("T")[0];
      if (!datesSet.has(dateString)) {
        datesSet.add(dateString);
        return dateString;
      }
      return undefined; // Skip duplicates
    })
    .filter((date) => date !== undefined);
  return (
    <div className="h-screen p-3 space-y-4">
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
      <div className="flex justify-center w-full ">
        <select
          className="w-full max-w-xs select select-accent"
          onChange={(e)=>setDate(e.target.value)}
          value={date}
        >
          {currentDates.reverse().map((el, i) => (
            <option key={i}>{el}</option>
          ))}
          {/* <option>FINNIFTY</option> */}
        </select>
      </div>
      <div className="flex justify-center  px-20  w-full h-[85%] ">
        <div className="w-full h-full ">
          <ChartData chart={chart} name={contracts} date={date}/>
        </div>
      </div>
    </div>
  );
};

export default Charts;
