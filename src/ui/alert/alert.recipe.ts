import { twCva } from "../utils/tw-cva";

export const alertRecipe = twCva("alert justify-start text-xs", {
  defaultVariants: {
    color: null,
    direction: null,
    variant: null,
  },
  variants: {
    color: {
      error: "alert-error",
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
    },
    direction: {
      horizontal: "alert-horizontal",
      vertical: "alert-vertical",
    },
    variant: {
      dash: "alert-dash",
      outline: "alert-outline",
      soft: "alert-soft",
    },
  },
});
