import { type Component, createSignal, type ParentProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { FieldError } from "~/ui/field-error/field-error";
import {
  Fieldset,
  FieldsetLabel,
  FieldsetLegend,
} from "~/ui/fieldset/fieldset";
import { FormError } from "~/ui/form-error/form-error";
import { Input } from "~/ui/input/input";
import { getInvalidStateProps } from "~/ui/utils/get-invalid-state-props";
import { BookmarkTagsField } from "./bookmark-tags-field";
import { CheckOgPropsDialog } from "./check-og-props-dialog";

export type BookmarkFieldsData = {
  title?: string;
  text?: string;
  url?: string;
  preview?: string | null;
  tags?: number[];
};

type BookmarkFieldsProps = {
  initialData?: BookmarkFieldsData;
  pending?: boolean;
  result?: RpcFailure;
  title: string;
};

export const BookmarkFields: Component<BookmarkFieldsProps> = (props) => {
  const { t } = useI18n();

  const [titleRef, setTitleRef] = createSignal<HTMLInputElement>();
  const [urlRef, setUrlRef] = createSignal<HTMLInputElement>();
  const [previewRef, setPreviewRef] = createSignal<HTMLInputElement>();

  const onCheckSubmit = (data: BookmarkFieldsData) => {
    const titleInput = titleRef();
    const urlInput = urlRef();
    const previewInput = previewRef();

    if (data.title && titleInput) {
      titleInput.value = data.title;
    }
    if (data.url && urlInput) {
      urlInput.value = data.url;
    }
    if (data.preview && previewInput) {
      previewInput.value = data.preview;
    }
  };

  return (
    <Fieldset>
      <FieldsetLegend>{props.title}</FieldsetLegend>

      <FormError message={props.result?.error} />

      <LabelRow>
        <FieldsetLabel for="title">{t("bookmarks.form.title")}</FieldsetLabel>
        <CheckOgPropsDialog
          value={props.initialData?.title}
          onCheck={onCheckSubmit}
        />
      </LabelRow>
      <Input
        id="title"
        name="title"
        placeholder={t("bookmarks.form.title")}
        value={props.initialData?.title}
        disabled={props.pending}
        ref={setTitleRef}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "title-error",
          isInvalid: !!props.result?.errors?.title,
        })}
      />
      <FieldError id="title-error" message={props.result?.errors?.title} />

      <LabelRow>
        <FieldsetLabel for="text">{t("bookmarks.form.text")}</FieldsetLabel>
        <CheckOgPropsDialog
          value={props.initialData?.text}
          onCheck={onCheckSubmit}
        />
      </LabelRow>
      <Input
        id="text"
        name="text"
        placeholder={t("bookmarks.form.text")}
        value={props.initialData?.text}
        disabled={props.pending}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "text-error",
          isInvalid: !!props.result?.errors?.text,
        })}
      />
      <FieldError id="text-error" message={props.result?.errors?.text} />

      <LabelRow>
        <FieldsetLabel for="url">{t("bookmarks.form.url")}</FieldsetLabel>
        <CheckOgPropsDialog
          value={props.initialData?.url}
          onCheck={onCheckSubmit}
        />
      </LabelRow>
      <Input
        id="url"
        name="url"
        placeholder={t("bookmarks.form.url")}
        value={props.initialData?.url}
        disabled={props.pending}
        ref={setUrlRef}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "url-error",
          isInvalid: !!props.result?.errors?.url,
        })}
      />
      <FieldError id="url-error" message={props.result?.errors?.url} />

      <LabelRow>
        <FieldsetLabel for="preview">
          {t("bookmarks.form.preview")}
        </FieldsetLabel>
        <CheckOgPropsDialog
          value={props.initialData?.preview ?? undefined}
          onCheck={onCheckSubmit}
        />
      </LabelRow>
      <Input
        id="preview"
        name="preview"
        placeholder={t("bookmarks.form.preview")}
        value={props.initialData?.preview ?? undefined}
        disabled={props.pending}
        ref={setPreviewRef}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "preview-error",
          isInvalid: !!props.result?.errors?.preview,
        })}
      />
      <FieldError id="preview-error" message={props.result?.errors?.preview} />

      <BookmarkTagsField
        disabled={props.pending}
        initialTags={props.initialData?.tags}
      />
    </Fieldset>
  );
};

const LabelRow: Component<ParentProps> = (props) => {
  return (
    <div class="flex w-full items-center justify-between gap-2">
      {props.children}
    </div>
  );
};
