import type { Component } from "solid-js";
import type { BookmarkWithTagsModel } from "../server";
import { BookmarkTagsList } from "./bookmark-tags-list";
import { CompleteDialog } from "./complete-dialog";
import { DeleteBookmarkForm } from "./delete-bookmark-form";
import { UpdateBookmarkDialog } from "./update-bookmark-dialog";

type BookmarkListItemProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkListItem: Component<BookmarkListItemProps> = (props) => {
  return (
    <div>
      <BookmarkTagsList bookmark={props.bookmark} />
      <pre>{JSON.stringify(props.bookmark, null, 2)}</pre>
      <DeleteBookmarkForm bookmark={props.bookmark} />
      <CompleteDialog bookmark={props.bookmark} />
      <UpdateBookmarkDialog bookmark={props.bookmark} />
    </div>
  );
};
