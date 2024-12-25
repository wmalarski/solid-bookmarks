import type { VariantProps } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { checkboxRecipe } from "./checkbox.recipe";

export type CheckboxProps = ComponentProps<"input"> &
  VariantProps<typeof checkboxRecipe>;

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
