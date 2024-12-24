"use server";

import { redirect, reload } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";
import {
  getRequestEventOrThrow,
  rpcErrorResult,
  rpcParseIssueResult,
  rpcSuccessResult,
} from "../common/server/helpers";
import { paths } from "../common/utils/paths";
import { SELECT_TAGS_DEFAULT_LIMIT, TAGS_QUERY_KEY } from "./const";

export const insertTag = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({ name: v.string() }),
    decode(form),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await event.locals.supabase.from("tags").insert(parsed.output);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw redirect(paths.home, { revalidate: TAGS_QUERY_KEY });
};

export const deleteTag = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({ tagId: v.number() }),
    decode(form, { numbers: ["tagId"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await event.locals.supabase
    .from("tags")
    .delete()
    .eq("id", parsed.output.tagId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: TAGS_QUERY_KEY });
};

export const updateTag = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({ tagId: v.number(), name: v.string() }),
    decode(form, { numbers: ["tagId"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await event.locals.supabase
    .from("tags")
    .update(parsed.output)
    .eq("id", parsed.output.tagId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: TAGS_QUERY_KEY });
};

type SelectTagsArgs = {
  limit?: number;
  offset: number;
};

export const selectTags = async (args: SelectTagsArgs) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({
      limit: v.optional(v.number(), SELECT_TAGS_DEFAULT_LIMIT),
      offset: v.number(),
    }),
    args,
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const { limit, offset } = parsed.output;
  const builder = event.locals.supabase
    .from("tags")
    .select("*", { count: "estimated" })
    .range(offset, offset + limit);

  const result = await builder;

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return rpcSuccessResult({ data: result.data, count: result.count });
};
