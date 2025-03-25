import { twCva } from "../utils/tw-cva";

export const buttonRecipe = twCva("btn flex items-center gap-1", {
  defaultVariants: {
    color: null,
    isLoading: false,
    shape: null,
    size: "md",
    variant: null,
  },
  variants: {
    behaviour: {
      active: "btn-active",
      disabled: "btn-disabled",
    },
    color: {
      accent: "btn-accent",
      error: "btn-error",
      info: "btn-info",
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      success: "btn-success",
      warning: "btn-warning",
    },
    isLoading: {
      false: "",
      true: "after:loading after:loading-spinner pointer-events-none",
    },
    shape: {
      block: "btn-block",
      circle: "btn-circle",
      ellipsis: "btn-circle w-[unset]",
      square: "btn-square",
      wide: "btn-wide",
    },
    size: {
      lg: "btn-lg",
      md: "btn-md",
      sm: "btn-sm",
      xl: "btn-xl",
      xs: "btn-xs",
    },
    variant: {
      dash: "btn-dash",
      ghost: "btn-ghost",
      link: "btn-link",
      outline: "btn-outline",
      soft: "btn-soft",
    },
  },
});

export const buttonGroupRecipe = twCva("btn-group", {
  defaultVariants: {
    direction: null,
  },
  variants: {
    direction: {
      horizontal: "btn-group-horizontal",
      vertical: "btn-group-vertical",
    },
  },
});
