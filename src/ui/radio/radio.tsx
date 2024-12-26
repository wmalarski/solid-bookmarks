import type { VariantProps } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { radioRecipe } from "./radio.recipe";

export type RadioProps = ComponentProps<"input"> &
  VariantProps<typeof radioRecipe>;

export const Radio: Component<RadioProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, ["size", "color"]);

  return (
    <input
      {...withoutVariants}
      type="radio"
      class={radioRecipe({ ...variants, class: props.class })}
    />
  );
};
