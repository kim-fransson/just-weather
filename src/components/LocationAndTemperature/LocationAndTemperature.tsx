import { CurrentWeather, LocationData } from "../../api";
import { useCurrentWeather } from "../../hooks";

export interface LocationAndTemperatureProps {
  location: LocationData;
}

export const LocationAndTemperature = (props: LocationAndTemperatureProps) => {
  const { location } = props;
  const { currentWeather, isLoading } = useCurrentWeather(
    location.lat,
    location.lon,
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const { tempC, feelslikeC, condition } = currentWeather as CurrentWeather;

  return (
    <div className="inline-flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-gray-900/87 headline-lg">{location.name}</h2>
        <img
          width={64}
          height={64}
          src={condition.icon}
          alt={`${condition.text} icon`}
        />
      </div>

      <div className="-mt-4 flex items-center justify-between gap-4">
        <span className="text-gray-900/87 headline-xl after:content-['\2103']">
          {tempC}
        </span>
        <span className="justify-self-start text-gray-900/87 headline-sm after:font-normal after:content-['\2103']">
          feels like {feelslikeC}
        </span>
      </div>
    </div>
  );
};
