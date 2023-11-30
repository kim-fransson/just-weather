export type LocationData = {
  country: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  id: number;
};

export const search = async (query: string): Promise<LocationData[]> => {
  if (query === "") {
    return [];
  }

  const searchUrl = import.meta.env.VITE_WEATHER_API_SEARCH_URL;
  return fetch(`${searchUrl}?q=${query}`).then((res) => res.json());
};
