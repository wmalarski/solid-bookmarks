import { useSearchParams } from "@solidjs/router";
import { createMemo } from "solid-js";
import * as v from "valibot";

export const createFiltersSearchParamsSchema = () => {
  return v.object({
    done: v.optional(
      v.union([
        v.literal("all"),
        v.literal("completed"),
        v.literal("uncompleted"),
      ]),
      "all",
    ),
    tags: v.optional(v.array(v.pipe(v.string(), v.transform(Number))), []),
    random: v.optional(
      v.pipe(
        v.string(),
        v.transform((value) => value === "true"),
      ),
    ),
  });
};

export type FiltersSearchParams = v.InferOutput<
  ReturnType<typeof createFiltersSearchParamsSchema>
>;

export const useFiltersSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filtersParams = createMemo(() => {
    const schema = createFiltersSearchParamsSchema();

    const parsed = v.parse(schema, searchParams);

    console.log({ searchParams, parsed });

    return parsed;
  });

  const setFiltersParams = (params: FiltersSearchParams) => {
    setSearchParams(params);
  };

  return { filtersParams, setFiltersParams };
};
