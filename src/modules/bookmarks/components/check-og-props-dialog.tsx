import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { getOgPropsQuery } from "../client";
import type { BookmarkFieldsData } from "./bookmark-fields";

type CheckOgPropsDialogProps = {
  name: string;
  value: string;
  onCheck: (data: BookmarkFieldsData) => void;
};

export const CheckOgPropsDialog: Component<CheckOgPropsDialogProps> = (
  props,
) => {
  const { t } = useI18n();

  const onCheckClick = async () => {
    const results = await getOgPropsQuery(props.value);
    const map = new Map(
      results?.props.map((prop) => [prop.property, prop.content]),
    );

    const image = map.get("og:image");
    const description = map.get("og:description");
    const url = map.get("og:url");

    props.onCheck({
      text: description,
      preview: image,
      url,
    });
  };

  return (
    <Button type="button" color="secondary" size="xs" onClick={onCheckClick}>
      {t("bookmarks.check.check")}
    </Button>
  );
};
