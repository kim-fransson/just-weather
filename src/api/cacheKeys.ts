const API_CACHE_KEYS = {
  CURRENT_WEATHER: "currentWeather",
  SEARCH: "search",
  FORECAST: "forecast",
};

type ApiCacheKey = keyof typeof API_CACHE_KEYS;

export const generateCacheKey = (
  apiKey: ApiCacheKey,
  key: string | number,
): string => {
  const cacheKey = API_CACHE_KEYS[apiKey];
  if (!cacheKey) {
    throw new Error(`Invalid API key: ${apiKey}`);
  }
  return `${cacheKey}-${key}`;
};
