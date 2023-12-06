import useSWR from "swr";
import { LocationData, searchByQuery } from "../../api";
import { Autocomplete } from "./Autocomplete";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
export interface LocationSearchBarProps {
  onLocationSelected: (location: LocationData) => void;
  className?: string;
}

export const LocationSearchBar = ({
  onLocationSelected,
}: LocationSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    isLoading,
    data: locations,
    mutate,
  } = useSWR(debouncedSearchQuery || null, searchByQuery, {
    fallbackData: [],
  });

  useEffect(() => {
    mutate();
  }, [debouncedSearchQuery, mutate]);

  return (
    <Autocomplete
      searchResults={locations}
      onSearchQueryChanged={setSearchQuery}
      searchQuery={searchQuery}
      isLoading={isLoading}
      aria-label="Search location for weather forecast"
      placeholder="Search for cities"
      onLocationSelected={onLocationSelected}
    />
  );
};
