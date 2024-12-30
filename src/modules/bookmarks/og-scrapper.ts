"use server";

import * as cheerio from "cheerio";
import * as v from "valibot";

export type OgProp = {
  property: string;
  content: string;
};

export const getOgProps = async (text?: string) => {
  const parsed = await v.safeParseAsync(v.pipe(v.string(), v.url()), text);

  if (!parsed.success) {
    return null;
  }

  try {
    const api = await cheerio.fromURL(parsed.output);
    const metaTags = api("meta[property^='og:']").toArray();
    const props = metaTags.map((element) => element.attribs) as OgProp[];
    return { props };
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};