import { action, query } from "@solidjs/router";

import {
  BOOKMARKS_BY_IDS_QUERY_KEY,
  BOOKMARKS_QUERY_KEY,
  BOOKMARK_QUERY_KEY,
  OG_PROPS_QUERY_KEY,
} from "./const";
import { getOgProps } from "./og-scrapper";
import {
  completeBookmark,
  deleteBookmark,
  insertBookmark,
  selectBookmark,
  selectBookmarks,
  selectBookmarksByIds,
  updateBookmark,
} from "./server";

export const selectBookmarksQuery = query(selectBookmarks, BOOKMARKS_QUERY_KEY);

export const selectBookmarksByIdsQuery = query(
  selectBookmarksByIds,
  BOOKMARKS_BY_IDS_QUERY_KEY,
);

export const selectBookmarkQuery = query(selectBookmark, BOOKMARK_QUERY_KEY);

export const getOgPropsQuery = query(getOgProps, OG_PROPS_QUERY_KEY);

export const deleteBookmarkAction = action(deleteBookmark);

export const insertBookmarkAction = action(insertBookmark);

export const updateBookmarkAction = action(updateBookmark);

export const completeBookmarkAction = action(completeBookmark);
