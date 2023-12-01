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

export interface WeatherDetailsProps {
  location: LocationData;
}

export const WeatherDetails = ({ location }: WeatherDetailsProps) => {
  const { isLoading: isLoadingForecast, data: forecast } = useSWR(
    generateCacheKey("FORECAST", location.id),
    () => getWeatherForecast(location.lat, location.lon, 1),
  );

  const { isLoading: isLoadingCurrentWeather, data: currentWeather } = useSWR(
    generateCacheKey("CURRENT_WEATHER", location.id),
    () => getCurrentWeather(location.lat, location.lon),
  );

  if (isLoadingForecast || isLoadingCurrentWeather) {
    return <span>Loading...</span>;
  }

  const { days } = forecast as WeatherForecast;
  const { astro, chanceOfRain } = days[0];
  const { pressureMb, windKph, uv, feelslikeC, visibilityKm } =
    currentWeather as CurrentWeather;

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-indigo-50 p-5">
      <h2 className="uppercase text-gray-900/60 body-2">weather details</h2>
      <Grid>
        <Card
          title="Sunrise"
          value={astro.sunrise.toLowerCase()}
          icon={<SunriseIcon />}
        />
        <Card
          title="Sunset"
          value={astro.sunset.toLowerCase()}
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
          value={`${feelslikeC}°C`}
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
