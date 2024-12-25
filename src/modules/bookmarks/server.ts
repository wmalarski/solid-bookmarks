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
import { BOOKMARKS_QUERY_KEY, SELECT_BOOKMARKS_DEFAULT_LIMIT } from "./const";

export const insertBookmark = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({
      title: v.optional(v.string()),
      text: v.optional(v.string()),
      url: v.optional(v.pipe(v.string(), v.url())),
    }),
    decode(form),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await event.locals.supabase
    .from("bookmarks")
    .insert(parsed.output);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw redirect(paths.home, { revalidate: BOOKMARKS_QUERY_KEY });
};

export const insertBookmarkTag = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({ bookmarkId: v.number(), tagId: v.number() }),
    decode(form, { numbers: ["bookmarkId", "tagId"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await event.locals.supabase.from("bookmarks_tags").insert({
    bookmark_id: parsed.output.bookmarkId,
    tag_id: parsed.output.tagId,
  });

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw redirect(paths.home, { revalidate: BOOKMARKS_QUERY_KEY });
};

export const deleteBookmark = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({ bookmarkId: v.number() }),
    decode(form, { numbers: ["bookmarkId"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await event.locals.supabase
    .from("bookmarks")
    .delete()
    .eq("id", parsed.output.bookmarkId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: BOOKMARKS_QUERY_KEY });
};

export const deleteBookmarkTag = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({ bookmarkTagId: v.number() }),
    decode(form, { numbers: ["bookmarkTagId"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await event.locals.supabase
    .from("bookmarks_tags")
    .delete()
    .eq("id", parsed.output.bookmarkTagId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: BOOKMARKS_QUERY_KEY });
};

export const updateBookmark = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({
      bookmarkId: v.number(),
      done: v.optional(v.boolean()),
      note: v.optional(v.string()),
      rate: v.optional(v.number()),
      text: v.optional(v.string()),
      title: v.optional(v.string()),
      url: v.optional(v.string()),
    }),
    decode(form, { numbers: ["bookmarkId", "rate"], booleans: ["done"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await event.locals.supabase
    .from("bookmarks")
    .update(parsed.output)
    .eq("id", parsed.output.bookmarkId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: BOOKMARKS_QUERY_KEY });
};

type SelectBookmarksArgs = {
  limit?: number;
  offset?: number;
};

const selectBookmarksFromDb = async ({
  offset = 0,
  limit = SELECT_BOOKMARKS_DEFAULT_LIMIT,
}: SelectBookmarksArgs) => {
  const event = getRequestEventOrThrow();

  const builder = event.locals.supabase
    .from("bookmarks")
    .select("*, bookmarks_tags ( * )", {
      count: "estimated",
    })
    .range(offset, offset + limit);

  const result = await builder;
  return result;
};

export type BookmarkWithTagsModel = NonNullable<
  Awaited<ReturnType<typeof selectBookmarksFromDb>>["data"]
>[0];

export const selectBookmarks = async (args: SelectBookmarksArgs) => {
  const parsed = await v.safeParseAsync(
    v.object({ limit: v.optional(v.number()), offset: v.optional(v.number()) }),
    args,
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await selectBookmarksFromDb(parsed.output);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return rpcSuccessResult({ data: result.data, count: result.count });
};
