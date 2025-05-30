import { type Component, createSignal, Show } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { createIsLink } from "~/modules/common/utils/create-is-link";
import { Button } from "~/ui/button/button";
import { getOgPropsServerQuery } from "../og-scrapper";
import type { BookmarkFieldsData } from "./bookmark-fields";

type CheckOgPropsDialogProps = {
  value?: string;
  onCheck: (data: BookmarkFieldsData) => void;
};

export const CheckOgPropsDialog: Component<CheckOgPropsDialogProps> = (
  props,
) => {
  const { t } = useI18n();

  const isLink = createIsLink(() => props.value);

  const [isPending, setIsPending] = createSignal(false);

  const onCheckClick = async () => {
    setIsPending(true);

    const results = await getOgPropsServerQuery(props.value);
    const map = new Map(
      results?.props.map((prop) => [prop.property, prop.content]),
    );

    const image = map.get("og:image");
    const description = map.get("og:description");
    const url = map.get("og:url");

    props.onCheck({
      preview: image,
      title: description,
      url,
    });

    setIsPending(false);
  };

  return (
    <Show when={isLink()}>
      <Button
        color="secondary"
        disabled={isPending()}
        isLoading={isPending()}
        onClick={onCheckClick}
        size="xs"
        type="button"
      >
        {t("bookmarks.form.check")}
      </Button>
    </Show>
  );
};
