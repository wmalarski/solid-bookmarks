import { type Component, type ComponentProps, splitProps } from "solid-js";

import type { Variants } from "@tokenami/css";
import { buttonGroupRecipe, buttonRecipe } from "./button.recipe";

export const buttonSplitProps = [
	"class",
	"color",
	"isLoading",
	"shape",
	"size",
	"variant",
] as const;

export type ButtonProps = ComponentProps<"button"> &
	Variants<typeof buttonRecipe>;

export const Button: Component<ButtonProps> = (props) => {
	const [split, rest] = splitProps(props, buttonSplitProps);

	return <button {...rest} class={buttonRecipe(split)} />;
};

export type ButtonGroupProps = ComponentProps<"div"> &
	Variants<typeof buttonGroupRecipe>;

export const ButtonGroup: Component<ButtonGroupProps> = (props) => {
	const [split, rest] = splitProps(props, ["direction"]);

	return (
		<div
			{...rest}
			class={buttonGroupRecipe({ class: props.class, ...split })}
		/>
	);
};

export type LinkButtonProps = ComponentProps<"a"> &
	Variants<typeof buttonRecipe>;

export const LinkButton: Component<LinkButtonProps> = (props) => {
	const [split, rest] = splitProps(props, buttonSplitProps);

	return <a {...rest} class={buttonRecipe(split)} />;
};
