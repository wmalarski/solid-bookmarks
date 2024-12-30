import { type Accessor, createMemo } from "solid-js";
import * as v from "valibot";

export const createIsLink = (text: Accessor<string | undefined>) => {
  return createMemo(() => {
    return v.safeParse(v.pipe(v.string(), v.url()), text()).success;
  });
};
