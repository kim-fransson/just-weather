import { AriaComboBoxProps, useComboBox, useFilter } from "react-aria";
import { LocationData } from "../../api";
import { useComboBoxState } from "react-stately";
import { useRef } from "react";
import { Popover } from "../Popover";
import { ListBox } from "../ListBox/ListBox";
import { useMeasure } from "@uidotdev/usehooks";

export interface AutocompleteProps extends AriaComboBoxProps<LocationData> {
  isLoading?: boolean;
}

export const Autocomplete = (props: AutocompleteProps) => {
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({
    ...props,
    allowsEmptyCollection: true,
    defaultFilter: contains,
  });
  const [measureRef, { width }] = useMeasure();

  const inputRef = useRef(null);
  const listBoxRef = useRef(null);
  const popoverRef = useRef(null);

  const { inputProps, listBoxProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  const { isLoading, inputValue } = props;

  return (
    <div
      ref={measureRef}
      className="relative w-full rounded-lg border-2 border-transparent bg-indigo-50 px-5 py-[6px] focus-within:border-indigo-400"
    >
      <input
        {...inputProps}
        ref={inputRef}
        className="w-full bg-transparent text-gray-900 outline-none body selection:bg-indigo-200 placeholder:text-gray-900/60"
        {...inputProps}
      />
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={inputRef}
          state={state}
          width={width}
          offset={16}
          crossOffset={-22}
          isNonModal
          placement="bottom start"
        >
          {!isLoading && inputValue !== "" && state.collection.size === 0 ? (
            <p className="rounded-md bg-indigo-50 px-4 py-2 text-gray-900 body">
              No results found
            </p>
          ) : (
            <ListBox
              {...listBoxProps}
              listBoxRef={listBoxRef}
              state={state}
              isLoading={isLoading}
            />
          )}
        </Popover>
      )}
    </div>
  );
};
