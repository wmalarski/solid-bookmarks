"use server";

import { redirect, reload } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";
import { rpcErrorResult, rpcSuccessResult } from "../common/server/helpers";
import { handleRpc } from "../common/server/rpc";
import { paths } from "../common/utils/paths";
import { getRequestSupabase } from "../supabase/middleware";
import { BOOKMARKS_QUERY_KEY, SELECT_BOOKMARKS_DEFAULT_LIMIT } from "./const";
import { createDoneSchema } from "./utils/use-filters-search-params";

export const insertBookmark = async (form: FormData) => {
  return handleRpc({
    data: decode(form, { arrays: ["tags[]"], numbers: ["tags[]"] }),
    async handler(args) {
      const supabase = getRequestSupabase();

      const { "tags[]": tags, ...values } = args;

      const result = await supabase
        .from("bookmarks")
        .insert(values)
        .select()
        .single();

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      const tagsResult = await supabase.from("bookmarks_tags").insert(
        tags.map((tagId) => ({
          bookmark_id: result.data.id,
          tag_id: tagId,
        })),
      );

      if (tagsResult.error) {
        return rpcErrorResult(tagsResult.error);
      }

      throw redirect(paths.home, { revalidate: BOOKMARKS_QUERY_KEY });
    },
    schema: v.object({
      preview: v.optional(v.string()),
      "tags[]": v.optional(v.array(v.number()), []),
      text: v.optional(v.string()),
      title: v.optional(v.string()),
      url: v.optional(v.string()),
    }),
  });
};

export const deleteBookmark = (form: FormData) => {
  return handleRpc({
    data: decode(form, { numbers: ["bookmarkId"] }),
    async handler(args) {
      const supabase = getRequestSupabase();

      const result = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", args.bookmarkId);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      throw reload({ revalidate: BOOKMARKS_QUERY_KEY });
    },
    schema: v.object({ bookmarkId: v.number() }),
  });
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
  const supabase = getRequestSupabase();

  const existingTagsSet = new Set(existingTags.map((tag) => tag.tag_id));
  const formTagsSet = new Set(formTags);

  const toAdd = formTags.filter((tag) => !existingTagsSet.has(tag));
  const toRemove = existingTags
    .filter((tag) => !formTagsSet.has(tag.tag_id))
    .map((tag) => tag.id);

  return Promise.all([
    supabase.from("bookmarks_tags").delete().in("id", toRemove),
    supabase.from("bookmarks_tags").insert(
      toAdd.map((tagId) => ({
        bookmark_id: bookmarkId,
        tag_id: tagId,
      })),
    ),
  ]);
};

export const updateBookmark = (form: FormData) => {
  return handleRpc({
    data: decode(form, {
      arrays: ["tags[]"],
      numbers: ["bookmarkId", "tags[]"],
    }),
    async handler(args) {
      const supabase = getRequestSupabase();

      const { bookmarkId, "tags[]": tags, ...values } = args;

      const result = await supabase
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
    },
    schema: v.object({
      bookmarkId: v.number(),
      preview: v.optional(v.string()),
      "tags[]": v.optional(v.array(v.number()), []),
      text: v.optional(v.string()),
      title: v.optional(v.string()),
      url: v.optional(v.string()),
    }),
  });
};

export const completeBookmark = (form: FormData) => {
  return handleRpc({
    data: decode(form, {
      booleans: ["done"],
      numbers: ["bookmarkId", "rate"],
    }),
    async handler(args) {
      const supabase = getRequestSupabase();

      const { bookmarkId, ...values } = args;

      const result = await supabase
        .from("bookmarks")
        .update({ ...values, done_at: new Date().toISOString() })
        .eq("id", bookmarkId);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      throw reload({ revalidate: BOOKMARKS_QUERY_KEY });
    },
    schema: v.object({
      bookmarkId: v.number(),
      done: v.optional(v.boolean()),
      note: v.optional(v.string()),
      rate: v.optional(v.number()),
    }),
  });
};

const createSelectBookmarksSchema = () => {
  return v.object({
    done: createDoneSchema(),
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
    query: v.optional(v.string()),
    random: v.boolean(),
    tags: v.array(v.number()),
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
  random,
  query,
}: SelectBookmarksArgs) => {
  const supabase = getRequestSupabase();

  let builder = (
    tags.length > 0
      ? supabase
          .from("bookmarks")
          .select("*, bookmarks_tags!inner ( id, tags!inner ( id, name ) )", {
            count: "estimated",
          })
          .in("bookmarks_tags.tag_id", tags)
      : supabase
          .from("bookmarks")
          .select("*, bookmarks_tags ( id, tags ( id, name ) )", {
            count: "estimated",
          })
  ).range(offset, offset + limit);

  if (random) {
    builder = builder.gte("random", Math.random()).order("random");
  } else {
    builder = builder.order("created_at", { ascending: false });
  }

  if (done === "completed") {
    builder = builder.eq("done", true);
  } else if (done === "uncompleted") {
    builder = builder.eq("done", false);
  }

  if (query && query.length > 0) {
    builder = builder.textSearch("title", query, { type: "phrase" });
  }

  const result = await builder;
  return result;
};

export type BookmarkWithTagsModel = NonNullable<
  Awaited<ReturnType<typeof selectBookmarksFromDb>>["data"]
>[0];

export const selectBookmarks = (args: SelectBookmarksArgs) => {
  return handleRpc({
    data: args,
    async handler(args) {
      const result = await selectBookmarksFromDb(args);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return rpcSuccessResult({ count: result.count, data: result.data });
    },
    schema: createSelectBookmarksSchema(),
  });
};

const createSelectBookmarkSchema = () => {
  return v.object({
    bookmarkId: v.number(),
  });
};

export type SelectBookmarkArgs = v.InferOutput<
  ReturnType<typeof createSelectBookmarkSchema>
>;

export const selectBookmark = (args: SelectBookmarkArgs) => {
  return handleRpc({
    data: args,
    async handler(args) {
      const supabase = getRequestSupabase();

      const result = await supabase
        .from("bookmarks")
        .select("*, bookmarks_tags ( id, tags ( id, name ) )")
        .eq("id", args.bookmarkId)
        .single();

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return rpcSuccessResult({ data: result.data });
    },
    schema: createSelectBookmarkSchema(),
  });
};

const createSelectBookmarksByIdsSchema = () => {
  return v.object({
    bookmarkIds: v.array(v.number()),
  });
};

export type SelectBookmarksByIdsArgs = v.InferOutput<
  ReturnType<typeof createSelectBookmarksByIdsSchema>
>;

export const selectBookmarksByIds = (args: SelectBookmarksByIdsArgs) => {
  return handleRpc({
    data: args,
    async handler(args) {
      const supabase = getRequestSupabase();

      const result = await supabase
        .from("bookmarks")
        .select("*, bookmarks_tags ( id, tags ( id, name ) )")
        .in("id", args.bookmarkIds);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return rpcSuccessResult({ data: result.data });
    },
    schema: createSelectBookmarksByIdsSchema(),
  });
};
