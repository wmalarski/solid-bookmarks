import { css, type TokenamiStyle, type Variants } from "@tokenami/css";
import { type Component, type ComponentProps, splitProps } from "solid-js";

export const textFieldInputRecipe = css.compose({
  variants: {
    color: {
      accent: {},
      error: {},
      info: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
    },
    size: {
      lg: {},
      md: {},
      sm: {},
      xs: {},
    },
    variant: {
      bordered: {},
      ghost: {},
    },
    width: {
      full: {},
    },
  },
});

const variantPropsList = ["color", "size", "variant", "width"] as const;

export type TextFieldInputProps = TokenamiStyle<ComponentProps<"input">> &
  Variants<typeof textFieldInputRecipe>;

export const TextFieldInput: Component<TextFieldInputProps> = (props) => {
  const [split, rest] = splitProps(props, variantPropsList);

  return <input {...rest} style={textFieldInputRecipe(split)} />;
};
