import { twCva } from "../utils/tw-cva";

export const badgeRecipe = twCva("badge", {
  defaultVariants: {
    color: null,
    size: null,
    variant: null,
  },
  variants: {
    color: {
      accent: "badge-accent",
      error: "badge-error",
      info: "badge-info",
      neutral: "badge-neutral",
      primary: "badge-primary",
      secondary: "badge-secondary",
      success: "badge-success",
      warning: "badge-warning",
    },
    size: {
      lg: "badge-lg",
      md: "badge-md",
      sm: "badge-sm",
      xl: "badge-xl",
      xs: "badge-xs",
    },
    variant: {
      dash: "badge-dash",
      ghost: "badge-ghost",
      outline: "badge-outline",
      soft: "badge-soft",
    },
  },
});
