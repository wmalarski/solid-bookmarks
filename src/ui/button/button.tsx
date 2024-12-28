import { A } from "@solidjs/router";
import type { VariantProps } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { buttonGroupRecipe, buttonRecipe } from "./button.recipe";

const buttonSplitProps = [
  "class",
  "color",
  "isLoading",
  "shape",
  "size",
  "variant",
] as const;

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonRecipe>;

export const Button: Component<ButtonProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, buttonSplitProps);

  return (
    <button
      {...withoutVariants}
      class={buttonRecipe({ ...variants, class: props.class })}
    />
  );
};

export type ButtonGroupProps = ComponentProps<"div"> &
  VariantProps<typeof buttonGroupRecipe>;

export const ButtonGroup: Component<ButtonGroupProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, ["direction"]);

  return (
    <div
      {...withoutVariants}
      class={buttonGroupRecipe({ ...variants, class: props.class })}
    />
  );
};

export type LinkButtonProps = ComponentProps<typeof A> &
  VariantProps<typeof buttonRecipe>;

export const LinkButton: Component<LinkButtonProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, buttonSplitProps);

  return (
    <A
      {...withoutVariants}
      class={buttonRecipe({ ...variants, class: props.class })}
    />
  );
};
