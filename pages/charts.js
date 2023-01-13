import { useOptionChainStore } from "../query/useOptionChainStore";
import { useStockDataQuery } from "../query/useStockData";
import goBack from "../public/goBack.png";
import Image from "next/image";
import Link from "next/link";
import Loader from "../components/Loader";
import ChartData from "../components/ChartDatas";

const Charts = () => {
  const contracts = useOptionChainStore((state) => state.contracts);
  const addContracts = useOptionChainStore((state) => state.addContracts);

  const { data, isLoading } = useStockDataQuery(contracts);

  if (isLoading) return <Loader />;

  const chart = data[0];

  const handleChange = (event) => {
    event.preventDefault();
    addContracts(event.target.value);
  };

  // console.log(chart);
  return (
    <div className="p-3 h-screen ">
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
      <div className="flex justify-center  px-20  w-full h-[85%] ">
        <div className=" w-full h-full  ">
          <ChartData chart={chart} name={contracts} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
