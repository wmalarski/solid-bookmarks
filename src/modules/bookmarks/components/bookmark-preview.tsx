import type { Component } from "solid-js";
import type { BookmarkWithTagsModel } from "../server";

type BookmarkPreviewProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkPreview: Component<BookmarkPreviewProps> = (props) => {
  return (
    <pre>{JSON.stringify({ preview: props.bookmark.preview }, null, 2)}</pre>
  );
};
