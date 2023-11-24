import { useRef } from "react";
import { AriaSearchFieldProps, useSearchField } from "react-aria";
import { useSearchFieldState } from "react-stately";

export interface SearchFieldProps extends AriaSearchFieldProps {}

export const SearchField = (props: SearchFieldProps) => {
  const state = useSearchFieldState(props);
  const ref = useRef(null);
  const { inputProps } = useSearchField(props, state, ref);
  return (
    <div
      className="rounded-lg border-2 border-transparent bg-indigo-50 px-7 py-2 
        transition-all duration-200 ease-in-out focus-within:border-indigo-400"
    >
      <input
        className="w-full bg-transparent text-gray-900 outline-none body selection:bg-indigo-300 placeholder:text-gray-900/60"
        {...inputProps}
        ref={ref}
      />
    </div>
  );
};
