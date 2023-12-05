import { useRef } from "react";
import { AriaButtonProps, useButton } from "react-aria";

export interface ButtonProps extends AriaButtonProps {
  className?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export const Button = (props: ButtonProps) => {
  const ref = useRef(null);
  const { children, buttonRef = ref } = props;
  const { buttonProps } = useButton(props, buttonRef);

  return (
    <button className={props.className} {...buttonProps} ref={buttonRef}>
      {children}
    </button>
  );
};
