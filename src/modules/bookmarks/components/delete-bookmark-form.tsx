import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { deleteBookmarkAction } from "../client";
import type { BookmarkWithTagsModel } from "../server";

type DeleteBookmarkFormProps = {
  bookmark: BookmarkWithTagsModel;
};

export const DeleteBookmarkForm: Component<DeleteBookmarkFormProps> = (
  props,
) => {
  const { t } = useI18n();

  const submission = useSubmission(deleteBookmarkAction);

  return (
    <form action={deleteBookmarkAction} method="post">
      <input type="hidden" value={props.bookmark.id} name="bookmarkId" />
      <Button
        disabled={submission.pending}
        isLoading={submission.pending}
        type="submit"
      >
        {t("common.delete")}
      </Button>
    </form>
  );
};
