import axios from "axios";
import { useQuery } from "react-query";

export const fetchStockData = async (value) => {
  const response = await axios.get(
    `https://stockapi-production.up.railway.app/api/v1/${value}`
  );
  const data = response.data;
  return data;
};

export const useStockDataQuery = (value) => {
  return useQuery(["stockChart",value], () => fetchStockData(value), {
    refetchInterval: 180000,
  });
};
