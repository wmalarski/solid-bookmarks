import { twCva } from "../utils/tw-cva";

export const cardRecipe = twCva("card bg-base-200", {
  defaultVariants: {
    imageFull: null,
    side: null,
    size: null,
    variant: null,
  },
  variants: {
    imageFull: {
      true: "image-full",
    },
    side: {
      true: "card-side",
    },
    size: {
      lg: "card-lg",
      md: "card-md",
      sm: "card-sm",
      xl: "card-xl",
      xs: "card-xs",
    },
    variant: {
      bordered: "card-border",
      dash: "card-dash",
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
