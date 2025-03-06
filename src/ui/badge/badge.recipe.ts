import { twCva } from "../utils/tw-cva";

export const badgeRecipe = twCva("badge", {
  defaultVariants: {
    color: null,
    size: null,
    variant: null,
  },
  variants: {
    color: {
      neutral: "badge-neutral",
      primary: "badge-primary",
      secondary: "badge-secondary",
      accent: "badge-accent",
      info: "badge-info",
      success: "badge-success",
      warning: "badge-warning",
      error: "badge-error",
    },
    size: {
      lg: "badge-lg",
      md: "badge-md",
      sm: "badge-sm",
      xs: "badge-xs",
      xl: "badge-xl",
    },
    variant: {
      outline: "badge-outline",
      dash: "badge-dash",
      soft: "badge-soft",
      ghost: "badge-ghost",
    },
  },
});
