import { WeatherCondition } from "./getCurrentWeather";

export type HourlyForecast = {
  tempC: number;
  tempF: number;
  condition: WeatherCondition;
  timeEpoch: number;
};

export type Astro = {
  sunrise: string;
  sunset: string;
};

export type DailyForecast = {
  chanceOfRain: number;
  astro: Astro;
  hours: HourlyForecast[];
};

export type WeatherForecast = {
  days: DailyForecast[];
};

export const getWeatherForecast = async (
  url: string,
  lat: number,
  lon: number,
): Promise<WeatherForecast> => {
  const forecastUrl = import.meta.env.VITE_WEATHER_API_BASE_URL;
  return fetch(`${forecastUrl}${url}?q=${lat},${lon}&days=1`).then((res) =>
    res.json(),
  );
};
