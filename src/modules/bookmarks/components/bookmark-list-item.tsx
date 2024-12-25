import type { Component } from "solid-js";
import type { BookmarkWithTagsModel } from "../server";
import { BookmarkTagsList } from "./bookmark-tags-list";
import { DeleteBookmarkForm } from "./delete-bookmark-form";
import { UpdateBookmarkForm } from "./update-bookmark-form";

type BookmarkListItemProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkListItem: Component<BookmarkListItemProps> = (props) => {
  return (
    <div>
      <BookmarkTagsList bookmark={props.bookmark} />
      <pre>{JSON.stringify(props.bookmark, null, 2)}</pre>
      <DeleteBookmarkForm bookmark={props.bookmark} />
      <UpdateBookmarkForm bookmark={props.bookmark} />
    </div>
  );
};
