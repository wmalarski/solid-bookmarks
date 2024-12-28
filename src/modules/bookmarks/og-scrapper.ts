"use server";

import * as cheerio from "cheerio";
import * as v from "valibot";

export const getOgProps = async (text?: string) => {
  const parsed = await v.safeParseAsync(v.pipe(v.string(), v.url()), text);

  if (!parsed.success) {
    return null;
  }

  try {
    const api = await cheerio.fromURL(parsed.output);
    const metaTags = api("meta[property^='og:']").toArray();
    const props = metaTags.map((element) => element.attribs);
    return { props };
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};
