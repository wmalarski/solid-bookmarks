import { css } from "@tokenami/css";

export const buttonRecipe = css.compose({
  "--display": "inline-flex",
  "--align-items": "center",
  "--justify-content": "center",
  "--white-space": "nowrap",
  "--font-size": "var(--font-size_sm)",
  "--font-weight": "var(--weight_semibold)",
  "--outline": "none",
  "--background-color": "var(--color_primary)",
  "--color": "var(--color_white)",
  // "--border": "",
  variants: {
    size: {
      lg: {},
      md: {},
      sm: {},
      xs: {},
    },
    variant: {
      accent: {},
      error: {},
      info: {},
      primary: {},
      secondary: {},
      success: {},
      warning: {},
    },
    isLoading: {
      true: {},
      false: {},
    },
    shape: {
      block: {},
      circle: {},
      ellipsis: {},
      square: {},
      wide: {},
    },
  },
});

/*

.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem; 
  font-size: 0.875rem; 
  font-weight: 600;
  outline: none;
  background-color: hsl(var(--primary));
  color: white; 
  border: 0.0375rem solid hsl(var(--border) / 0.8);
  transition: background-color 0.2s ease;
  height: 2.5rem; 
  padding-left: 1rem; 
  padding-right: 1rem; 
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  max-width: 20rem;
}

.Button:hover {
  cursor: pointer;
  background-color: hsl(var(--primary) / 0.8);
  transition: background-color 0.2s ease;
}

.Button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px hsl(var(--foreground) / 0.50);
}

.Button:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.Button:disabled:focus-visible {
  outline: none;
  box-shadow: none;
}

.Button[data-variant='destructive'] {
  background-color: hsl(var(--destructive)); 
  color: hsl(var(--destructive-foreground)); 
  transition: background-color 0.2s ease;
}

.Button[data-variant='destructive']:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.Button[data-variant='outline'] {
  border: 1px solid hsl(var(--border)); 
  background-color: hsl(var(--background)); 
  color: hsl(var(--foreground));
  transition: background-color 0.2s ease, color 0.2s ease;
}

.Button[data-variant='outline']:hover {
  cursor: pointer;
  background-color: hsl(var(--foreground) / 0.05); 
  color: hsl(var(--accent-foreground));
}

.Button[data-variant='secondary'] {
  background-color: hsl(var(--secondary)); 
  color: hsl(var(--secondary-foreground));
  transition: background-color 0.2s ease;
}

.Button[data-variant='secondary']:hover {
   background-color: hsl(var(--secondary) / 0.9);
}

.Button[data-variant='ghost'] {
  background-color: transparent; 
  border: 1px solid transparent;
  color: hsl(var(--foreground));
  display: flex;
  align-items: center;
}

.Button[data-variant='ghost']:hover {
   background-color: hsl(var(--foreground) / 0.1);
}

.Button[data-variant='link'] {
  color: hsl(var(--foreground)); 
  background-color: transparent;
  text-decoration: none;
  transition: text-decoration 0.2s ease;
  border: none;
  padding: 0;
  height: max-content;
  width: max-content;
}

.Button[data-variant='link']:hover {
   color: hsl(var(--primary)); 
   text-decoration-color: hsl(var(--foreground));
}

.Button[data-variant='icon'] {
  background-color: hsl(var(--foreground)); 
  border: none;
  color: hsl(var(--background));
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 2rem;
  padding: 0;
  border-radius: 9999px;
}

.Button[data-variant='icon']:hover {
   background-color: hsl(var(--accent) / 0.8);
}


.Button[data-size='sm'] {
  height: 2.25rem; 
  border-radius: 0.375rem; 
  padding-left: 0.75rem; 
  padding-right: 0.75rem; 
}

.Button[data-size='lg'] {
  height: 2.75rem; 
  border-radius: 0.375rem; 
  padding-left: 2rem; 
  padding-right: 2rem; 
}

.Button[data-size='icon'] {
  height: 2.5rem;
  width: 2.5rem; 
}

*/

// export const buttonRecipe = twCva("btn no-animation flex items-center gap-1", {
// 	defaultVariants: {
// 		color: null,
// 		isLoading: false,
// 		shape: null,
// 		size: "md",
// 		variant: null,
// 	},
// 	variants: {
// 		color: {
// 			accent: "btn-accent",
// 			error: "btn-error",
// 			info: "btn-info",
// 			primary: "btn-primary",
// 			secondary: "btn-secondary",
// 			success: "btn-success",
// 			warning: "btn-warning",
// 		},
// 		isLoading: {
// 			false: "",
// 			true: "after:loading after:loading-spinner pointer-events-none",
// 		},
// 		shape: {
// 			block: "btn-block",
// 			circle: "btn-circle",
// 			ellipsis: "btn-circle w-[unset]",
// 			square: "btn-square",
// 			wide: "btn-wide",
// 		},
// 		size: {
// 			lg: "btn-lg",
// 			md: "btn-md",
// 			sm: "btn-sm",
// 			xs: "btn-xs",
// 		},
// 		variant: {
// 			active: "btn-active",
// 			disabled: "btn-disabled",
// 			ghost: "btn-ghost",
// 			glass: "glass",
// 			link: "btn-link",
// 			outline: "btn-outline",
// 		},
// 	},
// });

export const buttonGroupRecipe = css.compose({
  variants: {
    direction: {
      horizontal: {},
      vertical: {},
    },
  },
});

// export const buttonGroupRecipe = twCva("btn-group", {
// 	defaultVariants: {
// 		direction: null,
// 	},
// 	variants: {
// 		direction: {
// 			horizontal: "btn-group-horizontal",
// 			vertical: "btn-group-vertical",
// 		},
// 	},
// });
