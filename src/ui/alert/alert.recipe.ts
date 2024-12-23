import { css } from "@tokenami/css";

export const alertRecipe = css.compose({
  "--justify-content": "start",
  variants: {
    variant: {
      error: {},
      info: {},
      success: {},
      warning: {},
    },
  },
});
