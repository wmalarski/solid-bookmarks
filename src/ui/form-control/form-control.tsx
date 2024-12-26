import type { VariantProps } from "class-variance-authority";
import { splitProps, type Component, type ComponentProps } from "solid-js";
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
