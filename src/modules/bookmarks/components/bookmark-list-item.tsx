import {
  type Component,
  createMemo,
  For,
  type ParentProps,
  Show,
} from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { createDateFormatter } from "~/modules/common/utils/formatters";
import { Badge } from "~/ui/badge/badge";
import { Card, CardActions, CardBody } from "~/ui/card/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/ui/carousel/carousel";
import type { BookmarkWithTagsModel } from "../server";
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
    <Card variant="bordered" size="compact" class="w-full">
      <CardBody class="">
        <BookmarkTagsList bookmark={props.bookmark} />
        <BookmarkPreview bookmark={props.bookmark} />
        <div class="grid grid-cols-2 gap-2 pb-4">
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
  return <span class="font-semibold text-base">{props.children}</span>;
};

const GridText: Component<ParentProps> = (props) => {
  return <span class="break-words">{props.children}</span>;
};

type BookmarkPreviewProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkPreview: Component<BookmarkPreviewProps> = (props) => {
  const images = createMemo(
    () =>
      props.bookmark.preview
        ?.split(";")
        .filter((path) => path.endsWith("-250.jpg")) ?? [],
  );

  return (
    <Show when={images().length > 0}>
      <div class="relative mx-16 my-4">
        <Carousel>
          <CarouselContent>
            <For each={images()}>
              {(image) => <CarouselItem>{image}</CarouselItem>}
            </For>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Show>
  );
};

type BookmarkTagsListProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkTagsList: Component<BookmarkTagsListProps> = (props) => {
  return (
    <ul class="flex flex-wrap flex-row gap-2">
      <For each={props.bookmark.bookmarks_tags}>
        {(bookmarkTag) => (
          <li>
            <Badge color="accent">{bookmarkTag.tags.name}</Badge>
          </li>
        )}
      </For>
    </ul>
  );
};
