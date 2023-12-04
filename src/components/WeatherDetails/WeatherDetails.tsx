import useSWR from "swr";
import {
  CurrentWeather,
  LocationData,
  WeatherForecast,
  generateCacheKey,
  getCurrentWeather,
  getWeatherForecast,
} from "../../api";
import { Grid } from "./Grid";
import { Card } from "./Card";

import SunriseIcon from "../../assets/icons/sunrise-icon.svg?react";
import SunsetIcon from "../../assets/icons/sunset-icon.svg?react";
import ChanceOfRainIcon from "../../assets/icons/drop-icon.svg?react";
import PressureIcon from "../../assets/icons/pressure-icon.svg?react";
import WindIcon from "../../assets/icons/wind-icon.svg?react";
import UVIcon from "../../assets/icons/sun-icon.svg?react";
import FeelsLikeIcon from "../../assets/icons/temperature-icon.svg?react";
import VisibilityIcon from "../../assets/icons/visibility-icon.svg?react";
import { DateTime } from "luxon";
import { useContext } from "react";
import { TemperaturePreferenceContext } from "../../context";

export interface WeatherDetailsProps {
  location: LocationData;
}

export const WeatherDetails = ({ location }: WeatherDetailsProps) => {
  const preferCelsius = useContext(TemperaturePreferenceContext);

  const {
    isLoading: isLoadingForecast,
    data: forecast,
    error: isForecastError,
  } = useSWR(generateCacheKey("FORECAST", location.id), () =>
    getWeatherForecast(location.lat, location.lon, 1),
  );

  const {
    isLoading: isLoadingCurrentWeather,
    data: currentWeather,
    error: isCurrentWeatherError,
  } = useSWR(generateCacheKey("CURRENT_WEATHER", location.id), () =>
    getCurrentWeather(location.lat, location.lon),
  );

  if (isLoadingForecast || isLoadingCurrentWeather) {
    return <Skeleton />;
  }

  const { days } = forecast as WeatherForecast;

  if (isForecastError || isCurrentWeatherError || !days) {
    return <span>Error :/</span>;
  }

  const { astro, chanceOfRain } = days[0];
  const { pressureMb, windKph, uv, feelslikeC, visibilityKm, feelslikeF } =
    currentWeather as CurrentWeather;

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-indigo-50 p-5">
      <h2 className="uppercase text-gray-900/60 body-2">weather details</h2>
      <Grid>
        <Card
          title="Sunrise"
          value={DateTime.fromFormat(astro.sunrise, "hh:mm a").toFormat(
            "HH:mm",
          )}
          icon={<SunriseIcon />}
        />
        <Card
          title="Sunset"
          value={DateTime.fromFormat(astro.sunset, "hh:mm a").toFormat("HH:mm")}
          icon={<SunsetIcon />}
        />
        <Card
          title="Chance of rain"
          value={`${chanceOfRain}%`}
          icon={<ChanceOfRainIcon />}
        />
        <Card
          title="Pressure"
          value={`${pressureMb} mb`}
          icon={<PressureIcon />}
        />
        <Card title="Wind" value={`${windKph} km/h`} icon={<WindIcon />} />
        <Card title="UV index" value={`${uv} of 10`} icon={<UVIcon />} />
        <Card
          title="Feels like"
          value={preferCelsius ? `${feelslikeC}°C` : `${feelslikeF}°F`}
          icon={<FeelsLikeIcon />}
        />
        <Card
          title="Visibility"
          value={`${visibilityKm} km`}
          icon={<VisibilityIcon />}
        />
      </Grid>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-gray-400 p-5">
      <div className="h-6 w-36 animate-pulse bg-gray-500" />
      <Grid>
        {Array.from({ length: 8 }).map(() => (
          <div className="flex items-center justify-between rounded-2xl bg-gray-300 p-5">
            <div className="flex flex-col gap-2">
              <div className="h-6 w-20 animate-pulse bg-gray-500" />
              <div className="h-10 w-24 animate-pulse bg-gray-500" />
            </div>
            <div className="h-7 w-7 animate-pulse bg-gray-500" />
          </div>
        ))}
      </Grid>
    </div>
  );
};
