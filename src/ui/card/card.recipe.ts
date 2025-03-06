import { twCva } from "../utils/tw-cva";

export const cardRecipe = twCva("card", {
  defaultVariants: {
    modifier: null,
    size: null,
    variant: null,
  },
  variants: {
    size: {
      xs: "card-xs",
      sm: "card-sm",
      md: "card-md",
      lg: "card-lg",
      xl: "card-xl",
    },
    variant: {
      bordered: "card-border",
      dash: "card-dash",
    },
    modifier: {
      side: "card-side",
      imageFull: "image-full",
    },
  },
});

export const cardTitleRecipe = twCva("card-title");

export const cardBodyRecipe = twCva("card-body");

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
