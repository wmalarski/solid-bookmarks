import type { FetchEvent } from "@solidjs/start/server";

import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { getHeader, setCookie } from "vinxi/http";

import type { SupabaseClient } from "@supabase/supabase-js";
import { getRequestEventOrThrow } from "../common/server/helpers";
import type { Database } from "./types";

export const supabaseMiddleware = async (event: FetchEvent) => {
  const supabase = createServerClient<Database>(
    event.locals.env.SUPABASE_URL,
    event.locals.env.SUPABASE_ANON_KEY,
    {
      auth: { flowType: "pkce" },
      cookies: {
        getAll: () => {
          return parseCookieHeader(
            getHeader(event.nativeEvent, "Cookie") ?? "",
          );
        },
        setAll: (cookiesToSet) => {
          for (const { name, options, value } of cookiesToSet) {
            setCookie(event.nativeEvent, name, value, options);
          }
        },
      },
    },
  );

  event.locals.supabase = supabase;
};

export const getRequestSupabase = () => {
  const event = getRequestEventOrThrow();
  const supabase: SupabaseClient<Database> = event.locals.supabase;
  return supabase;
};

declare module "@solidjs/start/server" {
  interface RequestEventLocals {
    supabase: SupabaseClient<Database>;
  }
}
