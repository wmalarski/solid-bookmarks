import fs from "node:fs/promises";

const parseDumpData = async () => {
  const header = ["bookmark_id", "tag_id", "user_id"].join(",");

  const all = 6192;
  const start = 7;

  const mapped = Array.from({ length: all - start + 1 }).map((_, index) => {
    return [index + start, 10, "a83bdb3c-3faa-4090-9c24-fe1f077574b6"].join(
      ",",
    );
  });

  const lines = [header, ...mapped].join("\n");

  await fs.writeFile("scripts/tags.csv", lines);
};

parseDumpData();
