/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_BASE_URL: string;
  readonly VITE_WEATHER_API_SEARCH_URL: string;
  readonly VITE_WEATHER_API_CURRENT_WEATHER_URL: string;
  readonly VITE_WEATHER_API_FORECAST_URL: string;
}
