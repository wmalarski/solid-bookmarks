import { type Accessor, type JSX, Show } from "solid-js";
import type { RpcResult } from "../server/helpers";

type RpcShowProps<T> = {
  result?: RpcResult<T>;
  fallback?: JSX.Element;
  children: (data: Accessor<T>) => JSX.Element;
};

export function RpcShow<T>(props: RpcShowProps<T>) {
  return (
    <Show
      when={props.result?.success ? props.result.data : undefined}
      fallback={props.fallback}
      // biome-ignore lint/correctness/noChildrenProp: <explanation>
      children={props.children}
    />
  );
}
