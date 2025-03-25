import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { formContainerRecipe } from "~/ui/form-container/form-container.recipe";
import { PlusIcon } from "~/ui/icons/plus-icon";
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
      class={formContainerRecipe({ class: "px-4" })}
    >
      <BookmarkFields
        initialData={props.initialData}
        pending={submission.pending}
        result={submission.result}
        title={t("bookmarks.share")}
      />
      <Button
        color="primary"
        size="sm"
        type="submit"
        isLoading={submission.pending}
        disabled={submission.pending}
      >
        <PlusIcon class="size-4" />
        {t("common.save")}
      </Button>
    </form>
  );
};
