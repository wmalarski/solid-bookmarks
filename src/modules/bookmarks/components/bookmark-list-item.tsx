import type { Component } from "solid-js";
import { Card, CardActions, CardBody } from "~/ui/card/card";
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
    <Card variant="bordered" size="compact" bg="base-100" class="w-full">
      <CardBody class="">
        <BookmarkTagsList bookmark={props.bookmark} />
        <pre>{JSON.stringify(props.bookmark, null, 2)}</pre>
        <div class="grid grid-cols-2">
          <div>Title</div>
          <div>{props.bookmark.title}</div>
        </div>
        <CardActions>
          <DeleteBookmarkForm bookmark={props.bookmark} />
          <CompleteDialog bookmark={props.bookmark} />
          <UpdateBookmarkDialog bookmark={props.bookmark} />
        </CardActions>
      </CardBody>
    </Card>
  );
};
