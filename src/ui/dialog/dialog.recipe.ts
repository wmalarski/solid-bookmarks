import { twCva } from "../utils/tw-cva";

export const modalRecipe = twCva("modal", {
  defaultVariants: {
    open: null,
    horizontal: null,
    vertical: null,
  },
  variants: {
    open: {
      true: "modal-open",
    },
    vertical: {
      top: "modal-top",
      middle: "modal-middle",
      bottom: "modal-bottom",
    },
    horizontal: {
      start: "modal-start",
      end: "modal-end",
    },
  },
});

export const modalBoxRecipe = twCva("modal-box");

export const modalBackdropRecipe = twCva("modal-backdrop");

export const modalActionRecipe = twCva("modal-action");

export const modalToggleRecipe = twCva("modal-toggle");
