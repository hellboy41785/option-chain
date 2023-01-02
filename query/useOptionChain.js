import axios from "axios";
import { useQuery } from "react-query";




export const fetchData = async (value) => {
  
  const response = await axios.get(
    `https://www.nseindia.com/api/option-chain-indices?symbol=${value}`
  );
  const data = response.data;
  return data;
};

export const useOptionChain = (value) => {
  return useQuery(["option-chain",value], () => fetchData(value),
  {
    refetchInterval: 120000
  }
  );
};