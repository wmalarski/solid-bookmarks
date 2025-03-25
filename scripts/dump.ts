import fs from "node:fs/promises";

export const loadDumpData = async () => {
  const file = await fs.readFile("scripts/dump.sql", { encoding: "utf8" });
  const lines = file.split("\n");

  const startRegex = /^COPY public\."([a-zA-Z]+)"/g;
  const endRegex = /^\\\.$/g;

  const detectedChanges = lines
    .map((line, index) => ({
      end: line.match(endRegex),
      index,
      start: line.match(startRegex),
    }))
    .filter((changes) => changes.start || changes.end);

  const ranges = Array.from({ length: detectedChanges.length / 2 }).map(
    (_, index) => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const start = detectedChanges[index * 2]!;
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const end = detectedChanges[index * 2 + 1]!;
      const table = start.start?.[0].match(/"(.+)"$/g)?.[0].replaceAll('"', "");
      return { end: end.index, table, start: start.index };
    },
  );

  const tables = new Map<string, string[][]>();

  for (const range of ranges) {
    if (range.table) {
      const rows = lines.slice(range.start + 1, range.end);
      tables.set(
        range.table,
        rows.map((row) => row.split("\t")),
      );
    }
  }

  const artists = tables.get("Artist")?.map((entry) => {
    const [id, createdAt, name, sid] = entry;

    return {
      _creationTime: new Date(createdAt).getTime(),
      id,
      name,
      sid: sid === "\\N" ? null : (sid ?? null),
    };
  });

  const albums = tables.get("Album")?.map((entry) => {
    const [
      id,
      artistId,
      createdAt,
      sid,
      title,
      _userId,
      year,
      release,
      covers,
    ] = entry;

    return {
      artistId,
      covers: parseCovers(covers),
      _creationTime: new Date(createdAt).getTime(),
      release: parseNull(release),
      id,
      sid: parseNull(sid),
      title,
      year: parseNumberNull(year),
    };
  });

  const userId = "kx7beywv3dz69wj71swddwa3ah754x38";
  const reviews = tables.get("Review")?.map((entry) => {
    const [_id, albumId, createdAt, rate, text] = entry;
    return {
      albumId,
      _creationTime: new Date(createdAt).getTime(),
      rate: Number(rate),
      text,
      userId,
    };
  });

  await fs.writeFile("scripts/albums.json", JSON.stringify(albums, null, 2));
  await fs.writeFile("scripts/artists.json", JSON.stringify(artists, null, 2));
  await fs.writeFile("scripts/reviews.json", JSON.stringify(reviews, null, 2));
};

const parseCovers = (covers?: string) => {
  const parsed = parseNull(covers);

  if (!parsed) {
    return null;
  }

  const json = JSON.parse(parsed);
  const { "250": s250, "500": s500, "1200": s1200, ...reduced } = json;

  const result = {
    ...reduced,
    s250: s250?.slice(0, 12),
    s500: s500?.slice(0, 12),
    s1200: s1200?.slice(0, 12),
  };

  return result;
};

const parseNull = (arg?: string) => {
  return arg === "\\N" ? null : (arg ?? null);
};

const parseNumberNull = (arg?: string) => {
  return arg === "\\N" ? null : (Number(arg) ?? null);
};

loadDumpData();
