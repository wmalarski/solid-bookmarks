import { For, type Component } from "solid-js";
import { Badge } from "~/ui/badge/badge";
import type { BookmarkWithTagsModel } from "../server";

type BookmarkTagsListProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkTagsList: Component<BookmarkTagsListProps> = (props) => {
  return (
    <ul class="flex flex-wrap flex-row gap-2">
      <For each={props.bookmark.bookmarks_tags}>
        {(bookmarkTag) => (
          <li>
            <Badge color="primary">{bookmarkTag.tags.name}</Badge>
          </li>
        )}
      </For>
    </ul>
  );
};
