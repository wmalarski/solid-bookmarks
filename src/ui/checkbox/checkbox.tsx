import { type Component, splitProps } from "solid-js";
import type { ComponentVariantProps } from "../utils/types";
import { checkboxRecipe } from "./checkbox.recipe";

export type CheckboxProps = ComponentVariantProps<
  "input",
  typeof checkboxRecipe
>;

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, ["size", "color"]);

  return (
    <input
      {...withoutVariants}
      type="checkbox"
      class={checkboxRecipe({ ...variants, class: props.class })}
    />
  );
};
