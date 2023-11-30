import useSWR from "swr";
import {
  API_CACHE_KEYS,
  LocationData,
  WeatherForecast,
  getWeatherForecast,
} from "../../api";
import { List } from "./List";

export interface HourlyForecastProps {
  location: LocationData;
}

export const HourlyForecast = ({ location }: HourlyForecastProps) => {
  const { isLoading, data: forecast } = useSWR(
    API_CACHE_KEYS.FORECAST + `-${location.id}`,
    () => getWeatherForecast(`${location.lat},${location.lon}`, 1),
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const { days } = forecast as WeatherForecast;

  return (
    <div className="flex flex-col gap-5 overflow-hidden rounded-2xl bg-indigo-50 p-5 hover:overflow-x-auto">
      <h2 className="uppercase text-gray-900/60 body-2">today's forecast</h2>
      <List forecast={days[0].hours} />
    </div>
  );
};
