import { type Component, splitProps } from "solid-js";
import type { ComponentVariantProps } from "../utils/types";
import { radioRecipe } from "./radio.recipe";

type RadioProps = ComponentVariantProps<"input", typeof radioRecipe>;

export const Radio: Component<RadioProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, ["size", "color"]);

  return (
    <input
      {...withoutVariants}
      class={radioRecipe({ ...variants, class: props.class })}
      type="radio"
    />
  );
};
