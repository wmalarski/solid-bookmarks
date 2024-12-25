import type { TokenamiStyle } from "@tokenami/css";
import { css } from "@tokenami/css";
import type { Component, ComponentProps } from "solid-js";

export type FormControlProps = TokenamiStyle<ComponentProps<"fieldset">>;

export const FormControl: Component<FormControlProps> = (props) => {
  return (
    <fieldset
      {...props}
      style={css(
        { "--display": "flex", "--flex-direction": "column" },
        props.style,
      )}
    />
  );
};
