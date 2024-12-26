import { type RouteDefinition, createAsync } from "@solidjs/router";
import { createMemo } from "solid-js";
import { selectBookmarksQuery } from "~/modules/bookmarks/client";
import { BookmarkList } from "~/modules/bookmarks/components/bookmark-list";
import type { SelectBookmarksArgs } from "~/modules/bookmarks/server";
import {
  type FiltersSearchParams,
  parseFiltersSearchParams,
  useFiltersSearchParams,
} from "~/modules/bookmarks/utils/use-filters-search-params";
import { RpcShow } from "~/modules/common/components/rpc-show";

export const route = {
  load: async ({ location }) => {
    const filterSearchParams = parseFiltersSearchParams(location.query);
    await selectBookmarksQuery(mapToSelectBookmarksArgs(filterSearchParams));
  },
} satisfies RouteDefinition;

export default function HomePage() {
  const filterSearchParams = useFiltersSearchParams();

  const queryArgs = createMemo(() =>
    mapToSelectBookmarksArgs(filterSearchParams()),
  );

  const bookmarks = createAsync(() => selectBookmarksQuery(queryArgs()));

  return (
    <RpcShow result={bookmarks()}>
      {(bookmarks) => (
        <BookmarkList
          queryArgs={queryArgs()}
          filterSearchParams={filterSearchParams()}
          count={bookmarks().count ?? 0}
          initialBookmarks={bookmarks().data}
        />
      )}
    </RpcShow>
  );
}

const mapToSelectBookmarksArgs = (
  params: FiltersSearchParams,
): SelectBookmarksArgs => {
  return {
    tags: params["tags[]"],
    done: params.done,
    random: params.random === "on",
  };
};
