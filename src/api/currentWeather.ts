export type Condition = {
  text: string;
  icon: string;
  code: number;
};

export type CurrentWeather = {
  tempC: number;
  feelslikeC: number;
  condition: Condition;
  location: {
    name: string;
  };
};

export const currentWeather = async (
  query: string,
): Promise<CurrentWeather> => {
  const currentWeatherUrl = import.meta.env
    .VITE_WEATHER_API_CURRENT_WEATHER_URL;
  return fetch(`${currentWeatherUrl}?q=${query}`).then((res) => res.json());
};
