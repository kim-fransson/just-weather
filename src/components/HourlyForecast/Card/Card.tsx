import { DateTime } from "luxon";
import { HourlyForecast } from "../../../api";
import { useContext } from "react";
import { TemperaturePreferenceContext } from "../../../context";

export interface CardProps {
  forecast: HourlyForecast;
}

export const Card = ({ forecast }: CardProps) => {
  const preferCelsius = useContext(TemperaturePreferenceContext);

  const { tempC, timeEpoch, condition, tempF } = forecast;
  const { icon } = condition;

  const dateTime = DateTime.fromSeconds(timeEpoch);
  const formattedTime = dateTime.toFormat("HH:mm");

  return (
    <div className="flex shrink-0 flex-col items-center rounded-2xl bg-white/32 px-4 py-2">
      <span className="uppercase text-gray-900/60 body-2">{formattedTime}</span>
      <img width="36" height="36" src={icon} alt="" />
      <span className="text-gray-900 body-3">
        {preferCelsius ? `${tempC}°C` : `${tempF}°F`}
      </span>
    </div>
  );
};
