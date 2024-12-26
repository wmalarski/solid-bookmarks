"use server";

import { json, reload } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";
import {
  getRequestEventOrThrow,
  rpcErrorResult,
  rpcParseIssueResult,
  rpcSuccessResult,
} from "../common/server/helpers";
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

  return json(rpcSuccessResult({}), { revalidate: TAGS_QUERY_KEY });

  // throw reload({ revalidate: TAGS_QUERY_KEY });
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

  const { tagId, ...update } = parsed.output;

  const result = await event.locals.supabase
    .from("tags")
    .update(update)
    .eq("id", tagId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: TAGS_QUERY_KEY });
};

type SelectTagsArgs = {
  limit?: number;
  offset?: number;
};

const selectTagsFromDb = async ({
  limit = SELECT_TAGS_DEFAULT_LIMIT,
  offset = 0,
}: SelectTagsArgs) => {
  const event = getRequestEventOrThrow();

  const builder = event.locals.supabase
    .from("tags")
    .select("*", { count: "estimated" })
    .range(offset, offset + limit)
    .order("created_at");

  const result = await builder;
  return result;
};

export type TagModel = NonNullable<
  Awaited<ReturnType<typeof selectTagsFromDb>>["data"]
>[0];

export const selectTags = async (args: SelectTagsArgs) => {
  const parsed = await v.safeParseAsync(
    v.object({ limit: v.optional(v.number()), offset: v.optional(v.number()) }),
    args,
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await selectTagsFromDb(parsed.output);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return rpcSuccessResult({ data: result.data, count: result.count });
};
