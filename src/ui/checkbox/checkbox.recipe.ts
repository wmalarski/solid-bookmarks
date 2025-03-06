import { twCva } from "../utils/tw-cva";

export const checkboxRecipe = twCva("checkbox", {
  defaultVariants: {
    color: null,
    size: null,
  },
  variants: {
    color: {
      neutral: "checkbox-neutral",
      accent: "checkbox-accent",
      error: "checkbox-error",
      info: "checkbox-info",
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      success: "checkbox-success",
      warning: "checkbox-warning",
    },
    size: {
      lg: "checkbox-lg",
      md: "checkbox-md",
      sm: "checkbox-sm",
      xs: "checkbox-xs",
      xl: "checkbox-xl",
    },
  },
});
