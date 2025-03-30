import { action, query, redirect } from "@solidjs/router";
import { decode } from "decode-formdata";
import type { RequestEvent } from "solid-js/web";
import * as v from "valibot";

import {
  getRequestEventOrThrow,
  rpcErrorResult,
  rpcParseIssueResult,
  rpcSuccessResult,
} from "../common/server/helpers";
import { paths } from "../common/utils/paths";
import { getRequestSupabase } from "../supabase/middleware";
import { USER_QUERY_KEY } from "./const";

const getRedirectUrl = (event: RequestEvent, path: string) => {
  const origin = new URL(event.request.url).origin;
  return origin + path;
};

export const signUpServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({
      email: v.pipe(v.string(), v.email()),
      password: v.pipe(v.string(), v.minLength(6), v.maxLength(20)),
    }),
    decode(form),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const event = getRequestEventOrThrow();
  const supabase = getRequestSupabase();

  const result = await supabase.auth.signUp({
    ...parsed.output,
    options: {
      emailRedirectTo: getRedirectUrl(event, paths.signUpSuccess),
    },
  });

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return rpcSuccessResult(result.data);
});

export const signInServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({
      email: v.pipe(v.string(), v.email()),
      password: v.pipe(v.string(), v.minLength(3)),
    }),
    decode(form),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const result = await supabase.auth.signInWithPassword(parsed.output);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw redirect(paths.home, { revalidate: USER_QUERY_KEY });
});

export const signOutServerAction = action(async () => {
  "use server";

  const supabase = getRequestSupabase();

  const result = await supabase.auth.signOut();

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw redirect(paths.signIn, { revalidate: USER_QUERY_KEY });
});

export const getUserServerLoader = query(async () => {
  "use server";

  const supabase = getRequestSupabase();

  const response = await supabase.auth.getUser();
  const user = response.data.user;

  if (!user) {
    throw redirect(paths.signIn);
  }

  return user;
}, USER_QUERY_KEY);
