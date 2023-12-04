import { useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";

export interface ButtonProps extends AriaButtonProps {
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button className={props.className} {...buttonProps} ref={ref}>
      {children}
    </button>
  );
};
