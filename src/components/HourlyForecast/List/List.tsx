import { DateTime } from "luxon";
import { HourlyForecast } from "../../../api";
import { Card } from "../Card";
import { CSSProperties } from "react";

export interface ListProps {
  forecast: HourlyForecast[];
  style?: CSSProperties;
}

export const List = ({ forecast, style }: ListProps) => {
  return (
    <div
      style={style}
      className="flex w-[max-content] gap-3 transition-transform duration-300 ease-in-out"
    >
      {forecast
        .map((hour) => {
          const dateTime = DateTime.fromSeconds(hour.timeEpoch);
          const formattedTime = dateTime.toFormat("HH:mm");
          return (
            <Card
              key={formattedTime}
              forecast={{ ...hour }}
              formattedTimestamp={formattedTime}
            />
          );
        })
        .sort((a, b) => ((a.key as string) < (b.key as string) ? -1 : 1))}
    </div>
  );
};
