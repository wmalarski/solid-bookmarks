import {} from "solid-js";
import { twCva } from "../utils/tw-cva";

export const formControlRecipe = twCva("form-control", {
  defaultVariants: {
    direction: null,
  },
  variants: {
    direction: {
      horizontal: "flex-row items-center gap-2",
      vertical: "",
    },
  },
});
