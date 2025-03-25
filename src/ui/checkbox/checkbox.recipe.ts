import { twCva } from "../utils/tw-cva";

export const checkboxRecipe = twCva("checkbox", {
  defaultVariants: {
    color: null,
    size: null,
  },
  variants: {
    color: {
      accent: "checkbox-accent",
      error: "checkbox-error",
      info: "checkbox-info",
      neutral: "checkbox-neutral",
      primary: "checkbox-primary",
      secondary: "checkbox-secondary",
      success: "checkbox-success",
      warning: "checkbox-warning",
    },
    size: {
      lg: "checkbox-lg",
      md: "checkbox-md",
      sm: "checkbox-sm",
      xl: "checkbox-xl",
      xs: "checkbox-xs",
    },
  },
});
