import { WeatherCondition } from "./getCurrentWeather";

export type HourlyForecast = {
  tempC: number;
  condition: WeatherCondition;
  timeEpoch: number;
};

export type DailyForecast = {
  hours: HourlyForecast[];
};

export type WeatherForecast = {
  days: DailyForecast[];
};

export const getWeatherForecast = async (
  query: string,
  days: number = 1,
): Promise<WeatherForecast> => {
  const forecastUrl = import.meta.env.VITE_WEATHER_API_FORECAST_URL;
  return fetch(`${forecastUrl}?q=${query}&days=${days}`).then((res) =>
    res.json(),
  );
};
