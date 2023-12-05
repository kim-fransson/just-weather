import useSWR from "swr";
import { LocationData, searchByQuery } from "../../api";
import { Autocomplete } from "./Autocomplete";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { GeoLocationButton } from "../GeoLocationButton";
import { twMerge } from "tailwind-merge";
export interface LocationSearchBarProps {
  onLocationSelected: (location: LocationData) => void;
  className?: string;
}

export const LocationSearchBar = ({
  onLocationSelected,
  className,
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
    <div className={twMerge("relative", className)}>
      <Autocomplete
        searchResults={locations}
        onSearchQueryChanged={setSearchQuery}
        searchQuery={searchQuery}
        isLoading={isLoading}
        aria-label="Search location for weather forecast"
        placeholder="Search for cities"
        onLocationSelected={onLocationSelected}
      />

      <GeoLocationButton
        onGeoLocationApproval={(lat, lon) => {
          setSearchQuery(`${lat}, ${lon}`);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};
