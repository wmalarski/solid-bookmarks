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
  const [variants, withoutVariants] = splitProps(props, ["message"]);

  return (
    <Show when={variants.message}>
      <span
        role="alert"
        {...withoutVariants}
        class={twCx("text-sm text-error pt-2", props.class)}
      >
        {variants.message}
      </span>
    </Show>
  );
};
