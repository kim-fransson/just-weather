import { useEffect } from "react";
import Logo from "./assets/icons/logo.svg?react";
import { randomCapital } from "./utils";
import { useSessionStorage } from "@uidotdev/usehooks";
import { LocationAndTemperature } from "./components/LocationAndTemperature/LocationAndTemperature";
import { LocationData, search } from "./api";
import { HourlyForecast } from "./components/HourlyForecast/HourlyForecast";
import { WeatherDetails } from "./components/WeatherDetails/WeatherDetails";
import { LocationSearchBar } from "./components/LocationSearchBar";
import useSWRMutation from "swr/mutation";
import { TempUnitSwitcher } from "./components/TempUnitSwitcher/TempUnitSwitcher";
import { TemperaturePreferenceContext } from "./context/TemperaturePreferenceContext";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "./components/PageError";

/*
todo: rate limit on AWS
todo: credit to weather app
todo: credit bigdevsoon
*/
export default function App() {
  const [currentLocation, setCurrentLocation] = useSessionStorage<
    LocationData | undefined
  >("currentLocation", undefined);

  const [preferCelsius, setPreferCelsius] = useSessionStorage(
    "preferCelsius",
    true,
  );

  const { trigger } = useSWRMutation("/search", search, {
    onSuccess: (data) => setCurrentLocation(data[0]),
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const capital = randomCapital();
      const query = `${capital.lat},${capital.lon}`;
      trigger(query);
    };
    if (!currentLocation) {
      fetchLocation();
    }
  }, [currentLocation, trigger]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-14 px-10 pb-12 pt-8">
      <header className="grid grid-cols-[1fr_min-content] items-center gap-4 sm:flex sm:gap-10">
        <Logo className="shrink-0 justify-self-end" />
        <LocationSearchBar
          onLocationSelected={setCurrentLocation}
          className="col-span-2 flex-1"
        />
        <TempUnitSwitcher
          aria-label="switch unit between fahrenheit and celsius"
          isSelected={preferCelsius}
          onChange={setPreferCelsius}
          className="col-start-2 row-start-1 justify-self-end"
        />
      </header>

      <ErrorBoundary fallback={<PageError />}>
        <div className="flex flex-col gap-6">
          <TemperaturePreferenceContext.Provider value={preferCelsius}>
            <LocationAndTemperature location={currentLocation} />
            <HourlyForecast location={currentLocation} />
            <WeatherDetails location={currentLocation} />
          </TemperaturePreferenceContext.Provider>
        </div>
      </ErrorBoundary>
    </main>
  );
}
