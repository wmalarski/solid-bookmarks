import { createAsync } from "@solidjs/router";
import { createSignal, For, Suspense, type Component } from "solid-js";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { selectBookmarksQuery } from "../client";
import type { BookmarkWithTagsModel } from "../server";
import { BookmarkListItem } from "./bookmark-list-item";

type BookmarkListProps = {
  initialBookmarks: BookmarkWithTagsModel[];
};

export const BookmarkList: Component<BookmarkListProps> = (props) => {
  const [offsets] = createSignal<number[]>([]);

  return (
    <div>
      <ul>
        <BookmarkListPart bookmarks={props.initialBookmarks} />
        <For each={offsets()}>
          {(offset) => <BookmarkLazy offset={offset} />}
        </For>
      </ul>
    </div>
  );
};

type BookmarkLazyProps = {
  offset: number;
};

export const BookmarkLazy: Component<BookmarkLazyProps> = (props) => {
  const bookmarks = createAsync(() =>
    selectBookmarksQuery({ offset: props.offset }),
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

export const BookmarkListPart: Component<BookmarkListPartProps> = (props) => {
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
