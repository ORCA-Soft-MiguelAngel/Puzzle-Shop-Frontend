import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "react-query";
import axios from "axios";

export const GET_USER_ORDERS = (userId: string) => `orders/users/${userId}`;
export const GET_ORDER_BY_ID = (orderId: string) => `orders/${orderId}`;
export const CREATE_ORDER = "orders";
export const UPDATE_ORDER = (orderId: string) => `orders/${orderId}`;
export const DELETE_ORDER = (orderId: string) => `orders/${orderId}`;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useFetchData = <T>(
  endpoint: string
): UseQueryResult<T, unknown> => {
  return useQuery(endpoint, async () => {
    const { data } = await api.get<T>(endpoint);
    return data;
  });
};

export const useMutateData = <T, U>(
  endpoint: string
): UseMutationResult<T, unknown, U, unknown> => {
  return useMutation(async (newData: U) => {
    const { data } = await api.post<T>(endpoint, newData);
    return data;
  });
};

export const usePutData = <T, U>(
  endpoint: string
): UseMutationResult<T, unknown, U, unknown> => {
  return useMutation(async (updatedData: U) => {
    const { data } = await api.put<T>(endpoint, updatedData);
    return data;
  });
};
