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
      url: v.optional(v.string()),
      "tags[]": v.optional(v.array(v.number()), []),
    }),
    decode(form, { arrays: ["tags[]"], numbers: ["tags[]"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const { "tags[]": tags, ...values } = parsed.output;

  const result = await event.locals.supabase
    .from("bookmarks")
    .insert(values)
    .select()
    .single();

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  const tagsResult = await event.locals.supabase.from("bookmarks_tags").insert(
    tags.map((tagId) => ({
      bookmark_id: result.data.id,
      tag_id: tagId,
    })),
  );

  if (tagsResult.error) {
    return rpcErrorResult(tagsResult.error);
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

type UpdateBookmarkTagsArgs = {
  bookmarkId: number;
  existingTags: { tag_id: number; id: number }[];
  formTags: number[];
};

const updateBookmarkTags = ({
  bookmarkId,
  existingTags,
  formTags,
}: UpdateBookmarkTagsArgs) => {
  const event = getRequestEventOrThrow();

  const existingTagsSet = new Set(existingTags.map((tag) => tag.tag_id));
  const formTagsSet = new Set(formTags);

  const toAdd = formTags.filter((tag) => !existingTagsSet.has(tag));
  const toRemove = existingTags
    .filter((tag) => !formTagsSet.has(tag.tag_id))
    .map((tag) => tag.id);

  return Promise.all([
    event.locals.supabase.from("bookmarks_tags").delete().in("id", toRemove),
    event.locals.supabase.from("bookmarks_tags").insert(
      toAdd.map((tagId) => ({
        bookmark_id: bookmarkId,
        tag_id: tagId,
      })),
    ),
  ]);
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
      "tags[]": v.optional(v.array(v.number()), []),
    }),
    decode(form, {
      numbers: ["bookmarkId", "rate", "tags[]"],
      booleans: ["done"],
      arrays: ["tags[]"],
    }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const { bookmarkId, "tags[]": tags, ...values } = parsed.output;

  const result = await event.locals.supabase
    .from("bookmarks")
    .update(values)
    .eq("id", bookmarkId)
    .select("*, bookmarks_tags ( id, tag_id )")
    .single();

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  const [deleteResult, insertResult] = await updateBookmarkTags({
    bookmarkId,
    existingTags: result.data.bookmarks_tags,
    formTags: tags,
  });

  if (deleteResult.error) {
    return rpcErrorResult(deleteResult.error);
  }

  if (insertResult.error) {
    return rpcErrorResult(insertResult.error);
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
    .select("*, bookmarks_tags ( id, tags ( id, name ) )", {
      count: "estimated",
    })
    .range(offset, offset + limit)
    .order("created_at", { ascending: false });

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
