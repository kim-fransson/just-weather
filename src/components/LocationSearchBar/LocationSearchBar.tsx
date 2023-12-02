import useSWR from "swr";
import { LocationData, searchByQuery } from "../../api";
import { Autocomplete } from "../Autocomplete";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { Item } from "react-stately";
import { joinObject } from "../../utils";

export interface LocationSearchBarProps {
  onLocationSelected: (location: LocationData) => void;
}

export const LocationSearchBar = ({
  onLocationSelected,
}: LocationSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    isLoading,
    data: locations,
    mutate,
  } = useSWR(debouncedSearchQuery, searchByQuery, {
    fallbackData: [],
  });

  useEffect(() => {
    mutate();
  }, [debouncedSearchQuery, mutate]);

  return (
    <Autocomplete
      items={locations}
      onInputChange={setSearchQuery}
      isLoading={isLoading}
      aria-label="Search location for weather forecast"
      placeholder="Search for cities"
      onSelectionChange={(key) => {
        const selectedKey = Number.parseInt(key as string);
        const selectedLocation = locations?.find(
          (location) => selectedKey === location.id,
        );
        if (selectedLocation) {
          onLocationSelected(selectedLocation);
        }
      }}
    >
      {(item) => (
        <Item key={item.id}>
          {joinObject(item, ["name", "region", "country"])}
        </Item>
      )}
    </Autocomplete>
  );
};
