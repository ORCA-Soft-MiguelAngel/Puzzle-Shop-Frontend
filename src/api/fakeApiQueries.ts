import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

export const GET_FAKE_PRODUCTS = "products";

export const useFetchData = <T>(
  endpoint: string
): UseQueryResult<T, unknown> => {
  const apiUrl = import.meta.env.VITE_FAKE_API_URL;
  return useQuery(endpoint, async () => {
    const { data } = await axios.get<T>(`${apiUrl}/${endpoint}`);
    return data;
  });
};
