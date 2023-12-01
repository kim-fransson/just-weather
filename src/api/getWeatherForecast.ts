import { WeatherCondition } from "./getCurrentWeather";

export type HourlyForecast = {
  tempC: number;
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
  lat: number,
  lon: number,
  days: number = 1,
): Promise<WeatherForecast> => {
  const forecastUrl = import.meta.env.VITE_WEATHER_API_FORECAST_URL;
  return fetch(`${forecastUrl}?q=${lat},${lon}&days=${days}`).then((res) =>
    res.json(),
  );
};
