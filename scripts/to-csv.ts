// biome-ignore lint/correctness/noNodejsModules: <explanation>
import fs from "node:fs/promises";

const readResultImportFile = async () => {
  const resultJsonPath = "scripts/result.json";
  const resultJsonFile = await fs.readFile(resultJsonPath, {
    encoding: "utf8",
  });
  return JSON.parse(resultJsonFile);
};

const parseDumpData = async () => {
  const results = await readResultImportFile();

  const header = [
    "user_id",
    "url",
    "text",
    "title",
    "done",
    "rate",
    "done_at",
    "preview",
  ].join(",");

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const mapped = results.map((result: any) => {
    const values = [
      result.user_id,
      result.url,
      result.text && `"${result.text}"`,
      `"${result.title.replaceAll('"', "'")}"`,
      result.done,
      result.rate,
      result.done_at,
      result.preview,
    ];

    return values.join(",");
  });

  const lines = [header, ...mapped].join("\n");

  await fs.writeFile("scripts/result.csv", lines);
};

parseDumpData();
