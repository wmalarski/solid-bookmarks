import { createAsync } from "@solidjs/router";
import { type Component, For, Suspense, createSignal } from "solid-js";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { selectBookmarksQuery } from "../client";
import { SELECT_BOOKMARKS_DEFAULT_LIMIT } from "../const";
import type { BookmarkWithTagsModel, SelectBookmarksArgs } from "../server";
import type { FiltersSearchParams } from "../utils/use-filters-search-params";
import { BookmarkFilters } from "./bookmark-filters";
import { BookmarkListItem } from "./bookmark-list-item";

type BookmarkListProps = {
  queryArgs: SelectBookmarksArgs;
  filterSearchParams: FiltersSearchParams;
  initialBookmarks: BookmarkWithTagsModel[];
  count: number;
};

export const BookmarkList: Component<BookmarkListProps> = (props) => {
  const { t } = useI18n();

  const [offsets, setOffsets] = createSignal<number[]>([]);

  const onLoadMoreClick = () => {
    setOffsets((current) => {
      const lastOffset = current[current.length - 1] ?? 0;
      return [...current, lastOffset + SELECT_BOOKMARKS_DEFAULT_LIMIT];
    });
  };

  return (
    <div class="w-full max-w-xl flex flex-col gap-2 py-4 px-2">
      <div class="w-full flex justify-between gap-2">
        <h2 class="text-xl">{t("bookmarks.title")}</h2>
        <BookmarkFilters params={props.filterSearchParams} />
      </div>
      <ul class="flex flex-col gap-4">
        <BookmarkListPart bookmarks={props.initialBookmarks} />
        <For each={offsets()}>
          {(offset) => (
            <BookmarkLazy offset={offset} queryArgs={props.queryArgs} />
          )}
        </For>
      </ul>
      <Button size="sm" color="secondary" onClick={onLoadMoreClick}>
        {t("bookmarks.loadMore")}
      </Button>
    </div>
  );
};

type BookmarkLazyProps = {
  queryArgs: SelectBookmarksArgs;
  offset: number;
};

const BookmarkLazy: Component<BookmarkLazyProps> = (props) => {
  const bookmarks = createAsync(() =>
    selectBookmarksQuery({ offset: props.offset, ...props.queryArgs }),
  );

  return (
    <Suspense>
      <RpcShow result={bookmarks()}>
        {(bookmarks) => <BookmarkListPart bookmarks={bookmarks().data ?? []} />}
      </RpcShow>
    </Suspense>
  );
};

type BookmarkListPartProps = {
  bookmarks: BookmarkWithTagsModel[];
};

const BookmarkListPart: Component<BookmarkListPartProps> = (props) => {
  return (
    <>
      {props.bookmarks.map((bookmark) => (
        <li>
          <BookmarkListItem bookmark={bookmark} />
        </li>
      ))}
    </>
  );
};
