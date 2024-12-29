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
import { createDoneSchema } from "./utils/use-filters-search-params";

export const insertBookmark = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({
      title: v.optional(v.string()),
      text: v.optional(v.string()),
      url: v.optional(v.string()),
      preview: v.optional(v.string()),
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
      text: v.optional(v.string()),
      title: v.optional(v.string()),
      url: v.optional(v.string()),
      preview: v.optional(v.string()),
      "tags[]": v.optional(v.array(v.number()), []),
    }),
    decode(form, {
      numbers: ["bookmarkId", "tags[]"],
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

export const completeBookmark = async (form: FormData) => {
  const event = getRequestEventOrThrow();

  const parsed = await v.safeParseAsync(
    v.object({
      bookmarkId: v.number(),
      done: v.optional(v.boolean()),
      note: v.optional(v.string()),
      rate: v.optional(v.number()),
    }),
    decode(form, {
      numbers: ["bookmarkId", "rate"],
      booleans: ["done"],
    }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const { bookmarkId, ...values } = parsed.output;

  const result = await event.locals.supabase
    .from("bookmarks")
    .update({ ...values, done_at: new Date().toISOString() })
    .eq("id", bookmarkId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: BOOKMARKS_QUERY_KEY });
};

const createSelectBookmarksSchema = () => {
  return v.object({
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
    tags: v.array(v.number()),
    done: createDoneSchema(),
    random: v.boolean(),
  });
};

export type SelectBookmarksArgs = v.InferOutput<
  ReturnType<typeof createSelectBookmarksSchema>
>;

const selectBookmarksFromDb = async ({
  offset = 0,
  limit = SELECT_BOOKMARKS_DEFAULT_LIMIT,
  done,
  tags,
}: SelectBookmarksArgs) => {
  const event = getRequestEventOrThrow();

  let builder = (
    tags.length > 0
      ? event.locals.supabase
          .from("bookmarks")
          .select("*, bookmarks_tags!inner ( id, tags!inner ( id, name ) )", {
            count: "estimated",
          })
          .in("bookmarks_tags.tag_id", tags)
      : event.locals.supabase
          .from("bookmarks")
          .select("*, bookmarks_tags ( id, tags ( id, name ) )", {
            count: "estimated",
          })
  )
    .range(offset, offset + limit)
    .order("created_at", { ascending: false });

  if (done === "completed") {
    builder = builder.eq("done", true);
  } else if (done === "uncompleted") {
    builder = builder.eq("done", false);
  }

  const result = await builder;
  return result;
};

export type BookmarkWithTagsModel = NonNullable<
  Awaited<ReturnType<typeof selectBookmarksFromDb>>["data"]
>[0];

export const selectBookmarks = async (args: SelectBookmarksArgs) => {
  const parsed = await v.safeParseAsync(createSelectBookmarksSchema(), args);

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const result = await selectBookmarksFromDb(parsed.output);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return rpcSuccessResult({ data: result.data, count: result.count });
};
