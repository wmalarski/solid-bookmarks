import { type Component, Show } from "solid-js";
import { SignOutButton } from "~/modules/auth/components/sign-out-button";
import { useUserContext } from "~/modules/auth/contexts/user-context";
import { LinkButton } from "~/ui/button/button";
import { Link } from "~/ui/link/link";
import { Navbar, NavbarEnd, NavbarStart } from "~/ui/navbar/navbar";
import { useI18n } from "../contexts/i18n";
import { paths } from "../utils/paths";

export const TopNavbar: Component = () => {
  const { t } = useI18n();

  const user = useUserContext();

  return (
    <Navbar>
      <NavbarStart>
        <Link
          class="flex gap-2 text-3xl uppercase"
          hover={true}
          href={paths.home}
        >
          {t("info.title")}
        </Link>
        <Link
          class="flex gap-2 text-3xl uppercase"
          hover={true}
          href={paths.tags}
        >
          {t("tags.heading")}
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
