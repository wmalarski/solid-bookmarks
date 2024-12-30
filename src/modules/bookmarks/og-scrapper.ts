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
    console.log("test1");
    const response = await fetch(parsed.output);
    console.log("test1.25");
    const html = await response.text();
    console.log("test1.5");
    const api = cheerio.load(html);
    console.log("test2", api);
    const metaTags = api("meta[property^='og:']").toArray();
    console.log("test3", metaTags);
    const props = metaTags.map((element) => element.attribs) as OgProp[];
    console.log("test4", props);

    return { props };
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};
