import { createAsync, useParams } from "@solidjs/router";
import { Suspense } from "solid-js";
import { selectBookmarkQuery } from "~/modules/bookmarks/client";
import { BookmarkListPlaceholder } from "~/modules/bookmarks/components/bookmark-list";
import { BookmarkListItem } from "~/modules/bookmarks/components/bookmark-list-item";
import {} from "~/modules/bookmarks/utils/use-filters-search-params";
import { RpcShow } from "~/modules/common/components/rpc-show";

// export const route = {
//   load: async ({ params }) => {
//     await selectBookmarkQuery({ bookmarkId: +params.id });
//   },
// } satisfies RouteDefinition;

export default function BookmarkPage() {
  const params = useParams();

  const bookmark = createAsync(() =>
    selectBookmarkQuery({ bookmarkId: +params.id }),
  );

  return (
    <Suspense fallback={<BookmarkListPlaceholder />}>
      <RpcShow result={bookmark()}>
        {(bookmark) => (
          <div class="p-4">
            <BookmarkListItem bookmark={bookmark().data} />
          </div>
        )}
      </RpcShow>
    </Suspense>
  );
}
