import { createMiddleware } from "@solidjs/start/middleware";
import { serverEnvMiddleware } from "./modules/common/server/env";
import { supabaseMiddleware } from "./modules/supabase/middleware";

export default createMiddleware({
  onRequest: [serverEnvMiddleware, supabaseMiddleware],
});

/*
  daisyui: {
    themes: [
      {
        "cyberpunk-dark": {
          ...cyberpunkTheme,
          "base-100": "#1c1917",
          "base-200": "#292524",
          "base-300": "#57534e",
          "base-content": "#e7e5e4",
          "color-scheme": "dark",
          neutral: "#e7e5e4",
          "neutral-content": "#191D24",
          "neutral-focus": "#f8f8f8",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
*/
