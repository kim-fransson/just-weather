import type { AriaListBoxOptions } from "react-aria";
import { Item, ListState, Node, useListState } from "react-stately";
import { mergeProps, useListBox, useOption } from "react-aria";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import { LocationData } from "../../../api";
import { joinObject } from "../../../utils";
import { CollectionChildren } from "@react-types/shared";

export interface SearchResultsProps extends AriaListBoxOptions<LocationData> {
  isLoading?: boolean;
  listBoxRef?: React.RefObject<HTMLUListElement>;
  children?: CollectionChildren<LocationData>;
}

interface OptionProps {
  item: Node<LocationData>;
  state: ListState<LocationData>;
}

export const SearchResults = (props: SearchResultsProps) => {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, isLoading } = props;
  const listState = useListState({ ...props, selectionMode: "single" });

  const { listBoxProps } = useListBox(props, listState, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className={twMerge(
        "overflow-hidden rounded-md bg-indigo-50 shadow-lg outline-none",
        isLoading && "bg-gray-400",
      )}
    >
      {isLoading ? (
        Array.from({ length: 5 }, (_, index) => <SkeletonOption key={index} />)
      ) : !listState.collection.size ? (
        <p className="px-4 py-2 text-gray-900 body">No results found</p>
      ) : (
        [...listState.collection].map((item) => (
          <Option key={item.key} item={item} state={listState} />
        ))
      )}
    </ul>
  );
};

const SkeletonOption = () => {
  return <li className="mx-4 my-2 h-8 animate-pulse rounded-sm bg-gray-500" />;
};

const Option = ({ item, state }: OptionProps) => {
  const ref = useRef(null);
  const { optionProps, isSelected, isFocused } = useOption(
    { key: item.key },
    state,
    ref,
  );

  return (
    <li
      {...mergeProps(optionProps)}
      ref={ref}
      className={twMerge(
        "cursor-pointer px-4 py-2 text-gray-900 outline-none body hover:bg-indigo-400 hover:text-white",
        "transition-colors duration-75 ease-in-out",
        (isFocused || isSelected) && "bg-indigo-400 text-white",
      )}
    >
      {item.rendered}
    </li>
  );
};

export const SearchResult = ({ location }: { location: LocationData }) => {
  return (
    <Item<LocationData> key={location.id}>
      {joinObject(location, ["name", "region", "country"])}
    </Item>
  );
};
