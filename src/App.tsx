import { useEffect, useState } from "react";
import Logo from "./assets/icons/logo.svg?react";
import { randomCapital } from "./utils";
import { useGeolocation } from "@uidotdev/usehooks";
import { LocationAndTemperature } from "./components/LocationAndTemperature/LocationAndTemperature";
import { LocationData, search } from "./api";
import { HourlyForecast } from "./components/HourlyForecast/HourlyForecast";
import { WeatherDetails } from "./components/WeatherDetails/WeatherDetails";
import { LocationSearchBar } from "./components/LocationSearchBar";
import useSWRMutation from "swr/mutation";

/*
todo: don't include mockServiceWorker in build
todo: timezones improvements
todo: ref/unify useSWR calls
*/
export default function App() {
  const [currentLocation, setCurrentLocation] = useState<LocationData>();
  const geoLocationState = useGeolocation();

  const { trigger } = useSWRMutation("/search", search, {
    onSuccess: (data) => setCurrentLocation(data[0]),
  });

  useEffect(() => {
    const fetchLocation = async () => {
      if (!geoLocationState.loading) {
        if (!geoLocationState.error) {
          const query = `${geoLocationState.latitude},${geoLocationState.longitude}`;
          trigger(query);
        } else {
          const capital = randomCapital();
          const query = `${capital.lat},${capital.lon}`;
          trigger(query);
        }
      }
    };
    if (!currentLocation) {
      fetchLocation();
    }
  }, [geoLocationState, currentLocation, trigger]);

  return (
    <main className="mx-auto h-screen border px-10 pb-12 pt-8 lg:px-60">
      <header className="flex items-center gap-10">
        <Logo className="shrink-0" />
        <LocationSearchBar onLocationSelected={setCurrentLocation} />
      </header>
      {currentLocation && <LocationAndTemperature location={currentLocation} />}
      {currentLocation && <HourlyForecast location={currentLocation} />}
      {currentLocation && <WeatherDetails location={currentLocation} />}
    </main>
  );
}
