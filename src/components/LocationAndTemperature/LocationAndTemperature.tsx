import { CurrentWeather } from "../../api";

export interface LocationAndTemperatureProps {
  currentWeather: CurrentWeather;
}

export const LocationAndTemperature = (props: LocationAndTemperatureProps) => {
  const { tempC, feelslikeC, condition, location } = props.currentWeather;
  return (
    <div className="inline-flex flex-col">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-gray-900/87 headline-lg">{location.name}</h2>
        <img className="" width={64} height={64} src={condition.icon} alt="" />
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
