import { css } from "@tokenami/css";
import { Show, type Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { Alert, AlertIcon } from "~/ui/alert/alert";
import {
  TextFieldErrorMessage,
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

      <TextFieldRoot>
        <TextFieldLabel for="title">
          <TextFieldLabelText>{t("bookmarks.form.title")}</TextFieldLabelText>
        </TextFieldLabel>
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
          disabled={props.pending}
          variant="bordered"
        />
        <Show when={props.result?.errors?.text}>
          <TextFieldErrorMessage>
            {props.result?.errors?.text}
          </TextFieldErrorMessage>
        </Show>
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
          disabled={props.pending}
          variant="bordered"
        />
        <Show when={props.result?.errors?.url}>
          <TextFieldErrorMessage>
            {props.result?.errors?.url}
          </TextFieldErrorMessage>
        </Show>
      </TextFieldRoot>
    </div>
  );
};
