import { createAsync, type RouteDefinition } from "@solidjs/router";
import { createMemo } from "solid-js";
import { selectBookmarksQuery } from "~/modules/bookmarks/client";
import type { SelectBookmarksArgs } from "~/modules/bookmarks/server";
import {
  type FiltersSearchParams,
  parseFiltersSearchParams,
  useFiltersSearchParams,
} from "~/modules/bookmarks/utils/use-filters-search-params";
import { Button } from "~/ui/button/button";

export const route = {
  load: async ({ location }) => {
    const filterSearchParams = parseFiltersSearchParams(location.query);
    const result = await selectBookmarksQuery(
      mapToSelectBookmarksArgs(filterSearchParams),
    );
    console.log("load", selectBookmarksQuery, result);
  },
} satisfies RouteDefinition;

export default function HomePage() {
  const filterSearchParams = useFiltersSearchParams();

  const queryArgs = createMemo(() =>
    mapToSelectBookmarksArgs(filterSearchParams()),
  );

  const bookmarks = createAsync(() => selectBookmarksQuery(queryArgs()));

  return (
    <>
      <Button type="button" onClick={() => console.log("Click3")}>
        Click3
      </Button>
      {/* <Suspense fallback={<BookmarkListPlaceholder />}>
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
      </Suspense> */}
    </>
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
