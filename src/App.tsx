import { useEffect, useState } from "react";
import Logo from "./assets/icons/logo.svg?react";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";
import { joinObject } from "./utils";
import { Item } from "react-stately";
import { useDebounce } from "@uidotdev/usehooks";
import { LocationAndTemperature } from "./components/LocationAndTemperature/LocationAndTemperature";
import { API_CACHE_KEYS, LocationData, search } from "./api";
import { HourlyForecast } from "./components/HourlyForecast/HourlyForecast";
import useSWR from "swr";
import { WeatherDetails } from "./components/WeatherDetails/WeatherDetails";

/*
todo: fix geolocation auto-selection
todo: don't include mockServiceWorker in build
todo: loading for dropdown not working properly
*/
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState<LocationData>();

  // const geoLocationState = useGeolocation();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    isLoading,
    data: locations,
    mutate,
  } = useSWR(API_CACHE_KEYS.SEARCH, () => search(debouncedSearchQuery), {
    fallbackData: [],
  });

  useEffect(() => {
    mutate();
  }, [debouncedSearchQuery, mutate]);

  // useEffect(() => {
  //   if (!geoLocationState.loading) {
  //     if (!geoLocationState.error) {
  //       setSearchQuery(
  //         `${geoLocationState.latitude},${geoLocationState.longitude}`,
  //       );
  //     }
  //   }
  // }, [geoLocationState]);

  return (
    <main className="mx-auto h-screen border px-10 pb-12 pt-8 lg:px-60">
      <header className="flex items-center gap-10">
        <Logo className="shrink-0" />
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
              setCurrentLocation(selectedLocation);
            }
          }}
        >
          {(item) => (
            <Item key={item.id}>
              {joinObject(item, ["name", "region", "country"])}
            </Item>
          )}
        </Autocomplete>
      </header>
      {currentLocation && <LocationAndTemperature location={currentLocation} />}
      {currentLocation && <HourlyForecast location={currentLocation} />}
      {currentLocation && <WeatherDetails location={currentLocation} />}
    </main>
  );
}
