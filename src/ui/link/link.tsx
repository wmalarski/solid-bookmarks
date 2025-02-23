import type { VariantProps } from "class-variance-authority";

import { type Component, type ComponentProps, splitProps } from "solid-js";

import { A } from "@solidjs/router";
import { linkRecipe } from "./link.recipe";

export type LinkProps = ComponentProps<typeof A> &
  VariantProps<typeof linkRecipe>;

export const Link: Component<LinkProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, [
    "color",
    "hover",
    "size",
  ]);

  return (
    <A
      {...withoutVariants}
      class={linkRecipe({ class: props.class, ...variants })}
    />
  );
};
