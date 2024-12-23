import { css, type TokenamiStyle, type Variants } from "@tokenami/css";
import { type Component, type ComponentProps, splitProps } from "solid-js";

export type TextFieldRootProps = TokenamiStyle<ComponentProps<"fieldset">>;

export const TextFieldRoot: Component<TextFieldRootProps> = (props) => {
  return <fieldset {...props} style={css({}, props.style)} />;
};

export type TextFieldLabelProps = TokenamiStyle<ComponentProps<"label">>;

export const TextFieldLabel: Component<TextFieldLabelProps> = (props) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label {...props} style={css({}, props.style)} />
  );
};

export type TextFieldLabelTextProps = TokenamiStyle<ComponentProps<"span">>;

export const TextFieldLabelText: Component<TextFieldLabelTextProps> = (
  props,
) => {
  return <span {...props} style={css({}, props.style)} />;
};

export type TextFieldDescriptionProps = TokenamiStyle<ComponentProps<"span">>;

export const TextFieldDescription: Component<TextFieldDescriptionProps> = (
  props,
) => {
  return <span {...props} style={css({}, props.style)} />;
};

export type TextFieldErrorMessageProps = TokenamiStyle<ComponentProps<"span">>;

export const TextFieldErrorMessage: Component<TextFieldErrorMessageProps> = (
  props,
) => {
  return <span {...props} style={css({}, props.style)} />;
};

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

export type TextFieldTextAreaProps = TokenamiStyle<ComponentProps<"textarea">> &
  Variants<typeof textFieldInputRecipe>;

export const TextFieldTextArea: Component<TextFieldTextAreaProps> = (props) => {
  const [split, rest] = splitProps(props, variantPropsList);

  return <textarea {...rest} style={textFieldInputRecipe(split)} />;
};