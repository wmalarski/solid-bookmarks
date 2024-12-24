import { css } from "@tokenami/css";

export const cardRecipe = css.compose({
  "--padding": 4,
  variants: {
    variant: {
      bordered: {},
    },
    size: {},
    color: {},
    bg: {
      "base-100": {},
      "base-200": {},
      "base-300": {},
    },
  },
});

// export const cardRecipe = twCva("card", {
// 	defaultVariants: {
// 		bg: null,
// 		color: null,
// 		size: null,
// 		variant: null,
// 	},
// 	variants: {
// 		bg: {
// 			"base-100": "bg-base-100",
// 			"base-200": "bg-base-200",
// 			"base-300": "bg-base-300",
// 		},
// 		color: {
// 			accent: "border-l-8 border-l-accent",
// 			black: "border-l-8 border-l-neutral",
// 			disabled: "border-l-8 border-l-base-200",
// 			error: "border-l-8 border-l-error",
// 			info: "border-l-8 border-l-info",
// 			primary: "border-l-8 border-l-primary",
// 			secondary: "border-l-8 border-l-secondary",
// 			success: "border-l-8 border-l-success",
// 			warning: "border-l-8 border-l-warning",
// 		},
// 		size: {
// 			compact: "card-compact",
// 			normal: "card-normal",
// 			side: "card-side",
// 		},
// 		variant: {
// 			bordered: "card-bordered",
// 		},
// 	},
// });

export const cardTitleRecipe = css.compose({});

// export const cardTitleRecipe = twCva("card-title");

export const cardActionsRecipe = css.compose({
  variants: {
    justify: {},
  },
});

// export const cardActionsRecipe = twCva("card-actions", {
// 	defaultVariants: {
// 		justify: null,
// 	},
// 	variants: {
// 		justify: {
// 			end: "justify-end",
// 		},
// 	},
// });
