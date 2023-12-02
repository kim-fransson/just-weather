import { useRef } from "react";
import {
  AriaSwitchProps,
  VisuallyHidden,
  useFocusRing,
  useSwitch,
} from "react-aria";
import { useToggleState } from "react-stately";
import { twMerge } from "tailwind-merge";

export interface TempUnitSwitcherProps extends AriaSwitchProps {}

export const TempUnitSwitcher = (props: TempUnitSwitcherProps) => {
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps } = useSwitch(props, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <label
      className={twMerge(
        "relative block h-8 w-16 shrink-0 cursor-pointer rounded-[60px] border border-transparent bg-indigo-50",
        isFocusVisible && " border-indigo-400",
      )}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <div
        className={twMerge(
          "absolute left-[2px] top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-indigo-400 shadow-md transition-transform duration-200 ease-in-out",
          state.isSelected && "translate-x-[30px]",
        )}
      />
      <span
        className={twMerge(
          `absolute left-[6.5px] top-1/2 -translate-y-1/2 select-none text-gray-900 transition-colors delay-75 body-2`,
          !state.isSelected && "text-gray-100",
        )}
      >
        °F
      </span>
      <span
        className={twMerge(
          "absolute right-[7px] top-1/2 -translate-y-1/2 select-none text-gray-900 transition-colors delay-75 body-2",
          state.isSelected && "text-gray-100",
        )}
      >
        °C
      </span>
    </label>
  );
};
