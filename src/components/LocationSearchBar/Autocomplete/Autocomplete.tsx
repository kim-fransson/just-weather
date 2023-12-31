import { Item, useOverlayTriggerState } from "react-stately";
import { useRef, useState } from "react";
import { Popover } from "../../Popover";
import { SearchResults } from "../SearchResults/SearchResults";
import { useLocalStorage, useMeasure } from "@uidotdev/usehooks";
import { LocationData } from "../../../api";
import { RecentResult, RecentResults } from "../RecentResults";
import { joinObject } from "../../../utils";
import { mergeProps, useFocus, useKeyboard } from "react-aria";
import { twMerge } from "tailwind-merge";

export interface AutocompleteProps {
  isLoading?: boolean;
  searchResults?: LocationData[];
  searchQuery?: string;
  onSearchQueryChanged: (searchQuery: string) => void;
  onLocationSelected: (location: LocationData) => void;
  placeholder?: string;
  className?: string;
}

export const Autocomplete = (props: AutocompleteProps) => {
  const [measureRef, { width }] = useMeasure();
  const [focusFromList, setFocusFromList] = useState(false);
  const state = useOverlayTriggerState({});
  const [recentResults, setRecentResults] = useLocalStorage<RecentResult[]>(
    "recentResults",
    [],
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLUListElement>(null);
  const recentResultsRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    isLoading,
    searchResults = [],
    searchQuery,
    onSearchQueryChanged,
    placeholder,
    onLocationSelected,
    className,
  } = props;
  const { open, close, isOpen } = state;

  const showRecentResults = !searchQuery && recentResults.length > 0;
  const showPopover = showRecentResults || searchQuery;

  const openPopover = () => {
    open();
  };

  const closePopover = () => {
    setFocusFromList(true);
    close();
  };

  const { focusProps } = useFocus({
    onFocusChange: (isFocus) => {
      if (isFocus && !focusFromList) {
        openPopover();
      } else {
        setFocusFromList(false);
      }
    },
  });

  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      switch (e.key) {
        case "Escape":
          if (isOpen) {
            closePopover();
          } else {
            onSearchQueryChanged("");
          }
          break;
        case "ArrowDown":
          openPopover();
          if (showRecentResults && recentResultsRef?.current) {
            recentResultsRef.current.focus();
          } else if (searchResults.length > 0 && searchResultsRef?.current) {
            searchResultsRef.current.focus();
          }
      }
    },
  });

  return (
    <div
      ref={measureRef}
      className={twMerge(
        "relative w-full rounded-lg border-2 border-transparent bg-indigo-50 py-[6px] pl-5 pr-14 focus-within:border-indigo-400",
        className,
      )}
    >
      <input
        {...mergeProps(keyboardProps, focusProps)}
        ref={inputRef}
        placeholder={placeholder}
        value={searchQuery}
        onClick={() => !isOpen && openPopover()}
        onChange={(e) => {
          if (e.target.value !== "") {
            openPopover();
          }
          onSearchQueryChanged(e.target.value);
        }}
        className="w-full bg-transparent text-gray-900 outline-none body selection:bg-indigo-200 placeholder:text-gray-900/60"
      />
      {state.isOpen && showPopover && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={inputRef}
          state={state}
          width={width}
          offset={16}
          crossOffset={-22}
          placement="bottom start"
        >
          {showRecentResults ? (
            <RecentResults
              aria-label="select location from recent searches"
              items={recentResults}
              gridListRef={recentResultsRef}
              onSelectionChange={(keys) => {
                const id = Array.from(keys).map(Number)[0];
                const selectedLocation = recentResults.find(
                  (recent) => recent.location.id === id,
                )?.location as LocationData;
                if (
                  !recentResults.find(
                    (recent) => recent.location.id === selectedLocation.id,
                  )
                ) {
                  setRecentResults((current) => [
                    { location: selectedLocation },
                    ...current,
                  ]);
                }
                onLocationSelected(selectedLocation);
                onSearchQueryChanged("");
                closePopover();
              }}
              onClearAll={() => {
                setRecentResults([]);
                closePopover();
              }}
            >
              {(item: RecentResult) => (
                <Item
                  key={item.location.id}
                  textValue={`recent result for ${joinObject(item.location, [
                    "name",
                    "region",
                    "country",
                  ])}`}
                >
                  {
                    <RecentResult
                      recent={item}
                      onDelete={() => {
                        setRecentResults((current) =>
                          current.filter(
                            (recent) => recent.location.id !== item.location.id,
                          ),
                        );
                      }}
                    />
                  }
                </Item>
              )}
            </RecentResults>
          ) : searchQuery ? (
            <SearchResults
              aria-label="select location from search"
              isLoading={isLoading}
              items={searchResults}
              listBoxRef={searchResultsRef}
              onSelectionChange={(keys) => {
                const id = Array.from(keys).map(Number)[0];
                const selectedLocation = searchResults.find(
                  (location) => location.id === id,
                ) as LocationData;
                if (
                  !recentResults.find(
                    (recent) => recent.location.id === selectedLocation.id,
                  )
                ) {
                  setRecentResults((current) => [
                    { location: selectedLocation },
                    ...current,
                  ]);
                }
                onLocationSelected(selectedLocation);
                onSearchQueryChanged("");
                closePopover();
              }}
            >
              {(item: LocationData) => (
                <Item key={item.id}>
                  {joinObject(item, ["name", "region", "country"])}
                </Item>
              )}
            </SearchResults>
          ) : null}
        </Popover>
      )}
    </div>
  );
};
