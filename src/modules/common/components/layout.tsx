import type { Component, ParentProps } from "solid-js";
import { Link } from "~/ui/link/link";
import { useI18n } from "../contexts/i18n";
import { paths } from "../utils/paths";

export const PageTitle: Component = () => {
  const { t } = useI18n();

  return (
    <h1 class="my-16 flex items-center text-center text-4xl uppercase sm:text-6xl">
      <Link hover={true} href={paths.home}>
        {t("info.title")}
      </Link>
    </h1>
  );
};

export const PageFooter: Component = () => {
  const { t } = useI18n();

  return (
    <footer class="p-4">
      <Link href={paths.repository} size="xs">
        {t("info.madeBy")}
      </Link>
    </footer>
  );
};

export const FormLayout: Component<ParentProps> = (props) => {
  return (
    <main class="mx-auto flex flex-col items-center p-4">{props.children}</main>
  );
};

export const PageLayout: Component<ParentProps> = (props) => {
  return (
    <main class="mx-auto flex flex-col items-center">{props.children}</main>
  );
};
