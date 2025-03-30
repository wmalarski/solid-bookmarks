import { action, json, query } from "@solidjs/router";
import { decode } from "decode-formdata";
import * as v from "valibot";
import {
  rpcErrorResult,
  rpcParseIssueResult,
  rpcSuccessResult,
} from "../common/server/helpers";
import type { SupabaseTypedClient } from "../supabase/client";
import { getRequestSupabase } from "../supabase/middleware";

const SELECT_TAGS_DEFAULT_LIMIT = 50;

export const insertTagServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({ name: v.string() }),
    decode(form),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const result = await supabase.from("tags").insert(parsed.output);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return json(rpcSuccessResult({}), { revalidate: selectTagsServerQuery.key });
});

export const deleteTagServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({ tagId: v.number() }),
    decode(form, { numbers: ["tagId"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const result = await supabase
    .from("tags")
    .delete()
    .eq("id", parsed.output.tagId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return json(rpcSuccessResult({}), { revalidate: selectTagsServerQuery.key });
});

export const updateTagServerAction = action(async (form: FormData) => {
  "use server";

  const parsed = await v.safeParseAsync(
    v.object({ name: v.string(), tagId: v.number() }),
    decode(form, { numbers: ["tagId"] }),
  );

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const { tagId, ...values } = parsed.output;

  const result = await supabase.from("tags").update(values).eq("id", tagId);

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return json(rpcSuccessResult({}), { revalidate: selectTagsServerQuery.key });
});

const createSelectTagsSchema = () => {
  return v.object({
    limit: v.optional(v.number()),
    offset: v.optional(v.number()),
  });
};

export type SelectTagsArgs = v.InferOutput<
  ReturnType<typeof createSelectTagsSchema>
>;

type SelectTagsFromDbArgs = SelectTagsArgs & {
  supabase: SupabaseTypedClient;
};

const selectTagsFromDb = async ({
  limit = SELECT_TAGS_DEFAULT_LIMIT,
  offset = 0,
  supabase,
}: SelectTagsFromDbArgs) => {
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

export const selectTagsServerQuery = query(async (args: SelectTagsArgs) => {
  "use server";

  const parsed = await v.safeParseAsync(createSelectTagsSchema(), args);

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues);
  }

  const supabase = getRequestSupabase();

  const result = await selectTagsFromDb({ ...parsed.output, supabase });

  if (result.error) {
    return rpcErrorResult(result.error);
  }

  return rpcSuccessResult({ count: result.count, data: result.data });
}, "tags");
