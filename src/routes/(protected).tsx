import {
  createAsync,
  type RouteDefinition,
  type RouteSectionProps,
} from "@solidjs/router";
import { UserProvider } from "~/modules/auth/contexts/user-context";
import { getUserServerLoader as getUserServerQuery } from "~/modules/auth/server";
import { BookmarksHistoryProvider } from "~/modules/bookmarks/contexts/bookmarks-history";
import { PageLayout } from "~/modules/common/components/layout";
import { TopNavbar } from "~/modules/common/components/top-navbar";

export const route = {
  load: async () => {
    await getUserServerQuery();
  },
} satisfies RouteDefinition;

export default function ProtectedLayout(props: RouteSectionProps) {
  const user = createAsync(() => getUserServerQuery());

  return (
    <UserProvider user={user()}>
      <BookmarksHistoryProvider>
        <PageLayout>
          <TopNavbar />
          {props.children}
        </PageLayout>
      </BookmarksHistoryProvider>
    </UserProvider>
  );
}
