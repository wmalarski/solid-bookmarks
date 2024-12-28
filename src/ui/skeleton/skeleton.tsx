import type { Component, ComponentProps } from "solid-js";
import { twCx } from "../utils/tw-cva";

export type SkeletonProps = ComponentProps<"div">;

export const Skeleton: Component<SkeletonProps> = (props) => {
  return <div {...props} class={twCx("skeleton", props.class)} />;
};
