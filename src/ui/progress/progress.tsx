import type { Component, ComponentProps } from "solid-js";
import { twCx } from "../utils/tw-cva";
import styles from "./progress.module.css";

type ProgressProps = ComponentProps<"div">;

export const Progress: Component<ProgressProps> = (props) => {
  return (
    <div
      {...props}
      class={twCx("absolute h-1 w-screen", styles.progress, props.class)}
    />
  );
};
