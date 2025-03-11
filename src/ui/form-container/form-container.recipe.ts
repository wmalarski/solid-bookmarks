import { twCva } from "../utils/tw-cva";

export const formContainerRecipe = twCva("flex w-full flex-col gap-4", {
  variants: {
    maxW: {
      md: "max-w-md",
    },
  },
});
