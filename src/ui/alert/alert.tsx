import { type Component, type ComponentProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { css, type TokenamiStyle, type Variants } from "@tokenami/css";
import { AlertCircleIcon } from "../icons/alert-circle-icon";
import { CheckCircleIcon } from "../icons/check-circle-icon";
import { InfoIcon } from "../icons/info-icon";
import { XCircleIcon } from "../icons/x-circle-icon";
import { alertRecipe } from "./alert.recipe";

export type AlertProps = TokenamiStyle<ComponentProps<"div">> &
  Variants<typeof alertRecipe>;

export const Alert: Component<AlertProps> = (props) => {
  const [split, rest] = splitProps(props, ["variant"]);

  return <div {...rest} style={alertRecipe(split, props.style)} />;
};

const alertIconMap: Record<
  "error" | "info" | "success" | "warning",
  typeof CheckCircleIcon
> = {
  error: XCircleIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertCircleIcon,
};

export type AlertIconProps = {
  variant: keyof typeof alertIconMap;
};

export const AlertIcon: Component<AlertIconProps> = (props) => {
  const component = () => {
    return alertIconMap[props.variant];
  };
  return (
    <Dynamic
      style={css({
        "--width": 6,
        "--height": 6,
        "--flex-shrink": 0,
        "--stroke": "inherit",
      })}
      component={component()}
    />
  );
};
