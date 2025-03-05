import { twCva } from "../utils/tw-cva";

export const textFieldInputRecipe = twCva("input", {
  defaultVariants: {
    color: null,
    size: "md",
    variant: null,
    width: null,
  },
  variants: {
    color: {
      accent: "input-accent",
      error: "input-error",
      info: "input-info",
      primary: "input-primary",
      secondary: "input-secondary",
      success: "input-success",
      warning: "input-warning",
      neutral: "input-neutral",
    },
    size: {
      lg: "input-lg",
      md: "input-md",
      sm: "input-sm",
      xs: "input-xs",
      xl: "input-xl",
    },
    variant: {
      ghost: "input-ghost",
    },
    width: {
      full: "w-full",
    },
  },
});
