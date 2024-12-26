import type { VariantProps } from "class-variance-authority";

import {
  type Component,
  type ComponentProps,
  type ValidComponent,
  splitProps,
} from "solid-js";
import { Dynamic, type DynamicProps } from "solid-js/web";

import { twCx } from "../utils/tw-cva";
import { cardActionsRecipe, cardRecipe, cardTitleRecipe } from "./card.recipe";

export type CardProps = ComponentProps<"div"> & VariantProps<typeof cardRecipe>;

export const Card: Component<CardProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, [
    "variant",
    "size",
    "color",
  ]);

  return (
    <div
      {...withoutVariants}
      class={cardRecipe({ class: props.class, ...variants })}
    />
  );
};

export type CardTitleProps<T extends ValidComponent> = DynamicProps<T>;

export function CardTitle<T extends ValidComponent>(props: CardTitleProps<T>) {
  return (
    <Dynamic
      {...props}
      class={cardTitleRecipe({ class: props.class })}
      component={props.component}
    />
  );
}

export type CardBodyProps = ComponentProps<"div">;

export const CardBody: Component<CardBodyProps> = (props) => {
  return <div {...props} class={twCx("card-body", props.class)} />;
};

export type CardActionsProps = ComponentProps<"div"> &
  VariantProps<typeof cardActionsRecipe>;

export const CardActions: Component<CardActionsProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, ["justify"]);

  return (
    <div
      {...withoutVariants}
      class={cardActionsRecipe({ class: props.class, ...variants })}
    />
  );
};
