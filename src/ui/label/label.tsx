import type { TokenamiStyle } from "@tokenami/css";
import { css } from "@tokenami/css";
import type { Component, ComponentProps } from "solid-js";

export type LabelProps = TokenamiStyle<ComponentProps<"label">>;

export const Label: Component<LabelProps> = (props) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label
      {...props}
      style={css(
        {
          "--display": "flex",
          "--user-select": "none",
          "--align-items": "center",
          "--justify-content": "space-between",
          "--padding-top": 2,
          "--padding-bottom": 2,
          "--padding-left": 1,
          "--padding-right": 1,
          "--cursor": "pointer",
        },
        props.style,
      )}
    />
  );
};

export type LabelTextProps = TokenamiStyle<ComponentProps<"span">>;

export const LabelText: Component<LabelTextProps> = (props) => {
  return (
    <span
      {...props}
      style={css(
        {
          "--font-size": "var(--font-size_sm)",
          "--line-height": "var(--leading_sm)",
        },
        props.style,
      )}
    />
  );
};
