import { useEffect } from "react";
import Logo from "./assets/icons/logo.svg?react";
import { randomCapital } from "./utils";
import { useLocalStorage } from "@uidotdev/usehooks";
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
import { GeoLocationButton } from "./components/GeoLocationButton";

export default function App() {
  const [currentLocation, setCurrentLocation] = useLocalStorage<
    LocationData | undefined
  >("currentLocation", undefined);

  const [preferCelsius, setPreferCelsius] = useLocalStorage(
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

        <div className="relative col-span-2 flex-1">
          <LocationSearchBar onLocationSelected={setCurrentLocation} />
          <GeoLocationButton
            onGeoLocationApproval={(lat, lon) => {
              trigger(`${lat}, ${lon}`);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          />
        </div>

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

      <footer className="mt-auto flex flex-col items-center justify-center gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="select-none rounded-lg bg-indigo-400 px-2 py-1 text-gray-100 body-2">
            Powered by
          </span>
          <a
            className="body-2 hover:text-indigo-400"
            href="https://www.weatherapi.com/"
            target="_blank"
            title="Weather API"
          >
            WeatherAPI.com
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span className="select-none rounded-lg bg-[#672871] px-2 py-1 text-gray-100 body-2">
            Designs from
          </span>
          <a
            className="body-2 hover:text-[#672871]"
            href="https://bigdevsoon.me/"
            target="_blank"
            title="BigDevSoon"
          >
            BigDevSoon.me
          </a>
        </div>
      </footer>
    </main>
  );
}
