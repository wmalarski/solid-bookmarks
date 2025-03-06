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
    color: {
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    },
    isLoading: {
      false: "",
      true: "after:loading after:loading-spinner pointer-events-none",
    },
    shape: {
      wide: "btn-wide",
      block: "btn-block",
      square: "btn-square",
      circle: "btn-circle",
      ellipsis: "btn-circle w-[unset]",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
    },
    variant: {
      outline: "btn-outline",
      dash: "btn-dash",
      soft: "btn-soft",
      ghost: "btn-ghost",
      link: "btn-link",
    },
    behaviour: {
      active: "btn-active",
      disabled: "btn-disabled",
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
