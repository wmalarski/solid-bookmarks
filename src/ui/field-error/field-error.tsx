import type { TokenamiStyle } from "@tokenami/css";
import { css } from "@tokenami/css";
import {
  Show,
  splitProps,
  type Component,
  type ComponentProps,
} from "solid-js";

export type FieldErrorProps = Omit<
  TokenamiStyle<ComponentProps<"span">>,
  "children"
> & {
  message?: string;
  id: string;
};

export const FieldError: Component<FieldErrorProps> = (props) => {
  const [split, rest] = splitProps(props, ["message"]);

  return (
    <Show when={split.message}>
      <span
        role="alert"
        {...rest}
        style={css(
          {
            "--font-size": "var(--font-size_xs)",
            "--line-height": "var(--leading_xs)",
            "--padding-top": 2,
            "--color": "var(--color_error)",
          },
          props.style,
        )}
      >
        {split.message}
      </span>
    </Show>
  );
};
