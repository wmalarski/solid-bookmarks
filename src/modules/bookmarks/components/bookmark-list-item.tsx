import { Show, type Component, type ParentProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { createDateFormatter } from "~/modules/common/utils/formatters";
import { Card, CardActions, CardBody } from "~/ui/card/card";
import type { BookmarkWithTagsModel } from "../server";
import { BookmarkPreview } from "./bookmark-preview";
import { BookmarkTagsList } from "./bookmark-tags-list";
import { CompleteDialog } from "./complete-dialog";
import { DeleteBookmarkForm } from "./delete-bookmark-form";
import { UpdateBookmarkDialog } from "./update-bookmark-dialog";

type BookmarkListItemProps = {
  bookmark: BookmarkWithTagsModel;
};

export const BookmarkListItem: Component<BookmarkListItemProps> = (props) => {
  const { t } = useI18n();

  const formatDate = createDateFormatter();

  return (
    <Card variant="bordered" size="compact" bg="base-100" class="w-full">
      <CardBody class="">
        <BookmarkTagsList bookmark={props.bookmark} />
        <BookmarkPreview bookmark={props.bookmark} />
        <div class="grid grid-cols-2 gap-4 pb-4">
          <GridTitle>{t("bookmarks.item.title")}</GridTitle>
          <GridText>{props.bookmark.title}</GridText>
          <GridTitle>{t("bookmarks.item.text")}</GridTitle>
          <GridText>{props.bookmark.text}</GridText>
          <GridTitle>{t("bookmarks.item.url")}</GridTitle>
          <GridText>{props.bookmark.url}</GridText>
          <GridTitle>{t("bookmarks.item.createdAt")}</GridTitle>
          <GridText>{formatDate(props.bookmark.created_at)}</GridText>
          <GridTitle>{t("bookmarks.item.done")}</GridTitle>
          <GridText>{String(props.bookmark.done)}</GridText>
          <Show when={props.bookmark.done}>
            <GridTitle>{t("bookmarks.item.doneAt")}</GridTitle>
            <GridText>
              {props.bookmark.done_at && formatDate(props.bookmark.done_at)}
            </GridText>
            <GridTitle>{t("bookmarks.item.rate")}</GridTitle>
            <GridText>{props.bookmark.rate}</GridText>
            <GridTitle>{t("bookmarks.item.note")}</GridTitle>
            <GridText>{props.bookmark.note}</GridText>
          </Show>
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

const GridTitle: Component<ParentProps> = (props) => {
  return <span class="font-semibold">{props.children}</span>;
};

const GridText: Component<ParentProps> = (props) => {
  return <span>{props.children}</span>;
};
