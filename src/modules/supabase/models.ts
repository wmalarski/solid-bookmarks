import type { Database } from "./types";

export type TagModel = Database["public"]["Tables"]["tags"]["Row"];

export type BookmarkTagModel =
  Database["public"]["Tables"]["bookmarks_tags"]["Row"];
