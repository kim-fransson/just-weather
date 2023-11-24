import useSWR, { Fetcher } from "swr";
import { LocationData, search } from "../api";

export const useSearch = (q: string) => {
  const fetcher: Fetcher<LocationData[], string> = (q) => search(q);
  const { data, error, isLoading } = useSWR(q, fetcher);

  return {
    locations: data || [],
    isLoading,
    isError: error,
  };
};
