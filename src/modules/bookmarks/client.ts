import { action, query } from "@solidjs/router";

import { BOOKMARKS_QUERY_KEY } from "./const";
import {
  completeBookmark,
  deleteBookmark,
  insertBookmark,
  selectBookmarks,
  updateBookmark,
} from "./server";

export const selectBookmarksQuery = query(selectBookmarks, BOOKMARKS_QUERY_KEY);

export const deleteBookmarkAction = action(deleteBookmark);

export const insertBookmarkAction = action(insertBookmark);

export const updateBookmarkAction = action(updateBookmark);

export const completeBookmarkAction = action(completeBookmark);
