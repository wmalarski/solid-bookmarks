import { type Component, type ComponentProps, splitProps } from "solid-js";
import type { ComponentVariantProps } from "../utils/types";
import { cardActionsRecipe, cardBodyRecipe, cardRecipe } from "./card.recipe";

export type CardProps = ComponentVariantProps<"div", typeof cardRecipe>;

export const Card: Component<CardProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, [
    "variant",
    "size",
    "imageFull",
    "side",
  ]);

  return (
    <div
      {...withoutVariants}
      class={cardRecipe({ class: props.class, ...variants })}
    />
  );
};

export type CardBodyProps = ComponentProps<"div">;

export const CardBody: Component<CardBodyProps> = (props) => {
  return <div {...props} class={cardBodyRecipe({ class: props.class })} />;
};

export type CardActionsProps = ComponentVariantProps<
  "div",
  typeof cardActionsRecipe
>;

export const CardActions: Component<CardActionsProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, ["justify"]);

  return (
    <div
      {...withoutVariants}
      class={cardActionsRecipe({ class: props.class, ...variants })}
    />
  );
};
