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
    },
    size: {
      lg: "input-lg",
      md: "input-md",
      sm: "input-sm",
      xs: "input-xs",
    },
    variant: {
      bordered: "input-bordered",
      ghost: "input-ghost",
    },
    width: {
      full: "w-full",
    },
  },
});
