import {
  Show,
  splitProps,
  type Component,
  type ComponentProps,
} from "solid-js";
import { twCx } from "../utils/tw-cva";

export type FieldErrorProps = Omit<ComponentProps<"span">, "children"> & {
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
        class={twCx("text-sm text-error pt-2", props.class)}
      >
        {split.message}
      </span>
    </Show>
  );
};
