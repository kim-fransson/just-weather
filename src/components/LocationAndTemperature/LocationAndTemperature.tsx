import useSWR from "swr";
import {
  CurrentWeather,
  LocationData,
  generateCacheKey,
  getCurrentWeather,
} from "../../api";
import { useContext } from "react";
import { TemperaturePreferenceContext } from "../../context";

export interface LocationAndTemperatureProps {
  location: LocationData;
}

export const LocationAndTemperature = (props: LocationAndTemperatureProps) => {
  const { location } = props;
  const preferCelsius = useContext(TemperaturePreferenceContext);

  const {
    isLoading,
    data: currentWeather,
    error: isError,
  } = useSWR(generateCacheKey("CURRENT_WEATHER", location.id), () =>
    getCurrentWeather(location.lat, location.lon),
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error :/</span>;
  }

  const { tempC, condition, tempF } = currentWeather as CurrentWeather;

  return (
    <div className="inline-flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-gray-900/87 headline-lg">{location.name}</h2>
        <img
          width={64}
          height={64}
          src={condition.icon}
          alt={`${condition.text} icon`}
        />
      </div>

      <div className="-mt-4 flex items-center justify-between gap-4">
        <span className="text-gray-900/87 headline-xl">
          {preferCelsius ? `${tempC} °C` : `${tempF} °F`}
        </span>
      </div>
    </div>
  );
};
