import type { Component } from "solid-js";
import { useBookmarksHistory } from "~/modules/bookmarks/contexts/bookmarks-history";
import { ClientOnly } from "~/ui/client-only/client-only";

export const VisitedBookmarks: Component = () => {
  return (
    <ClientOnly>
      <ClientVisitedBookmarks />
    </ClientOnly>
  );
};

const ClientVisitedBookmarks: Component = () => {
  const history = useBookmarksHistory();

  return (
    <ClientOnly>
      <pre>{JSON.stringify(history().ids, null, 2)}</pre>
    </ClientOnly>
  );
};
