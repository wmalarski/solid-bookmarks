"use server";
import type { RequestEvent } from "solid-js/web";

import { redirect } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";

import {
  getRequestEventOrThrow,
  handleRpc,
  rpcErrorResult,
  rpcSuccessResult,
} from "../common/server/helpers";
import { paths } from "../common/utils/paths";
import { getRequestSupabase } from "../supabase/middleware";
import { USER_QUERY_KEY } from "./const";

const getRedirectUrl = (event: RequestEvent, path: string) => {
  const origin = new URL(event.request.url).origin;
  return origin + path;
};

export const signUpServerAction = (form: FormData) => {
  return handleRpc({
    data: decode(form),
    schema: v.object({
      email: v.pipe(v.string(), v.email()),
      password: v.pipe(v.string(), v.minLength(6), v.maxLength(20)),
    }),
    async handler(args) {
      const event = getRequestEventOrThrow();
      const supabase = getRequestSupabase();

      const result = await supabase.auth.signUp({
        ...args,
        options: {
          emailRedirectTo: getRedirectUrl(event, paths.signUpSuccess),
        },
      });

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return rpcSuccessResult(result.data);
    },
  });
};

export const signInServerAction = (form: FormData) => {
  return handleRpc({
    data: decode(form),
    schema: v.object({
      email: v.pipe(v.string(), v.email()),
      password: v.pipe(v.string(), v.minLength(3)),
    }),
    async handler(args) {
      const supabase = getRequestSupabase();

      const result = await supabase.auth.signInWithPassword(args);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      throw redirect(paths.home, { revalidate: USER_QUERY_KEY });
    },
  });
};

export const signOutServerAction = async () => {
  const supabase = getRequestSupabase();

  const result = await supabase.auth.signOut();

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw redirect(paths.signIn, { revalidate: USER_QUERY_KEY });
};

export const getUserServerLoader = async () => {
  const supabase = getRequestSupabase();

  const response = await supabase.auth.getUser();
  const user = response.data.user;

  if (!user) {
    throw redirect(paths.signIn);
  }

  return user;
};
