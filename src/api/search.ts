export type LocationData = {
  country: string;
  name: string;
  region: string;
  lat: number;
  lon: number;
  id: number;
};

export const searchByQuery = async (query: string): Promise<LocationData[]> => {
  const baseUrl = import.meta.env.VITE_WEATHER_API_BASE_URL;
  return fetch(`${baseUrl}/search?q=${query}`).then((res) => res.json());
};

export const search = async (
  url: string,
  { arg: query }: { arg: string },
): Promise<LocationData[]> => {
  const baseUrl = import.meta.env.VITE_WEATHER_API_BASE_URL;
  return fetch(`${baseUrl}${url}?q=${query}`).then((res) => res.json());
};
