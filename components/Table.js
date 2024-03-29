import { Fragment, useState } from "react";
import { useOptionChainStore } from "../query/useOptionChainStore";
import StockChart from "../public/stockChart.svg";
import Image from "next/image";
import Link from "next/link";

const Table = ({ filtered, total }) => {
  const contracts = useOptionChainStore((state) => state.contracts);
  const addContracts = useOptionChainStore((state) => state.addContracts);

  //Intra DayPcr
  const callChange = filtered.reduce(
    (acc, current) => acc + current.CE?.changeinOpenInterest,
    0
  );
  const putChange = filtered.reduce(
    (acc, current) => acc + current.PE?.changeinOpenInterest,
    0
  );

  const intraDayPCR = (putChange / callChange).toFixed(2);

  // Weighted Intra DayPcr

  const weightCall = filtered?.map((item, index) =>
    item?.CE?.changeinOpenInterest === undefined
      ? 1
      : item.CE.changeinOpenInterest * item.CE.lastPrice
  );

  const weightCallData = weightCall.reduce((acc, current) => acc + current, 0);

  const weightPut = filtered?.map(
    (item, index) => item?.PE?.changeinOpenInterest * item?.PE?.lastPrice
  );

  const weightPutData = weightPut.reduce((acc, current) => acc + current, 0);

  const weightAge = (weightPutData / weightCallData).toFixed(2);

  //Weighted PCR

  const weightedCall = filtered?.map(
    (item, index) => item?.CE?.openInterest * item?.CE?.lastPrice
  );

  const weightedCallData = weightedCall.reduce(
    (acc, current) => acc + current,
    0
  );

  const weightedPut = filtered?.map(
    (item, index) => item?.PE?.openInterest * item?.PE?.lastPrice
  );

  const weightedPutData = weightedPut.reduce(
    (acc, current) => acc + current,
    0
  );

  const weightedPCR = (weightedPutData / weightedCallData).toFixed(2);

  //Volume Weighted PCR

  const volCall = filtered?.map(
    (item, index) => item?.CE?.totalTradedVolume * item?.CE?.lastPrice
  );

  const volWeightedCall = volCall.reduce((acc, current) => acc + current, 0);
  const volPut = filtered?.map(
    (item, index) => item?.PE?.totalTradedVolume * item?.PE?.lastPrice
  );

  const volWeightedPut = volPut.reduce((acc, current) => acc + current, 0);

  const volWeightedPCR = (volWeightedPut / volWeightedCall).toFixed(2);

  const handleChange = (event) => {
    event.preventDefault();
    addContracts(event.target.value);
  };

  let no = 0;
  return (
    <div className="p-2 overflow-x-auto">
      <div className="flex justify-between">
        <div className="w-full">
          <select
            className="w-full max-w-xs select select-accent"
            onChange={handleChange}
            value={contracts}
          >
            <option>NIFTY</option>
            <option>BANKNIFTY</option>
            {/* <option>FINNIFTY</option> */}
          </select>
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="m-1 btn">
              Intra DayPcr = {intraDayPCR}
            </label>
            <ul
              tabIndex={0}
              className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52 opacity-30"
            >
              <li className="text-sm ">
                <a>Change In OI</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="m-1 btn">
              Weighted Intra DayPcr = {weightAge}
            </label>
            <ul
              tabIndex={0}
              className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52 opacity-30"
            >
              <li className="text-sm ">
                <a>
                  Change In OI <span className="text-red-600">X</span> LTP
                </a>
                <a className="text-green-500">
                  CE = {weightCallData.toFixed(3)}
                </a>
                <a className="text-red-600">PE = {weightPutData.toFixed(3)}</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="m-1 btn">
              Volume Weighted PCR = {volWeightedPCR}
            </label>
            <ul
              tabIndex={0}
              className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52 opacity-30"
            >
              <li className="text-sm ">
                <a>
                  {" "}
                  Volume <span className="text-red-600">X</span> LTP
                </a>
                <a className="text-green-500">
                  CE = {volWeightedCall.toFixed(3)}
                </a>
                <a className="text-red-600">PE = {volWeightedPut.toFixed(3)}</a>
              </li>
            </ul>
          </div>
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="m-1 btn">
              Weighted Pcr = {weightedPCR}
            </label>
            <ul
              tabIndex={0}
              className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52 opacity-30"
            >
              <li className="text-sm ">
                <a>
                  {" "}
                  OI <span className="text-red-600">X</span> LTP
                </a>
                <a className="text-green-500">
                  CE = {weightedCallData.toFixed(3)}
                </a>
                <a className="text-red-600">
                  PE = {weightedPutData.toFixed(3)}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Link href={`/charts`}>
            <Image
              className=""
              src={StockChart}
              width={50}
              height={20}
              alt="charts"
            />
          </Link>
        </div>
      </div>
      <table className="table w-full mt-6 table-compact ">
        {/* <!-- head --> */}
        <thead>
          <tr className="text-center">
            <th>No.</th>
            <th>ExpiryDate</th>
            <th>CALL OI</th>
            <th>CALL ChangeInOI</th>
            <th>CE V</th>
            <th>CALL Last TradedPrice</th>
            <th>StrikePrice</th>
            <th>Put OI</th>
            <th>PUT ChangeInOI</th>
            <th>PE V</th>
            <th>PUT Last TradedPrice</th>
          </tr>
        </thead>
        <tbody className="">
          {/* <!-- row 1 --> */}

          {filtered?.map((put, index) => {
            return (
              <Fragment key={index}>
                <tr className="text-sm text-center border border-gray-700">
                  <th>{(no = no + 1)}</th>
                  <td>{put.PE?.expiryDate}</td>
                  <td>{put.CE?.openInterest}</td>
                  <td>{put.CE?.changeinOpenInterest} </td>
                  <td>{put.CE?.totalTradedVolume} </td>
                  <td>{put.CE?.lastPrice}</td>
                  <td className="text-blue-300">{put.PE?.strikePrice}</td>
                  <td>{put.PE?.openInterest}</td>
                  <td>{put.PE?.changeinOpenInterest}</td>
                  <td>{put.PE?.totalTradedVolume}</td>
                  <td>{put.PE?.lastPrice}</td>
                </tr>
              </Fragment>
            );
          })}
          <tr className="text-sm font-bold text-center">
            <th>Total</th>
            <td></td>
            <td>{total?.CE?.totOI}</td>
            <td>{callChange}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{total?.PE?.totOI}</td>
            <td>{putChange}</td>
          </tr>
          {/* <!-- row 2 --> */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
