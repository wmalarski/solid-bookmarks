import { action, query, redirect, reload } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";
import {
  rpcErrorResult,
  rpcParseIssueResult,
  rpcSuccessResult,
} from "../common/server/helpers";
import type { SupabaseTypedClient } from "../supabase/client";
import { getRequestSupabase } from "../supabase/middleware";
import { createDoneSchema } from "./utils/use-filters-search-params";

export const insertBookmarkServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({
      preview: v.optional(v.string()),
      "tags[]": v.optional(v.array(v.number()), []),
      text: v.optional(v.string()),
      title: v.optional(v.string()),
      url: v.optional(v.string()),
    }),
    decode(form, { arrays: ["tags[]"], numbers: ["tags[]"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const { "tags[]": tags, ...values } = parsed.output;

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

  throw redirect("/", { revalidate: selectBookmarksServerQuery.key });
});

export const deleteBookmarkServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({ bookmarkId: v.number() }),
    decode(form, { numbers: ["bookmarkId"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const result = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", parsed.output.bookmarkId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: selectBookmarksServerQuery.key });
});

type UpdateBookmarkTagsArgs = {
  bookmarkId: number;
  existingTags: { tag_id: number; id: number }[];
  formTags: number[];
  supabase: SupabaseTypedClient;
};

const updateBookmarkTags = ({
  bookmarkId,
  existingTags,
  formTags,
  supabase,
}: UpdateBookmarkTagsArgs) => {
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

export const updateBookmarkServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({
      bookmarkId: v.number(),
      preview: v.optional(v.string()),
      "tags[]": v.optional(v.array(v.number()), []),
      text: v.optional(v.string()),
      title: v.optional(v.string()),
      url: v.optional(v.string()),
    }),
    decode(form, {
      arrays: ["tags[]"],
      numbers: ["bookmarkId", "tags[]"],
    }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const { bookmarkId, "tags[]": tags, ...values } = parsed.output;

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
    supabase,
  });

  if (deleteResult.error) {
    return rpcErrorResult(deleteResult.error);
  }

  if (insertResult.error) {
    return rpcErrorResult(insertResult.error);
  }

  throw reload({ revalidate: selectBookmarksServerQuery.key });
});

export const completeBookmarkServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({
      bookmarkId: v.number(),
      done: v.optional(v.boolean()),
      note: v.optional(v.string()),
      rate: v.optional(v.number()),
    }),
    decode(form, {
      booleans: ["done"],
      numbers: ["bookmarkId", "rate"],
    }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const { bookmarkId, ...values } = parsed.output;

  const result = await supabase
    .from("bookmarks")
    .update({ ...values, done_at: new Date().toISOString() })
    .eq("id", bookmarkId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  throw reload({ revalidate: selectBookmarksServerQuery.key });
});

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

export const SELECT_BOOKMARKS_DEFAULT_LIMIT = 5;

type SelectBookmarksFromDbArgs = SelectBookmarksArgs & {
  supabase: SupabaseTypedClient;
};

const selectBookmarksFromDb = async ({
  offset = 0,
  limit = SELECT_BOOKMARKS_DEFAULT_LIMIT,
  done,
  tags,
  random,
  query,
  supabase,
}: SelectBookmarksFromDbArgs) => {
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

export const selectBookmarksServerQuery = query(
  async (args: SelectBookmarksArgs) => {
    "use server";

    const parsed = await v.safeParseAsync(createSelectBookmarksSchema(), args);

    if (!parsed.success) {
      return rpcParseIssueResult(parsed.issues);
    }

    const supabase = getRequestSupabase();

    const result = await selectBookmarksFromDb({ ...parsed.output, supabase });

    if (result.error) {
      return rpcErrorResult(result.error);
    }

    return rpcSuccessResult({ count: result.count, data: result.data });
  },
  "bookmarks",
);

const createSelectBookmarkSchema = () => {
  return v.object({
    bookmarkId: v.number(),
  });
};

export type SelectBookmarkArgs = v.InferOutput<
  ReturnType<typeof createSelectBookmarkSchema>
>;

export const selectBookmarkServerQuery = query(
  async (args: SelectBookmarkArgs) => {
    "use server";

    const parsed = await v.safeParseAsync(createSelectBookmarkSchema(), args);

    if (!parsed.success) {
      return rpcParseIssueResult(parsed.issues);
    }

    const supabase = getRequestSupabase();

    const result = await supabase
      .from("bookmarks")
      .select("*, bookmarks_tags ( id, tags ( id, name ) )")
      .eq("id", parsed.output.bookmarkId)
      .single();

    if (result.error) {
      return rpcErrorResult(result.error);
    }

    return rpcSuccessResult({ data: result.data });
  },
  "bookmark",
);

const createSelectBookmarksByIdsSchema = () => {
  return v.object({
    bookmarkIds: v.array(v.number()),
  });
};

export type SelectBookmarksByIdsArgs = v.InferOutput<
  ReturnType<typeof createSelectBookmarksByIdsSchema>
>;

export const selectBookmarksByIdsServerQuery = query(
  async (args: SelectBookmarksByIdsArgs) => {
    "use server";

    const parsed = await v.safeParseAsync(
      createSelectBookmarksByIdsSchema(),
      args,
    );

    if (!parsed.success) {
      return rpcParseIssueResult(parsed.issues);
    }

    const supabase = getRequestSupabase();

    const result = await supabase
      .from("bookmarks")
      .select("*, bookmarks_tags ( id, tags ( id, name ) )")
      .in("id", parsed.output.bookmarkIds);

    if (result.error) {
      return rpcErrorResult(result.error);
    }

    return rpcSuccessResult({ data: result.data });
  },
  "bookmarks-by-ids",
);
