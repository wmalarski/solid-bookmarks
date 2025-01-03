import type { Component, JSX } from "solid-js";
import { twCx } from "../utils/tw-cva";
import styles from "./progress.module.css";

export type ProgressProps = JSX.IntrinsicElements["div"];

export const Progress: Component<ProgressProps> = (props) => {
  return (
    <div
      {...props}
      class={twCx("absolute h-1 w-screen", styles.progress, props.class)}
    />
  );
};
