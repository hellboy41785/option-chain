import { Fragment, useState } from "react";
import { useOptionChainStore } from "../query/useOptionChainStore";

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

  const weightCall = filtered?.map(
    (item, index) => item.CE.changeinOpenInterest * item.CE.lastPrice
  );

  const weightCallData = weightCall.reduce((acc, current) => acc + current, 0);

  const weightPut = filtered?.map(
    (item, index) => item.PE.changeinOpenInterest * item.PE.lastPrice
  );

  const weightPutData = weightPut.reduce((acc, current) => acc + current, 0);

  const weightAge = (weightPutData / weightCallData).toFixed(2);

  //Weighted PCR

  const weightedCall = filtered?.map(
    (item, index) => item.CE.openInterest * item.CE.lastPrice
  );

  const weightedCallData = weightedCall.reduce(
    (acc, current) => acc + current,
    0
  );

  const weightedPut = filtered?.map(
    (item, index) => item.PE.openInterest * item.PE.lastPrice
  );

  const weightedPutData = weightedPut.reduce(
    (acc, current) => acc + current,
    0
  );

  const weightedPCR = (weightedPutData / weightedCallData).toFixed(2);

  // console.log();
  const handleChange = (event) => {
    event.preventDefault();
    addContracts(event.target.value);
  };

  let no = 0;
  return (
    <div className="p-2 overflow-x-auto">
      <div className="space-x-3">
        <select
          className="w-full max-w-xs select select-accent"
          onChange={handleChange}
          value={contracts}
        >
          <option>NIFTY</option>
          <option>BANKNIFTY</option>
          <option>FINNIFTY</option>
        </select>
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn m-1">
          Intra DayPcr = {intraDayPCR}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 opacity-30"
          >
            <li className="text-sm ">
              <a>Change In OI</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn m-1">
          Weighted Intra DayPcr = {weightAge}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 opacity-30"
          >
            <li className="text-sm ">
              <a>Change In OI <span className="text-red-600">X</span>  LTP</a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn m-1">
          Weighted Pcr = {weightedPCR}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 opacity-30"
          >
            <li className="text-sm ">
              <a> OI <span className="text-red-600">X</span> LTP</a>
            </li>
          </ul>
        </div>
      </div>
      <table className="table w-full mt-6">
        {/* <!-- head --> */}
        <thead>
          <tr className="text-center">
            <th>No.</th>
            <th>ExpiryDate</th>
            <th>CALL OI</th>
            <th>CALL ChangeInOI</th>
            <th>CALL Last TradedPrice</th>
            <th>StrikePrice</th>
            <th>Put OI</th>
            <th>PUT ChangeInOI</th>
            <th>PUT Last TradedPrice</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}

          {filtered?.map((put, index) => {
            return (
              <Fragment key={index}>
                <tr className="text-sm text-center">
                  <th>{(no = no + 1)}</th>
                  <td>{put.PE?.expiryDate}</td>
                  <td>{put.CE?.openInterest}</td>
                  <td>{put.CE?.changeinOpenInterest}</td>
                  <td>{put.CE?.lastPrice}</td>
                  <td>{put.PE?.strikePrice}</td>
                  <td>{put.PE?.openInterest}</td>
                  <td>{put.PE?.changeinOpenInterest}</td>
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
