import useSWR from "swr";
import {
  CurrentWeather,
  LocationData,
  generateCacheKey,
  getCurrentWeather,
} from "../../api";

export interface LocationAndTemperatureProps {
  location: LocationData;
}

export const LocationAndTemperature = (props: LocationAndTemperatureProps) => {
  const { location } = props;

  const { isLoading, data: currentWeather } = useSWR(
    generateCacheKey("CURRENT_WEATHER", location.id),
    () => getCurrentWeather(location.lat, location.lon),
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const { tempC, condition } = currentWeather as CurrentWeather;

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
        <span className="text-gray-900/87 headline-xl after:content-['°C']">
          {tempC}
        </span>
      </div>
    </div>
  );
};
