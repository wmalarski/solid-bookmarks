import fs from "node:fs/promises";

const readAlbumsImportFile = async () => {
  const reviewsJsonPath = "scripts/albums.json";
  const reviewsJsonFile = await fs.readFile(reviewsJsonPath, {
    encoding: "utf8",
  });
  return JSON.parse(reviewsJsonFile);
};

const readArtistsImportFile = async () => {
  const reviewsJsonPath = "scripts/artists.json";
  const reviewsJsonFile = await fs.readFile(reviewsJsonPath, {
    encoding: "utf8",
  });
  return JSON.parse(reviewsJsonFile);
};

const getArtistsNameMap = async () => {
  const artists = await readArtistsImportFile();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return new Map(artists.map((artist: any) => [artist.id, artist.name]));
};

const readReviewsImportFile = async () => {
  const reviewsJsonPath = "scripts/reviews.json";
  const reviewsJsonFile = await fs.readFile(reviewsJsonPath, {
    encoding: "utf8",
  });
  return JSON.parse(reviewsJsonFile);
};

const getReviewsMap = async () => {
  const reviews = await readReviewsImportFile();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return new Map(reviews.map((review: any) => [review.albumId, review]));
};

const tValueRegex = /T/;
const endOfDateRegex = /\..+/;

export const parseDumpData = async () => {
  const [albums, artists, reviews] = await Promise.all([
    readAlbumsImportFile(),
    getArtistsNameMap(),
    getReviewsMap(),
  ]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const result = albums.map((album: any) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const review: any = reviews.get(album.id);
    const artistName = artists.get(album.artistId);

    return {
      done: !!review,
      done_at:
        review &&
        new Date(review._creationTime)
          .toISOString()
          .replace(tValueRegex, " ")
          .replace(endOfDateRegex, ""),
      note: review?.text,
      preview: album.covers && Object.values(album.covers).flat().join(";"),
      rate: review?.rate,
      text: "",
      title: `${artistName} - ${album.title}${album.year ? ` (${album.year})` : ""}`,
      url: album.release,
      user_id: "a83bdb3c-3faa-4090-9c24-fe1f077574b6",
    };
  });

  await fs.writeFile("scripts/result.json", JSON.stringify(result, null, 2));
};

parseDumpData();
