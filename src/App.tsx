import { useEffect, useState } from "react";
import Logo from "./assets/icons/logo.svg?react";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";
import { joinObject, randomCapital } from "./utils";
import { Item } from "react-stately";
import { useDebounce, useGeolocation } from "@uidotdev/usehooks";
import { LocationAndTemperature } from "./components/LocationAndTemperature/LocationAndTemperature";
import { LocationData, generateCacheKey, getLocation, search } from "./api";
import { HourlyForecast } from "./components/HourlyForecast/HourlyForecast";
import useSWR from "swr";
import { WeatherDetails } from "./components/WeatherDetails/WeatherDetails";
import useSWRMutation from "swr/mutation";

/*
todo: don't include mockServiceWorker in build
todo: check initial loading of App, weird stuff being loaded from storybook etc
todo: timezones improvements
*/
export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLocation, setCurrentLocation] = useState<LocationData>();

  const geoLocationState = useGeolocation();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    isLoading,
    data: locations,
    mutate,
  } = useSWR(
    debouncedSearchQuery
      ? generateCacheKey("SEARCH", debouncedSearchQuery)
      : null,
    () => search(debouncedSearchQuery),
    {
      fallbackData: [],
    },
  );

  const { trigger } = useSWRMutation("/search", getLocation, {
    onSuccess: (data) => setCurrentLocation(data[0]),
  });

  useEffect(() => {
    mutate();
  }, [debouncedSearchQuery, mutate]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!geoLocationState.loading) {
        if (!geoLocationState.error) {
          const query = `${geoLocationState.latitude},${geoLocationState.longitude}`;
          trigger(query);
        } else {
          const capital = randomCapital();
          trigger(`${capital.lat},${capital.lon}`);
        }
      }
    };
    fetchLocation();
  }, [geoLocationState, trigger]);

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
