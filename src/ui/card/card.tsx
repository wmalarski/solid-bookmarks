import {
	type Component,
	type ComponentProps,
	type ValidComponent,
	splitProps,
} from "solid-js";
import { Dynamic, type DynamicProps } from "solid-js/web";

import { type TokenamiStyle, type Variants, css } from "@tokenami/css";
import { cardActionsRecipe, cardRecipe, cardTitleRecipe } from "./card.recipe";

export type CardProps = TokenamiStyle<ComponentProps<"div">> &
	Variants<typeof cardRecipe>;

export const Card: Component<CardProps> = (props) => {
	const [split, rest] = splitProps(props, ["variant", "size", "color", "bg"]);

	return <div {...rest} style={cardRecipe(split, props.style)} />;
};

export type CardTitleProps<T extends ValidComponent> = DynamicProps<T> &
	TokenamiStyle<unknown>;

export function CardTitle<T extends ValidComponent>(props: CardTitleProps<T>) {
	return (
		<Dynamic
			{...props}
			style={cardTitleRecipe({}, props.style)}
			component={props.component}
		/>
	);
}

export type CardBodyProps = TokenamiStyle<ComponentProps<"div">>;

export const CardBody: Component<CardBodyProps> = (props) => {
	return <div {...props} style={css({}, props.style)} />;
};

export type CardActionsProps = TokenamiStyle<ComponentProps<"div">> &
	Variants<typeof cardActionsRecipe>;

export const CardActions: Component<CardActionsProps> = (props) => {
	const [split, rest] = splitProps(props, ["justify"]);

	return <div {...rest} style={cardActionsRecipe(split, props.style)} />;
};
