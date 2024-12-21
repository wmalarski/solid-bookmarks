import { type Component, type ComponentProps, splitProps } from "solid-js";

import { A } from "@solidjs/router";
import type { TokenamiStyle, Variants } from "@tokenami/css";
import { buttonGroupRecipe, buttonRecipe } from "./button.recipe";

export const buttonSplitProps = [
	"class",
	"color",
	"isLoading",
	"shape",
	"size",
	"variant",
] as const;

export type ButtonProps = TokenamiStyle<ComponentProps<"button">> &
	Variants<typeof buttonRecipe>;

export const Button: Component<ButtonProps> = (props) => {
	const [split, rest] = splitProps(props, buttonSplitProps);

	return <button {...rest} style={buttonRecipe(split, props.style)} />;
};

export type ButtonGroupProps = TokenamiStyle<ComponentProps<"div">> &
	Variants<typeof buttonGroupRecipe>;

export const ButtonGroup: Component<ButtonGroupProps> = (props) => {
	const [split, rest] = splitProps(props, ["direction"]);

	return <div {...rest} style={buttonGroupRecipe(split, props.style)} />;
};

export type LinkButtonProps = TokenamiStyle<ComponentProps<typeof A>> &
	Variants<typeof buttonRecipe>;

export const LinkButton: Component<LinkButtonProps> = (props) => {
	const [split, rest] = splitProps(props, buttonSplitProps);

	return <A {...rest} style={buttonRecipe(split, props.style)} />;
};
