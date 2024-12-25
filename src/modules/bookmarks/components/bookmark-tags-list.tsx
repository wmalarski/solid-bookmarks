import { For, type Component } from "solid-js";
import type { BookmarkWithTagsModel } from "../server";

type BookmarkTagsListProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkTagsList: Component<BookmarkTagsListProps> = (props) => {
  return (
    <ul>
      <For each={props.bookmark.bookmarks_tags}>
        {(bookmarkTag) => <li>{bookmarkTag.tags.name}</li>}
      </For>
    </ul>
  );
};
