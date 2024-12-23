import type { Database } from "./types";

export type BookmarkModel = Database["public"]["Tables"]["bookmarks"]["Row"];

export type TagModel = Database["public"]["Tables"]["tags"]["Row"];

export type BookmarkTagModel =
  Database["public"]["Tables"]["bookmarks_tags"]["Row"];
