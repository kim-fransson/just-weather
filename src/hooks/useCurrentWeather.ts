import useSWR, { Fetcher } from "swr";
import { CurrentWeather, currentWeather } from "../api";

export const useCurrentWeather = (lat: number, lon: number) => {
  const q = `${lat},${lon}`;
  const fetcher: Fetcher<CurrentWeather, string> = (q) => currentWeather(q);
  const { data, error, isLoading } = useSWR(q, fetcher);

  return {
    currentWeather: data,
    isLoading,
    isError: error,
  };
};
