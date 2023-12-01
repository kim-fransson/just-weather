export type WeatherCondition = {
  text: string;
  icon: string;
  code: number;
};

export type CurrentWeather = {
  tempC: number;
  feelslikeC: number;
  condition: WeatherCondition;
  pressureMb: number;
  windKph: number;
  uv: number;
  visibilityKm: number;
};

export const getCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeather> => {
  const currentWeatherUrl = import.meta.env
    .VITE_WEATHER_API_CURRENT_WEATHER_URL;
  return fetch(`${currentWeatherUrl}?q=${lat},${lon}`).then((res) =>
    res.json(),
  );
};
