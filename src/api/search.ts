export type LocationData = {
  country: string;
  name: string;
  region: string;
};

export const search = async (query: string): Promise<LocationData[]> => {
  const searchUrl = import.meta.env.VITE_WEATHER_API_SEARCH_URL;
  return fetch(`${searchUrl}?q=${query}`).then((res) => res.json());
};
