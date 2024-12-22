import { css } from "@tokenami/css";
import { decode } from "decode-formdata";
import { createSignal, type Component, type ComponentProps } from "solid-js";
import * as v from "valibot";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import {
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelText,
  TextFieldRoot,
} from "~/ui/text-field/text-field";

type BookmarkFieldsData = {
  title?: string;
  text?: string;
  url?: string;
};

type BookmarkFieldsProps = {
  initialData?: BookmarkFieldsData;
  onSubmit: (data: BookmarkFieldsData) => void;
};

export const BookmarkFields: Component<BookmarkFieldsProps> = (props) => {
  const { t } = useI18n();

  const [issues, setIssues] = createSignal<v.BaseIssue<unknown>[]>();

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    const result = await v.safeParseAsync(
      v.object({
        title: v.optional(v.string()),
        text: v.optional(v.string()),
        url: v.optional(v.pipe(v.string(), v.url())),
      }),
      decode(new FormData(event.currentTarget)),
    );

    if (!result.success) {
      console.log("result.issues", result.issues);
      setIssues(result.issues);
      return;
    }

    props.onSubmit(result.output);
  };

  return (
    <form
      style={css({
        "--display": "flex",
        "--flex-direction": "column",
        "--gap": 4,
      })}
      onSubmit={onSubmit}
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

      <Button color="primary" size="sm" type="submit">
        {t("bookmarks.form.save")}
      </Button>
    </form>
  );
};
