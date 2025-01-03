import {
  type Component,
  type ComponentProps,
  Show,
  splitProps,
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
        class={twCx("pt-2 text-error text-sm", props.class)}
      >
        {variants.message}
      </span>
    </Show>
  );
};
