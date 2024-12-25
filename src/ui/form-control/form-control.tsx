import type { Component, ComponentProps } from "solid-js";
import { twCx } from "../utils/tw-cva";

export type FormControlProps = ComponentProps<"fieldset">;

export const FormControl: Component<FormControlProps> = (props) => {
  return <fieldset {...props} class={twCx("form-control", props.class)} />;
};
