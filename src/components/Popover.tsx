import { useRef } from "react";
import { DismissButton, FocusScope, Overlay, usePopover } from "react-aria";
import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
  width?: number | string | null;
  popoverRef?: React.RefObject<HTMLDivElement>;
}

export const Popover = (props: PopoverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { popoverRef = ref, state, children, width } = props;
  const { popoverProps } = usePopover(
    {
      ...props,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay>
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{ ...popoverProps.style, width: width || "auto" }}
      >
        <FocusScope contain>
          <DismissButton onDismiss={state.close} />
          {children}
          <DismissButton onDismiss={state.close} />
        </FocusScope>
      </div>
    </Overlay>
  );
};
