import { twCva } from "../utils/tw-cva";

export const cardRecipe = twCva("card", {
  defaultVariants: {
    color: null,
    size: null,
    variant: null,
  },
  variants: {
    color: {
      accent: "border-l-8 border-l-accent",
      black: "border-l-8 border-l-neutral",
      disabled: "border-l-8 border-l-base-200",
      error: "border-l-8 border-l-error",
      info: "border-l-8 border-l-info",
      primary: "border-l-8 border-l-primary",
      secondary: "border-l-8 border-l-secondary",
      success: "border-l-8 border-l-success",
      warning: "border-l-8 border-l-warning",
    },
    size: {
      compact: "card-compact",
      normal: "card-normal",
      side: "card-side",
    },
    variant: {
      bordered: "card-bordered",
    },
  },
});

export const cardTitleRecipe = twCva("card-title");

export const cardActionsRecipe = twCva("card-actions", {
  defaultVariants: {
    justify: null,
  },
  variants: {
    justify: {
      end: "justify-end",
    },
  },
});
