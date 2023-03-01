import axios from "axios";
import { useQuery } from "react-query";


export const fetchData = async (value) => {
  const response = await axios.get(
    `${process.env.CORS_URL}https://www.nseindia.com/api/option-chain-indices?symbol=${value}`
  );
  const data = response.data;
  return data;
};

export const useOptionChain = (value) => {
  return useQuery(["option-chain", value], () => fetchData(value), {
    refetchIntervalInBackground: 120000,
    retry: 10,
    retryDelay: 10000,

  });
};
