import { type Component, splitProps } from "solid-js";

import { A } from "@solidjs/router";
import type { ComponentVariantProps } from "../utils/types";
import { linkRecipe } from "./link.recipe";

type LinkProps = ComponentVariantProps<typeof A, typeof linkRecipe>;

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
