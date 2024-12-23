import { css } from "@tokenami/css";
import { decode } from "decode-formdata";
import { createSignal, type Component, type ComponentProps } from "solid-js";
import * as v from "valibot";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { BookmarkFields, type BookmarkFieldsData } from "./bookmark-fields";

type AddBookmarkFormProps = {
  initialData?: BookmarkFieldsData;
};

export const AddBookmarkForm: Component<AddBookmarkFormProps> = (props) => {
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
  };

  return (
    <form
      style={css({
        "--display": "flex",
        "--flex-direction": "column",
        "--gap": 6,
      })}
      onSubmit={onSubmit}
    >
      <BookmarkFields initialData={props.initialData} issues={issues()} />
      <Button color="primary" size="sm" type="submit">
        {t("bookmarks.form.save")}
      </Button>
    </form>
  );
};
