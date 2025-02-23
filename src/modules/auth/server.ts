"use server";
import type { RequestEvent } from "solid-js/web";

import { redirect } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";

import {
  getRequestEventOrThrow,
  rpcErrorResult,
  rpcParseIssueResult,
  rpcSuccessResult,
} from "../common/server/helpers";
import { paths } from "../common/utils/paths";
import { USER_QUERY_KEY } from "./const";

const getRedirectUrl = (event: RequestEvent, path: string) => {
  const origin = new URL(event.request.url).origin;
  return origin + path;
};

export const signUpServerAction = async (form: FormData) => {
  const event = getRequestEventOrThrow();

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

  const result = await event.locals.supabase.auth.signUp({
    ...parsed.output,
    options: { emailRedirectTo: getRedirectUrl(event, paths.signUpSuccess) },
  });

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return rpcSuccessResult(result.data);
};

export const signInServerAction = async (form: FormData) => {
  const event = getRequestEventOrThrow();

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

  const result = await event.locals.supabase.auth.signInWithPassword(
    parsed.output,
  );

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw redirect(paths.home, {
    revalidate: USER_QUERY_KEY,
  });
};

export const signOutServerAction = async () => {
  const event = getRequestEventOrThrow();

  const result = await event.locals.supabase.auth.signOut();

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw redirect(paths.signIn, {
    revalidate: USER_QUERY_KEY,
  });
};

export const getUserServerLoader = async () => {
  const event = getRequestEventOrThrow();
  const response = await event.locals.supabase.auth.getUser();
  const user = response.data.user;

  if (!user) {
    throw redirect(paths.signIn);
  }

  return user;
};
