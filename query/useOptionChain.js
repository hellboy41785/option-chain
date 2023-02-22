import axios from "axios";
import { useQuery } from "react-query";



export const fetchData = async (value) => {
  const response = await axios.get(
    `http://localhost:5000/corsbypass?url=https://www.nseindia.com/api/option-chain-indices?symbol=${value}`
  );
  const data = response.data;
  return data;
};

export const useOptionChain = (value) => {
  return useQuery(["option-chain", value], () => fetchData(value), {
    refetchIntervalInBackground: 120000,
  });
};
