import { type Component, type ComponentProps, splitProps } from "solid-js";

import type { Variants } from "@tokenami/css";
import { linkRecipe } from "./link.recipe";

export type LinkProps = ComponentProps<"a"> & Variants<typeof linkRecipe>;

export const Link: Component<LinkProps> = (props) => {
	const [split, rest] = splitProps(props, ["color", "hover", "size"]);

	return <a {...rest} class={linkRecipe({ class: props.class, ...split })} />;
};
