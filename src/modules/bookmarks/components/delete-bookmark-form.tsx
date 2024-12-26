import { useAction, useSubmission } from "@solidjs/router";
import { createMemo, type Component, type ComponentProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { AlertDialog } from "~/ui/alert-dialog/alert-dialog";
import { closeDialog, DialogTrigger } from "~/ui/dialog/dialog";
import { deleteBookmarkAction } from "../client";
import type { BookmarkWithTagsModel } from "../server";

type DeleteBookmarkFormProps = {
  bookmark: BookmarkWithTagsModel;
};

export const DeleteBookmarkForm: Component<DeleteBookmarkFormProps> = (
  props,
) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `delete-dialog-${props.bookmark.id}`);

  const submission = useSubmission(
    deleteBookmarkAction,
    ([form]) => form.get("bookmarkId") === String(props.bookmark.id),
  );

  const action = useAction(deleteBookmarkAction);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await action(formData);

    if (result?.success) {
      closeDialog(dialogId());
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" value={props.bookmark.id} name="bookmarkId" />
      <DialogTrigger for={dialogId()}>{t("common.delete")}</DialogTrigger>
      <AlertDialog
        confirm={t("common.delete")}
        confirmColor="warning"
        title={t("common.delete")}
        pending={submission.pending}
        id={dialogId()}
        errorMessage={
          submission.result?.success ? undefined : submission.result?.error
        }
      />
    </form>
  );
};
