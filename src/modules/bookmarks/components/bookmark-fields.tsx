import { css } from "@tokenami/css";
import type { Component } from "solid-js";
import type * as v from "valibot";
import { useI18n } from "~/modules/common/contexts/i18n";
import {
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelText,
  TextFieldRoot,
} from "~/ui/text-field/text-field";

export type BookmarkFieldsData = {
  title?: string;
  text?: string;
  url?: string;
};

type BookmarkFieldsProps = {
  initialData?: BookmarkFieldsData;
  issues?: v.BaseIssue<unknown>[];
};

export const BookmarkFields: Component<BookmarkFieldsProps> = (props) => {
  const { t } = useI18n();

  return (
    <div
      style={css({
        "--display": "flex",
        "--flex-direction": "column",
        "--gap": 4,
      })}
    >
      <TextFieldRoot>
        <TextFieldLabel for="title">
          <TextFieldLabelText>{t("bookmarks.form.title")}</TextFieldLabelText>
        </TextFieldLabel>
        <TextFieldInput
          id="title"
          name="title"
          placeholder={t("bookmarks.form.title")}
          value={props.initialData?.title}
          variant="bordered"
        />
      </TextFieldRoot>

      <TextFieldRoot>
        <TextFieldLabel for="text">
          <TextFieldLabelText>{t("bookmarks.form.text")}</TextFieldLabelText>
        </TextFieldLabel>
        <TextFieldInput
          id="text"
          name="text"
          placeholder={t("bookmarks.form.text")}
          value={props.initialData?.text}
          variant="bordered"
        />
      </TextFieldRoot>

      <TextFieldRoot>
        <TextFieldLabel for="url">
          <TextFieldLabelText>{t("bookmarks.form.url")}</TextFieldLabelText>
        </TextFieldLabel>
        <TextFieldInput
          id="url"
          name="url"
          placeholder={t("bookmarks.form.url")}
          value={props.initialData?.url}
          variant="bordered"
        />
      </TextFieldRoot>
    </div>
  );
};
