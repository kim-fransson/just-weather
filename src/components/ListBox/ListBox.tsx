import type { AriaListBoxOptions } from "react-aria";
import { ListState, Node, useListState } from "react-stately";
import { mergeProps, useListBox, useOption } from "react-aria";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ListBoxProps<T> extends AriaListBoxOptions<T> {
  isLoading?: boolean;
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state?: ListState<T>;
}

interface OptionProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

export const ListBox = <T extends object>(props: ListBoxProps<T>) => {
  const ref = useRef<HTMLUListElement>(null);
  const { listBoxRef = ref, state, isLoading } = props;
  let listState = useListState(props);
  listState = state || listState;

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
      {isLoading
        ? Array.from({ length: 5 }, (_, index) => (
            <SkeletonOption key={index} />
          ))
        : [...listState.collection].map((item) => (
            <Option<T> key={item.key} item={item} state={listState} />
          ))}
    </ul>
  );
};

const SkeletonOption = () => {
  return <li className="mx-4 my-2 h-8 animate-pulse rounded-sm bg-gray-500" />;
};

const Option = <T,>({ item, state }: OptionProps<T>) => {
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
        "transition-colors duration-100 ease-in-out",
        (isFocused || isSelected) && "bg-indigo-400 text-white",
      )}
    >
      {item.rendered}
    </li>
  );
};
