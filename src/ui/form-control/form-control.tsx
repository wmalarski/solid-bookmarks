import type { VariantProps } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { formControlRecipe } from "./form-control.recipe";

export type FormControlProps = ComponentProps<"fieldset"> &
  VariantProps<typeof formControlRecipe>;

export const FormControl: Component<FormControlProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, ["direction"]);

  return (
    <fieldset
      {...withoutVariants}
      class={formControlRecipe({ ...variants, class: props.class })}
    />
  );
};
