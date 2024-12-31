import {
  type RouteDefinition,
  type RouteSectionProps,
  createAsync,
} from "@solidjs/router";
import { getUserQuery } from "~/modules/auth/client";
import { UserProvider } from "~/modules/auth/contexts/user-context";
import { BookmarksHistoryProvider } from "~/modules/bookmarks/contexts/bookmarks-history";
import { PageLayout } from "~/modules/common/components/layout";
import { TopNavbar } from "~/modules/common/components/top-navbar";

export const route = {
  load: async () => {
    await getUserQuery();
  },
} satisfies RouteDefinition;

export default function ProtectedLayout(props: RouteSectionProps) {
  const user = createAsync(() => getUserQuery());

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
