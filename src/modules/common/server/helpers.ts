import { redirect } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import type { setCookie } from "vinxi/http";
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const rpcSuccessResult = <T = any>(data: T): RpcSuccess<T> => {
  return { data, success: true };
};

export const rpcErrorResult = <T extends { message: string }>(
  error: T,
): RpcFailure => {
  return { error: error.message, success: false };
};
