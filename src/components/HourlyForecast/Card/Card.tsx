import { HourlyForecast } from "../../../api";
import { useContext } from "react";
import { TemperaturePreferenceContext } from "../../../context";

export interface CardProps {
  forecast: HourlyForecast;
  formattedTimestamp: string;
}

export const Card = ({ forecast, formattedTimestamp }: CardProps) => {
  const preferCelsius = useContext(TemperaturePreferenceContext);

  const { tempC, condition, tempF } = forecast;
  const { icon } = condition;

  return (
    <div className="flex shrink-0 flex-col items-center rounded-2xl bg-white/32 px-4 py-2">
      <span className="uppercase text-gray-900/60 body-2">
        {formattedTimestamp}
      </span>
      <img width="36" height="36" src={icon} alt="" />
      <span className="text-gray-900 body-3">
        {preferCelsius ? `${tempC}°C` : `${tempF}°F`}
      </span>
    </div>
  );
};
