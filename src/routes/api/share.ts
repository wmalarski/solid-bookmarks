import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { decode } from "decode-formdata";
import * as v from "valibot";
import { paths } from "~/modules/common/utils/paths";

export const POST = async ({ request }: APIEvent) => {
  const formData = await request.formData();

  const result = await v.parseAsync(
    v.object({
      title: v.optional(v.string()),
      text: v.optional(v.string()),
      url: v.optional(v.pipe(v.string(), v.url())),
    }),
    decode(formData),
  );

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("result", result);

  return redirect(paths.home);
};
