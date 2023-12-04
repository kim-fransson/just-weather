import {
  AriaGridListOptions,
  mergeProps,
  useFocusRing,
  useGridList,
  useGridListItem,
} from "react-aria";
import { ListState, Node, useListState } from "react-stately";
import { useRef } from "react";
import { LocationData } from "../../../api";
import { Button } from "../../Button";
import { twMerge } from "tailwind-merge";
import { joinObject } from "../../../utils";
import { CollectionChildren } from "@react-types/shared";
import TrashIcon from "../../../assets/icons/trash-icon.svg?react";

export type RecentResult = {
  location: LocationData;
};

export interface RecentResultsProps extends AriaGridListOptions<RecentResult> {
  onClearAll?: () => void;
  gridListRef?: React.RefObject<HTMLUListElement>;
  children?: CollectionChildren<RecentResult>;
}

export const RecentResults = (props: RecentResultsProps) => {
  const state = useListState({ ...props, selectionMode: "single" });
  const ref = useRef(null);
  const { gridListRef = ref, onClearAll = () => {} } = props;
  const { gridProps } = useGridList(props, state, gridListRef);

  return (
    <div className="overflow-hidden rounded-md bg-indigo-50 shadow-lg outline-none">
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-gray-900 headline-sm">Recent</h2>
        <Button
          onPress={onClearAll}
          className="text-indigo-400/60 outline-none transition-all duration-200 ease-in-out body-3 hover:text-indigo-400 focus-visible:text-indigo-400"
        >
          Clear all
        </Button>
      </div>
      <ul {...gridProps} ref={gridListRef}>
        {[...state.collection].map((item) => (
          <ListItem key={item.key} item={item} state={state} />
        ))}
      </ul>
    </div>
  );
};

function ListItem({
  item,
  state,
}: {
  item: Node<RecentResult>;
  state: ListState<RecentResult>;
}) {
  const ref = useRef(null);
  const { rowProps, gridCellProps, isSelected } = useGridListItem(
    { node: item },
    state,
    ref,
  );

  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
      className={twMerge(
        "cursor-pointer px-4 py-2 text-gray-900 outline-none body hover:bg-indigo-400 hover:text-white",
        "transition-colors duration-75",
        (isFocusVisible || isSelected) && "bg-indigo-400 text-white",
      )}
    >
      <div {...gridCellProps}>{item.rendered}</div>
    </li>
  );
}

export interface RecentResultProps {
  recent: RecentResult;
  onDelete?: () => void;
}
export const RecentResult = ({
  recent,
  onDelete = () => {},
}: RecentResultProps) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col body-2">
        <span>{recent.location.name}</span>
        <span className="text-xs opacity-60">
          {joinObject(recent.location, ["region", "country"])}
        </span>
      </div>
      <Button onPress={onDelete} className="group ml-auto outline-none">
        <TrashIcon className="opacity-60 transition-all duration-100 group-hover:opacity-100  group-focus-visible:opacity-100" />
      </Button>
    </div>
  );
};
