import { A } from "@solidjs/router";
import type { TokenamiStyle, Variants } from "@tokenami/css";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { linkRecipe } from "./link.recipe";

export type LinkProps = TokenamiStyle<ComponentProps<typeof A>> &
  Variants<typeof linkRecipe>;

export const Link: Component<LinkProps> = (props) => {
  const [split, rest] = splitProps(props, ["color", "hover", "size"]);

  return <A {...rest} style={linkRecipe(split, props.style)} />;
};
