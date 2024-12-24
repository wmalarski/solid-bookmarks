import { redirect } from "@solidjs/router";
import { getRequestEvent, type RequestEvent } from "solid-js/web";
import * as v from "valibot";
import { getCookie, type setCookie } from "vinxi/http";
import { paths } from "../utils/paths";

export type CookieSerializeOptions = Parameters<typeof setCookie>[2];

export const getRequestEventOrThrow = () => {
  const event = getRequestEvent();

  if (!event) {
    throw redirect(paths.notFound, { status: 500 });
  }

  return event;
};

export type RpcFailure = {
  error?: string;
  errors?: Record<string, string>;
  success: false;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type RpcSuccess<T = any> = {
  data: T;
  success: true;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type RpcResult<T = any> = RpcFailure | RpcSuccess<T>;

export const rpcParseIssueResult = (
  issues: v.BaseIssue<unknown>[],
): RpcFailure => {
  return {
    errors: Object.fromEntries(
      issues.map((issue) => [
        issue.path?.map((item) => item.key).join(".") || "global",
        issue.message,
      ]),
    ),
    success: false,
  };
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const rpcSuccessResult = <T = any>(data: T): RpcSuccess<T> => {
  return { data, success: true };
};

export const rpcErrorResult = <T extends { message: string }>(
  error: T,
): RpcFailure => {
  return { error: error.message, success: false };
};

export const getParsedCookie = async <
  TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(
  event: RequestEvent,
  name: string,
  schema: TSchema,
) => {
  const cookie = getCookie(event.nativeEvent, name);

  if (!cookie) {
    return null;
  }

  try {
    const parsed = JSON.parse(cookie);
    const result = await v.safeParseAsync(schema, parsed);

    if (!result.success) {
      return null;
    }

    return result.output;
  } catch {
    return null;
  }
};
