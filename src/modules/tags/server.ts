"use server";

import { json } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";
import {
  getRequestEventOrThrow,
  handleRpc,
  rpcErrorResult,
  rpcSuccessResult,
} from "../common/server/helpers";
import { SELECT_TAGS_DEFAULT_LIMIT, TAGS_QUERY_KEY } from "./const";

export const insertTag = (form: FormData) => {
  return handleRpc({
    data: decode(form),
    schema: v.object({ name: v.string() }),
    async handler(args) {
      const event = getRequestEventOrThrow();

      const result = await event.locals.supabase.from("tags").insert(args);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return json(rpcSuccessResult({}), { revalidate: TAGS_QUERY_KEY });
    },
  });
};

export const deleteTag = (form: FormData) => {
  return handleRpc({
    data: decode(form, { numbers: ["tagId"] }),
    schema: v.object({ tagId: v.number() }),
    async handler(args) {
      const event = getRequestEventOrThrow();

      const result = await event.locals.supabase
        .from("tags")
        .delete()
        .eq("id", args.tagId);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return json(rpcSuccessResult({}), { revalidate: TAGS_QUERY_KEY });
    },
  });
};

export const updateTag = (form: FormData) => {
  return handleRpc({
    data: decode(form, { numbers: ["tagId"] }),
    schema: v.object({ tagId: v.number(), name: v.string() }),
    async handler(args) {
      const event = getRequestEventOrThrow();

      const { tagId, ...values } = args;

      const result = await event.locals.supabase
        .from("tags")
        .update(values)
        .eq("id", tagId);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return json(rpcSuccessResult({}), { revalidate: TAGS_QUERY_KEY });
    },
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

export const selectTags = (args: SelectTagsArgs) => {
  return handleRpc({
    data: args,
    schema: v.object({
      limit: v.optional(v.number()),
      offset: v.optional(v.number()),
    }),
    async handler(args) {
      const result = await selectTagsFromDb(args);

      if (result.error) {
        return rpcErrorResult(result.error);
      }

      return rpcSuccessResult({ data: result.data, count: result.count });
    },
  });
};
