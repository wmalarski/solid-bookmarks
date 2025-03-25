import { twCva } from "../utils/tw-cva";

export const modalRecipe = twCva("modal", {
  defaultVariants: {
    horizontal: null,
    open: null,
    vertical: null,
  },
  variants: {
    horizontal: {
      end: "modal-end",
      start: "modal-start",
    },
    open: {
      true: "modal-open",
    },
    vertical: {
      bottom: "modal-bottom",
      middle: "modal-middle",
      top: "modal-top",
    },
  },
});

export const modalBoxRecipe = twCva("modal-box");

export const modalBackdropRecipe = twCva("modal-backdrop");

export const modalActionRecipe = twCva("modal-action");

export const modalToggleRecipe = twCva("modal-toggle");
