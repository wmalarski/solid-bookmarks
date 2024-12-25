import type { Component, ComponentProps } from "solid-js";
import { twCx } from "../utils/tw-cva";

export type LabelProps = ComponentProps<"label">;

export const Label: Component<LabelProps> = (props) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label {...props} class={twCx("label gap-2", props.class)} />
  );
};

export type LabelTextProps = ComponentProps<"span">;

export const LabelText: Component<LabelTextProps> = (props) => {
  return <span {...props} class={twCx("label-text", props.class)} />;
};
