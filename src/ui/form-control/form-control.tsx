import { type Component, splitProps } from "solid-js";
import type { ComponentVariantProps } from "../utils/types";
import { formControlRecipe } from "./form-control.recipe";

export type FormControlProps = ComponentVariantProps<
  "fieldset",
  typeof formControlRecipe
>;

export const FormControl: Component<FormControlProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, ["direction"]);

  return (
    <fieldset
      {...withoutVariants}
      class={formControlRecipe({ ...variants, class: props.class })}
    />
  );
};
