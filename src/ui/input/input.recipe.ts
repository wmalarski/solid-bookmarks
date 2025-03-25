import { twCva } from "../utils/tw-cva";

export const inputRecipe = twCva("input validator", {
  defaultVariants: {
    color: null,
    size: null,
    variant: null,
    width: null,
  },
  variants: {
    color: {
      accent: "input-accent",
      error: "input-error",
      info: "input-info",
      neutral: "input-neutral",
      primary: "input-primary",
      secondary: "input-secondary",
      success: "input-success",
      warning: "input-warning",
    },
    size: {
      lg: "input-lg",
      md: "input-md",
      sm: "input-sm",
      xl: "input-xl",
      xs: "input-xs",
    },
    variant: {
      ghost: "input-ghost",
    },
    width: {
      full: "w-full",
    },
  },
});
