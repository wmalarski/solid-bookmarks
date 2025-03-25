import { twCva } from "../utils/tw-cva";

export const radioRecipe = twCva("radio", {
  defaultVariants: {
    color: null,
    size: null,
  },
  variants: {
    color: {
      accent: "radio-accent",
      error: "radio-error",
      info: "radio-info",
      neutral: "radio-neutral",
      primary: "radio-primary",
      secondary: "radio-secondary",
      success: "radio-success",
      warning: "radio-warning",
    },
    size: {
      lg: "radio-lg",
      md: "radio-md",
      sm: "radio-sm",
      xs: "radio-xs",
    },
  },
});
