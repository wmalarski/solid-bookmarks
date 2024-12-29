import { twCva } from "../utils/tw-cva";

export const badgeRecipe = twCva("badge", {
  defaultVariants: {
    color: null,
    size: "md",
    variant: null,
  },
  variants: {
    color: {
      accent: "badge-accent",
      error: "badge-error",
      ghost: "badge-ghost",
      info: "badge-info",
      primary: "badge-primary",
      secondary: "badge-secondary",
      success: "badge-success",
      warning: "badge-warning",
    },
    size: {
      lg: "badge-lg",
      md: "badge-md",
      sm: "badge-sm",
      xs: "badge-xs",
    },
    variant: {
      outline: "badge-outline",
    },
  },
});
