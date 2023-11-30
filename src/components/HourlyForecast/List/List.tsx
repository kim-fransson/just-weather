import { HourlyForecast } from "../../../api";
import { Card } from "../Card";

export interface ListProps {
  forecast: HourlyForecast[];
}

export const List = ({ forecast }: ListProps) => {
  return (
    <div className="flex gap-3">
      {forecast.map((hour) => (
        <Card key={hour.timeEpoch} forecast={{ ...hour }} />
      ))}
    </div>
  );
};
