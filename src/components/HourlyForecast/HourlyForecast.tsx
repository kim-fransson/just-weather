import useSWR from "swr";
import { LocationData, WeatherForecast, getWeatherForecast } from "../../api";
import { List } from "./List";
import { Button } from "../Button";
import ChevronLeft from "../../assets/icons/chevron-left.svg?react";
import { useEffect, useRef, useState } from "react";

export interface HourlyForecastProps {
  location?: LocationData;
}

const TRANSLATE_AMOUNT = 200;

export const HourlyForecast = ({ location }: HourlyForecastProps) => {
  const [translate, setTranslate] = useState<number>(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const listContainerRef = useRef<HTMLDivElement>(null);

  const { isLoading, data: forecast } = useSWR(
    location ? ["/weather/forecast", location.lat, location.lon] : null,
    ([url, lat, lon]) => getWeatherForecast(url, lat, lon),
  );

  useEffect(() => {
    if (listContainerRef.current == null) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const listContainer = entries[0].target;
      if (listContainer == null) {
        return;
      }

      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + listContainer.clientWidth < listContainer.scrollWidth,
      );
    });

    observer.observe(listContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [forecast, translate]);

  if (isLoading || !location) {
    return <Skeleton />;
  }

  const { days } = forecast as WeatherForecast;

  return (
    <div
      ref={listContainerRef}
      tabIndex={0}
      className="flex touch-pan-x flex-col gap-5 overflow-auto rounded-2xl border-2 border-transparent 
      bg-indigo-50 p-5 outline-none focus-visible:border-indigo-400 lg:overflow-hidden"
    >
      <h2 className="uppercase text-gray-900/60 body-2">today's forecast</h2>
      <div className="relative -mx-5 px-5">
        <List
          forecast={days[0].hours}
          style={{ transform: `translateX(-${translate}px)` }}
        />
        {isLeftVisible && (
          <Button
            onPress={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) {
                  return 0;
                }
                return newTranslate;
              });
            }}
            className="group absolute left-0 top-1/2 hidden aspect-square h-full w-auto -translate-y-1/2 items-center justify-center bg-gradient-to-r from-indigo-50 from-50% to-transparent p-1.5 text-gray-900/60 outline-none lg:flex"
          >
            <div className="rounded-full p-2 transition-colors duration-200 ease-in-out group-hover:bg-gray-900/32 group-focus-visible:bg-gray-900/32">
              <ChevronLeft className="h-12 w-12" />
            </div>
          </Button>
        )}

        {isRightVisible && (
          <Button
            onPress={() => {
              setTranslate((translate) => {
                if (listContainerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const edge = listContainerRef.current.scrollWidth;
                const width = listContainerRef.current.clientWidth;
                if (newTranslate + width >= edge) {
                  return edge - width;
                }
                return newTranslate;
              });
            }}
            className="group absolute right-0 top-1/2 hidden aspect-square h-full w-auto -translate-y-1/2 items-center justify-center bg-gradient-to-l from-indigo-50 from-50% to-transparent p-1.5 text-gray-900/60 outline-none lg:flex"
          >
            <div className="rounded-full p-2 transition-colors duration-200 ease-in-out group-hover:bg-gray-900/32 group-focus-visible:bg-gray-900/32">
              <ChevronLeft className="h-12 w-12 rotate-180" />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-5 overflow-hidden rounded-2xl bg-gray-400 p-5">
      <div className="h-6 w-40 animate-pulse bg-gray-500"></div>
      <div className="flex gap-3">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="flex h-24 w-20 flex-col items-center gap-2 bg-gray-300 px-4 py-2"
          >
            <div className="h-6 w-11 animate-pulse bg-gray-500" />
            <div className="h-8 w-8 animate-pulse bg-gray-500" />
            <div className="h-6 w-12 animate-pulse bg-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
