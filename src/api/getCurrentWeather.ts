export type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

export type CurrentWeather = {
  tempC: number;
  tempF: number;
  feelslikeC: number;
  feelslikeF: number;
  condition: WeatherCondition;
  pressureMb: number;
  windKph: number;
  uv: number;
  visibilityKm: number;
};

export const getCurrentWeather = async (
  url: string,
  lat: number,
  lon: number,
): Promise<CurrentWeather> => {
  const currentWeatherUrl = import.meta.env.VITE_WEATHER_API_BASE_URL;
  return fetch(`${currentWeatherUrl}${url}?q=${lat},${lon}`).then((res) =>
    res.json(),
  );
};
