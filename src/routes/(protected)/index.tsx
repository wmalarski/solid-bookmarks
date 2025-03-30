import { createAsync, type RouteDefinition } from "@solidjs/router";
import { createMemo, Suspense } from "solid-js";
import {
  BookmarkList,
  BookmarkListPlaceholder,
} from "~/modules/bookmarks/components/bookmark-list";
import {
  type SelectBookmarksArgs,
  selectBookmarksServerQuery,
} from "~/modules/bookmarks/server";
import {
  type FiltersSearchParams,
  parseFiltersSearchParams,
  useFiltersSearchParams,
} from "~/modules/bookmarks/utils/use-filters-search-params";
import { RpcShow } from "~/modules/common/components/rpc-show";

export const route = {
  load: async ({ location }) => {
    const filterSearchParams = parseFiltersSearchParams(location.query);
    const bookmarkArgs = mapToSelectBookmarksArgs(filterSearchParams);
    await selectBookmarksServerQuery(bookmarkArgs);
  },
} satisfies RouteDefinition;

export default function HomePage() {
  const filterSearchParams = useFiltersSearchParams();

  const queryArgs = createMemo(() =>
    mapToSelectBookmarksArgs(filterSearchParams()),
  );

  const bookmarks = createAsync(() => selectBookmarksServerQuery(queryArgs()));

  return (
    <Suspense fallback={<BookmarkListPlaceholder />}>
      <RpcShow result={bookmarks()}>
        {(bookmarks) => (
          <BookmarkList
            count={bookmarks().count ?? 0}
            filterSearchParams={filterSearchParams()}
            initialBookmarks={bookmarks().data}
            queryArgs={queryArgs()}
          />
        )}
      </RpcShow>
    </Suspense>
  );
}

const mapToSelectBookmarksArgs = (
  params: FiltersSearchParams,
): SelectBookmarksArgs => {
  return {
    done: params.done,
    query: params.query,
    random: params.random === "on",
    tags: params["tags[]"],
  };
};
