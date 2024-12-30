import {
  type Component,
  createMemo,
  For,
  type ParentProps,
  Show,
} from "solid-js";
import * as v from "valibot";
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
import { Link } from "~/ui/link/link";
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
          <GridLink href={props.bookmark.text} />
          <GridTitle>{t("bookmarks.item.url")}</GridTitle>
          <GridLink href={props.bookmark.url} />
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

type GridLinkProps = {
  href: string;
};

const GridLink: Component<GridLinkProps> = (props) => {
  const isLink = createMemo(() => {
    return v.safeParse(v.pipe(v.string(), v.url()), props.href).success;
  });

  return (
    <Show when={isLink()} fallback={<GridText>{props.href}</GridText>}>
      <Link hover={true} href={props.href} class="break-words">
        {props.href}
      </Link>
    </Show>
  );
};

type BookmarkPreviewProps = {
  bookmark: BookmarkWithTagsModel;
};

const BookmarkPreview: Component<BookmarkPreviewProps> = (props) => {
  const images = createMemo(() => {
    const array = props.bookmark.preview?.split(";");
    const smallImages = array?.filter((path) => path.endsWith("-250.jpg"));

    if (smallImages && smallImages.length > 0) {
      return smallImages;
    }

    return array ?? [];
  });

  return (
    <Show when={images().length > 0}>
      <div class="relative mx-auto my-4 w-64">
        <Carousel>
          <CarouselContent>
            <For each={images()}>
              {(image) => (
                <CarouselItem>
                  <BookmarkPreviewImage
                    image={image}
                    title={props.bookmark.title}
                  />
                </CarouselItem>
              )}
            </For>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Show>
  );
};

type BookmarkPreviewImageProps = {
  image: string;
  title: string;
};

const BookmarkPreviewImage: Component<BookmarkPreviewImageProps> = (props) => {
  const { t } = useI18n();

  return (
    <img
      src={props.image}
      alt={t("bookmarks.item.preview", { preview: props.title })}
      loading="lazy"
    />
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
