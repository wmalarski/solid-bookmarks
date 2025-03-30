"use server";

import { json } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";
import { rpcErrorResult, rpcSuccessResult } from "../common/server/helpers";
import { handleRpc } from "../common/server/rpc";
import { getRequestSupabase } from "../supabase/middleware";
import { SELECT_TAGS_DEFAULT_LIMIT, TAGS_QUERY_KEY } from "./const";

export const insertTag = (form: FormData) => {
  return handleRpc({
    data: decode(form),
    async handler(args) {
      const supabase = getRequestSupabase();

      const result = await supabase.from("tags").insert(args);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return json(rpcSuccessResult({}), { revalidate: TAGS_QUERY_KEY });
    },
    schema: v.object({ name: v.string() }),
  });
};

export const deleteTag = (form: FormData) => {
  return handleRpc({
    data: decode(form, { numbers: ["tagId"] }),
    async handler(args) {
      const supabase = getRequestSupabase();

      const result = await supabase.from("tags").delete().eq("id", args.tagId);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return json(rpcSuccessResult({}), { revalidate: TAGS_QUERY_KEY });
    },
    schema: v.object({ tagId: v.number() }),
  });
};

export const updateTag = (form: FormData) => {
  return handleRpc({
    data: decode(form, { numbers: ["tagId"] }),
    async handler(args) {
      const supabase = getRequestSupabase();

      const { tagId, ...values } = args;

      const result = await supabase.from("tags").update(values).eq("id", tagId);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return json(rpcSuccessResult({}), { revalidate: TAGS_QUERY_KEY });
    },
    schema: v.object({ name: v.string(), tagId: v.number() }),
  });
};

type SelectTagsArgs = {
  limit?: number;
  offset?: number;
};

const selectTagsFromDb = async ({
  limit = SELECT_TAGS_DEFAULT_LIMIT,
  offset = 0,
}: SelectTagsArgs) => {
  const supabase = getRequestSupabase();

  const builder = supabase
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

export const selectTags = (args: SelectTagsArgs) => {
  return handleRpc({
    data: args,
    async handler(args) {
      const result = await selectTagsFromDb(args);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return rpcSuccessResult({ count: result.count, data: result.data });
    },
    schema: v.object({
      limit: v.optional(v.number()),
      offset: v.optional(v.number()),
    }),
  });
};
