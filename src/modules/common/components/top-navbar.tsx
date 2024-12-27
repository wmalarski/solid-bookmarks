import { type Component, Show } from "solid-js";
import { SignOutButton } from "~/modules/auth/components/sign-out-button";
import { useUserContext } from "~/modules/auth/contexts/user-context";
import { LinkButton } from "~/ui/button/button";
import { BookmarkIcon } from "~/ui/icons/bookmark-icon";
import { Link } from "~/ui/link/link";
import { Navbar, NavbarEnd, NavbarStart } from "~/ui/navbar/navbar";
import { useI18n } from "../contexts/i18n";
import { paths } from "../utils/paths";

export const TopNavbar: Component = () => {
  const { t } = useI18n();

  const user = useUserContext();

  return (
    <Navbar>
      <NavbarStart class="gap-2">
        <h1>
          <Link
            class="flex gap-1 text-md sm:text-xl lg:text-3xl uppercase items-center"
            hover={true}
            href={paths.home}
          >
            <BookmarkIcon class="size-6 min-w-6" />
            {t("info.title")}
          </Link>
        </h1>
        <Link
          class="text-sm sm:text-md lg:text-xl uppercase"
          hover={true}
          href={paths.tags}
        >
          {t("tags.heading")}
        </Link>
        <Link
          class="text-sm sm:text-md lg:text-xl uppercase"
          hover={true}
          href={paths.share}
        >
          {t("bookmarks.share")}
        </Link>
      </NavbarStart>
      <NavbarEnd>
        <Show
          fallback={
            <>
              <LinkButton href={paths.signUp} size="sm">
                {t("auth.signUp")}
              </LinkButton>
              <LinkButton href={paths.signIn} size="sm">
                {t("auth.signIn")}
              </LinkButton>
            </>
          }
          when={user()}
        >
          <SignOutButton />
        </Show>
      </NavbarEnd>
    </Navbar>
  );
};
