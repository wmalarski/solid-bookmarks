import { css } from "@tokenami/css";
import { Show, type Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { Alert, AlertIcon } from "~/ui/alert/alert";
import { FormControl } from "~/ui/form-control/form-control";
import { Label, LabelText } from "~/ui/label/label";
import {
  TextFieldErrorMessage,
  TextFieldInput,
} from "~/ui/text-field/text-field";
import { BookmarkTagsField } from "./bookmark-tags-field";

export type BookmarkFieldsData = {
  title?: string;
  text?: string;
  url?: string;
  tags?: number[];
};

type BookmarkFieldsProps = {
  initialData?: BookmarkFieldsData;
  pending?: boolean;
  result?: RpcFailure;
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
      <Show when={props.result?.error}>
        <Alert variant="error">
          <AlertIcon variant="error" />
          {props.result?.error}
        </Alert>
      </Show>

      <FormControl>
        <Label for="title">
          <LabelText>{t("bookmarks.form.title")}</LabelText>
        </Label>
        <TextFieldInput
          id="title"
          name="title"
          placeholder={t("bookmarks.form.title")}
          value={props.initialData?.title}
          disabled={props.pending}
          variant="bordered"
        />
        <Show when={props.result?.errors?.title}>
          <TextFieldErrorMessage>
            {props.result?.errors?.title}
          </TextFieldErrorMessage>
        </Show>
      </FormControl>

      <FormControl>
        <Label for="text">
          <LabelText>{t("bookmarks.form.text")}</LabelText>
        </Label>
        <TextFieldInput
          id="text"
          name="text"
          placeholder={t("bookmarks.form.text")}
          value={props.initialData?.text}
          disabled={props.pending}
          variant="bordered"
        />
        <Show when={props.result?.errors?.text}>
          <TextFieldErrorMessage>
            {props.result?.errors?.text}
          </TextFieldErrorMessage>
        </Show>
      </FormControl>

      <FormControl>
        <Label for="url">
          <LabelText>{t("bookmarks.form.url")}</LabelText>
        </Label>
        <TextFieldInput
          id="url"
          name="url"
          placeholder={t("bookmarks.form.url")}
          value={props.initialData?.url}
          disabled={props.pending}
          variant="bordered"
        />
        <Show when={props.result?.errors?.url}>
          <TextFieldErrorMessage>
            {props.result?.errors?.url}
          </TextFieldErrorMessage>
        </Show>
      </FormControl>

      <BookmarkTagsField initialTags={props.initialData?.tags} />
    </div>
  );
};
