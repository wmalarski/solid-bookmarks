import type { Component } from "solid-js";
import type { ComponentVariantProps } from "../utils/types";
import { formContainerRecipe } from "./form-container.recipe";

type FormContainerProps = ComponentVariantProps<
  "div",
  typeof formContainerRecipe
>;

export const FormContainer: Component<FormContainerProps> = (props) => {
  return <div {...props} class={formContainerRecipe({ class: props.class })} />;
};
