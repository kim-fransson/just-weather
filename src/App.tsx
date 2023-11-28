import { useEffect, useState } from "react";
import Logo from "./assets/icons/logo.svg?react";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";
import { joinObject } from "./utils";
import { Item } from "react-stately";
import { useCurrentWeather, useSearch } from "./hooks";
import { useDebounce, useGeolocation } from "@uidotdev/usehooks";
import { LocationAndTemperature } from "./components/LocationAndTemperature/LocationAndTemperature";

export default function App() {
  const geoLocationState = useGeolocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWeatherQuery, setCurrentWeatherQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 300);

  const { isLoading, locations } = useSearch(debouncedSearchTerm);
  const { currentWeather } = useCurrentWeather(currentWeatherQuery);

  useEffect(() => {
    if (!geoLocationState.loading) {
      if (!geoLocationState.error) {
        setCurrentWeatherQuery(
          `${geoLocationState.latitude},${geoLocationState.longitude}`,
        );
      }
    }
  }, [geoLocationState]);

  return (
    <main className="mx-auto h-screen border px-10 pb-12 pt-8 lg:px-60">
      <header className="flex items-center gap-10">
        <Logo className="shrink-0" />
        <Autocomplete
          items={locations}
          inputValue={searchQuery}
          onInputChange={setSearchQuery}
          isLoading={isLoading}
          aria-label="Search location for weather forecast"
          placeholder="Search for cities"
          onSelectionChange={(key) => {
            const selectedKey = Number.parseInt(key as string);
            const selectedLocation = locations.find(
              (location) => selectedKey === location.id,
            );
            if (selectedLocation) {
              setCurrentWeatherQuery(
                `${selectedLocation.lat},${selectedLocation.lon}`,
              );
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
      {currentWeather && (
        <LocationAndTemperature currentWeather={currentWeather} />
      )}
    </main>
  );
}
