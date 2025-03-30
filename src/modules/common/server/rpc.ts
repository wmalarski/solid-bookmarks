import type { CustomResponse } from "@solidjs/router";
import * as v from "valibot";
import type { RpcFailure, RpcResult, RpcSuccess } from "./helpers";

const rpcParseIssueResult = (issues: v.BaseIssue<unknown>[]): RpcFailure => {
  return {
    errors: Object.fromEntries(
      issues.map((issue) => [
        issue.path?.map((item) => item.key).join(".") || "global",
        issue.message,
      ]),
    ),
    success: false,
  };
};

type HandleRpcArgs<
  TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
  THandler extends (
    args: v.InferOutput<TSchema>,
  ) => Promise<RpcResult | CustomResponse<RpcSuccess>>,
> = {
  schema: TSchema;
  data: Record<string, unknown>;
  handler: THandler;
};

export const handleRpc = async <
  TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
  THandler extends (
    args: v.InferOutput<TSchema>,
  ) => Promise<RpcResult | CustomResponse<RpcSuccess>>,
>({
  data,
  handler,
  schema,
}: HandleRpcArgs<TSchema, THandler>): Promise<
  Awaited<ReturnType<THandler>>
> => {
  type Result = Awaited<ReturnType<THandler>>;
  const parsed = await v.safeParseAsync(schema, data);

  if (!parsed.success) {
    return rpcParseIssueResult(parsed.issues) as Result;
  }

  const result = await handler(parsed.output);
  return result as Result;
};
