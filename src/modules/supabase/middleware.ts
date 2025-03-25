import type { FetchEvent } from "@solidjs/start/server";

import {
  createServerClient,
  type GetAllCookies,
  parseCookieHeader,
} from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getHeader, setCookie } from "vinxi/http";
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
          const result: Awaited<ReturnType<GetAllCookies>> = [];
          const header = getHeader(event.nativeEvent, "Cookie") ?? "";
          parseCookieHeader(header).forEach(({ name, value }) => {
            value && result.push({ name, value });
          });
          return result;
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
