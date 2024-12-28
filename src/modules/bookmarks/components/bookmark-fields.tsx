import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { FieldError } from "~/ui/field-error/field-error";
import { FormControl } from "~/ui/form-control/form-control";
import { FormError } from "~/ui/form-error/form-error";
import { Label, LabelText } from "~/ui/label/label";
import { TextFieldInput } from "~/ui/text-field/text-field";
import { getInvalidStateProps } from "~/ui/utils/get-invalid-state-props";
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
    <div class="flex flex-col gap-4">
      <FormError message={props.result?.error} />

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
          {...getInvalidStateProps({
            errorMessageId: "title-error",
            isInvalid: !!props.result?.errors?.title,
          })}
        />
        <FieldError id="title-error" message={props.result?.errors?.title} />
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
          {...getInvalidStateProps({
            errorMessageId: "text-error",
            isInvalid: !!props.result?.errors?.text,
          })}
        />
        <FieldError id="text-error" message={props.result?.errors?.text} />
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
          {...getInvalidStateProps({
            errorMessageId: "url-error",
            isInvalid: !!props.result?.errors?.url,
          })}
        />
        <FieldError id="url-error" message={props.result?.errors?.url} />
      </FormControl>

      <BookmarkTagsField
        disabled={props.pending}
        initialTags={props.initialData?.tags}
      />
    </div>
  );
};
