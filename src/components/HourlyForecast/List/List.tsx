import { DateTime } from "luxon";
import { HourlyForecast } from "../../../api";
import { Card } from "../Card";

export interface ListProps {
  forecast: HourlyForecast[];
}

export const List = ({ forecast }: ListProps) => {
  return (
    <div className="flex gap-3">
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
