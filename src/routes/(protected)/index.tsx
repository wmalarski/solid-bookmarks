import { createAsync, type RouteDefinition } from "@solidjs/router";
import { css } from "@tokenami/css";
import { selectBookmarksQuery } from "~/modules/bookmarks/client";
import { BookmarkList } from "~/modules/bookmarks/components/bookmark-list";
import { RpcShow } from "~/modules/common/components/rpc-show";

export const route = {
  load: async () => {
    await selectBookmarksQuery({});
  },
} satisfies RouteDefinition;

export default function HomePage() {
  const bookmarks = createAsync(() => selectBookmarksQuery({}));

  return (
    <>
      <h1>A App</h1>
      <div style={css({ "--margin-top": 0, "--margin-bottom": 5 })}>
        <RpcShow result={bookmarks()}>
          {(bookmarks) => (
            <BookmarkList
              count={bookmarks().count ?? 0}
              initialBookmarks={bookmarks().data}
            />
          )}
        </RpcShow>
      </div>
    </>
  );
}
