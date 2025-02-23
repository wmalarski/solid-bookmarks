import type { VariantProps } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { badgeRecipe } from "./badge.recipe";

export type BadgeProps = ComponentProps<"div"> &
  VariantProps<typeof badgeRecipe>;

export const Badge: Component<BadgeProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, [
    "variant",
    "size",
    "color",
  ]);

  return (
    <div
      {...withoutVariants}
      class={badgeRecipe({ class: props.class, ...variants })}
    />
  );
};
