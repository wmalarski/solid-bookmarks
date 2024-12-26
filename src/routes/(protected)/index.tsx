import { createAsync, type RouteDefinition } from "@solidjs/router";
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
    <RpcShow result={bookmarks()}>
      {(bookmarks) => (
        <BookmarkList
          count={bookmarks().count ?? 0}
          initialBookmarks={bookmarks().data}
        />
      )}
    </RpcShow>
  );
}
