import { action, query } from "@solidjs/router";

import { TAGS_QUERY_KEY } from "./const";
import { deleteTag, insertTag, selectTags, updateTag } from "./server";

export const selectTagsQuery = query(selectTags, TAGS_QUERY_KEY);

export const deleteTagAction = action(deleteTag);

export const insertTagAction = action(insertTag);

export const updateTagAction = action(updateTag);
