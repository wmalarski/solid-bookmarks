import { twCva } from "../utils/tw-cva";

export const alertRecipe = twCva("alert justify-start", {
  defaultVariants: {
    color: null,
    variant: null,
    direction: null,
  },
  variants: {
    variant: {
      dash: "alert-dash",
      soft: "alert-soft",
      outline: "alert-outline",
    },
    color: {
      error: "alert-error",
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
    },
    direction: {
      vertical: "alert-vertical",
      horizontal: "alert-horizontal",
    },
  },
});
