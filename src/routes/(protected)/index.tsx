import { createAsync, type RouteDefinition } from "@solidjs/router";
import { css } from "@tokenami/css";
import { selectBookmarksQuery } from "~/modules/bookmarks/client";
import { BookmarkList } from "~/modules/bookmarks/components/bookmark-list";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { selectTagsQuery } from "~/modules/tags/client";
import { TagsList } from "~/modules/tags/components/tags-list";

export const route = {
  load: async () => {
    await Promise.all([selectTagsQuery({}), selectBookmarksQuery({})]);
  },
} satisfies RouteDefinition;

export default function HomePage() {
  const tags = createAsync(() => selectTagsQuery({}));
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
        <RpcShow result={tags()}>
          {(tags) => <TagsList tags={tags().data} />}
        </RpcShow>
      </div>
    </>
  );
}
