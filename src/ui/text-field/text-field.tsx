import type { VariantProps } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { textFieldInputRecipe } from "./text-field.recipe";

const variantPropsList = ["color", "size", "variant", "width"] as const;

export type TextFieldInputProps = ComponentProps<"input"> &
  VariantProps<typeof textFieldInputRecipe>;

export const TextFieldInput: Component<TextFieldInputProps> = (props) => {
  const [split, rest] = splitProps(props, variantPropsList);

  return (
    <input
      {...rest}
      class={textFieldInputRecipe({ ...split, class: props.class })}
    />
  );
};
