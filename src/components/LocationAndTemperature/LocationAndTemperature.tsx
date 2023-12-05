import useSWR from "swr";
import { CurrentWeather, LocationData, getCurrentWeather } from "../../api";
import { useContext, useState } from "react";
import { TemperaturePreferenceContext } from "../../context";
import { useDocumentTitle, useFavicon } from "@uidotdev/usehooks";

export interface LocationAndTemperatureProps {
  location?: LocationData;
}

export const LocationAndTemperature = (props: LocationAndTemperatureProps) => {
  const { location } = props;
  const preferCelsius = useContext(TemperaturePreferenceContext);

  const [favicon, setFavicon] = useState("");
  const [pageTitle, setPageTitle] = useState("Just Weather");

  useFavicon(favicon);
  useDocumentTitle(pageTitle);

  const { isLoading, data: currentWeather } = useSWR(
    location ? ["/weather/current", location.lat, location.lon] : null,
    ([url, lat, lon]) => getCurrentWeather(url, lat, lon),
    {
      onSuccess: (data) => {
        setFavicon(data.condition.icon);
        setPageTitle(data.condition.text + " | " + location!.name);
      },
    },
  );

  if (isLoading || !location) {
    return <Skeleton />;
  }

  const { tempC, condition, tempF } = currentWeather as CurrentWeather;

  return (
    <div className="inline-flex flex-col self-start">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-gray-900/87 headline-lg">{location.name}</h2>
        <img src={condition.icon} alt={`${condition.text} icon`} />
      </div>

      <div className="-mt-4 flex items-center justify-between gap-4">
        <span className="text-gray-900/87 headline-xl">
          {preferCelsius ? `${tempC} °C` : `${tempF} °F`}
        </span>
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="inline-flex flex-col gap-4 self-start">
      <div className="flex items-center justify-between gap-4">
        <div className="h-12 w-52 animate-pulse bg-gray-500" />
        <div className="h-14 w-14 animate-pulse bg-gray-500" />
      </div>
      <div className="h-24 w-36 animate-pulse bg-gray-500" />
    </div>
  );
};
