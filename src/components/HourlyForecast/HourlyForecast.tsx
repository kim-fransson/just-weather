import useSWR from "swr";
import { LocationData, WeatherForecast, getWeatherForecast } from "../../api";
import { List } from "./List";

export interface HourlyForecastProps {
  location?: LocationData;
}

export const HourlyForecast = ({ location }: HourlyForecastProps) => {
  const { isLoading, data: forecast } = useSWR(
    location ? ["/weather/forecast", location.lat, location.lon] : null,
    ([url, lat, lon]) => getWeatherForecast(url, lat, lon),
  );

  if (isLoading || !location) {
    return <Skeleton />;
  }

  const { days } = forecast as WeatherForecast;

  return (
    <div
      tabIndex={0}
      className="flex touch-pan-x flex-col gap-5 overflow-hidden rounded-2xl border-2 
      border-transparent bg-indigo-50 p-5 outline-none hover:overflow-x-auto focus-visible:overflow-x-auto focus-visible:border-indigo-400"
    >
      <h2 className="uppercase text-gray-900/60 body-2">today's forecast</h2>
      <List forecast={days[0].hours} />
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-5 overflow-hidden rounded-2xl bg-gray-400 p-5">
      <div className="h-6 w-40 animate-pulse bg-gray-500"></div>
      <div className="flex gap-3">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="flex h-24 w-20 flex-col items-center gap-2 bg-gray-300 px-4 py-2"
          >
            <div className="h-6 w-11 animate-pulse bg-gray-500" />
            <div className="h-8 w-8 animate-pulse bg-gray-500" />
            <div className="h-6 w-12 animate-pulse bg-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
