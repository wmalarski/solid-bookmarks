import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { insertBookmarkAction } from "../client";
import { BookmarkFields, type BookmarkFieldsData } from "./bookmark-fields";

type InsertBookmarkFormProps = {
  initialData?: BookmarkFieldsData;
};

export const InsertBookmarkForm: Component<InsertBookmarkFormProps> = (
  props,
) => {
  const { t } = useI18n();

  const submission = useSubmission(insertBookmarkAction);

  return (
    <form
      action={insertBookmarkAction}
      method="post"
      class="flex flex-col gap-6"
    >
      <BookmarkFields
        initialData={props.initialData}
        pending={submission.pending}
        result={submission.result}
      />
      <Button color="primary" size="sm" type="submit">
        {t("bookmarks.form.save")}
      </Button>
    </form>
  );
};
