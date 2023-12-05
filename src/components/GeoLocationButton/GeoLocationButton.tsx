import { Button } from "../Button";
import MapLocationIcon from "../../assets/icons/map-location-dot.svg?react";
import { twMerge } from "tailwind-merge";
import { Popover } from "../Popover";
import { cloneElement, useRef, useState } from "react";
import { useOverlayTriggerState } from "react-stately";
import { useOverlayTrigger } from "react-aria";

export interface GeoLocationButtonProps {
  className?: string;
  onGeoLocationApproval: (lat: number, lon: number) => void;
}

export const GeoLocationButton = (props: GeoLocationButtonProps) => {
  const [error, setError] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useOverlayTriggerState({});
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef,
  );

  const { className, onGeoLocationApproval } = props;

  const onPress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onGeoLocationApproval(latitude, longitude);
        },
        () => {
          setError("Failed to fetch your location. Check device settings.");
          state.open();
        },
      );
    } else {
      setError("Browser does not support geolocation services.");
      state.open();
    }
  };

  return (
    <>
      <Button
        buttonRef={triggerRef}
        {...triggerProps}
        onPress={onPress}
        className={twMerge(
          "text-gray-900/60 outline-none transition-colors duration-200 ease-in-out hover:text-gray-900 focus-visible:text-gray-900",
          className,
        )}
      >
        <MapLocationIcon className="h-6 w-6" />
      </Button>
      {state.isOpen && error && (
        <Popover
          triggerRef={triggerRef}
          state={state}
          placement="bottom"
          offset={10}
        >
          {cloneElement(
            <div className="rounded-2xl bg-red-500 p-3 text-gray-100 body-2">
              {error}
            </div>,
            overlayProps,
          )}
        </Popover>
      )}
    </>
  );
};
