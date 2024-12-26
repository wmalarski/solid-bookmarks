import { useSearchParams } from "@solidjs/router";
import { decode } from "decode-formdata";
import { createMemo } from "solid-js";
import * as v from "valibot";

const createDoneSchema = () => {
  return v.optional(
    v.union([
      v.literal("all"),
      v.literal("completed"),
      v.literal("uncompleted"),
    ]),
    "all",
  );
};

const createRandomSchema = () => {
  return v.optional(
    v.pipe(v.union([v.literal("on"), v.literal("off")])),
    "off",
  );
};

const createFiltersFormSchema = () => {
  return v.object({
    done: createDoneSchema(),
    random: createRandomSchema(),
    "tags[]": v.optional(v.array(v.number()), []),
  });
};

export const createFiltersSearchParamsSchema = () => {
  return v.object({
    done: createDoneSchema(),
    random: createRandomSchema(),
    "tags[]": v.optional(
      v.union([
        v.array(v.pipe(v.string(), v.transform(Number))),
        v.pipe(
          v.string(),
          v.transform(Number),
          v.transform((value) => [value]),
        ),
      ]),
      [],
    ),
  });
};

export type FiltersSearchParams = v.InferOutput<
  ReturnType<typeof createFiltersSearchParamsSchema>
>;

export const useFiltersSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filtersParams = createMemo((): FiltersSearchParams => {
    const schema = createFiltersSearchParamsSchema();
    return v.parse(schema, searchParams);
  });

  const setFiltersParams = (formData: FormData) => {
    const decoded = decode(formData, {
      arrays: ["tags[]"],
      numbers: ["tags[]"],
    });

    const parsed = v.parse(createFiltersFormSchema(), decoded);

    setSearchParams(parsed);
  };

  return { filtersParams, setFiltersParams };
};
