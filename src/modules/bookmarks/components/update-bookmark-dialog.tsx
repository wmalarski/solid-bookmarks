import { useAction, useSubmission } from "@solidjs/router";
import { createMemo, type Component, type ComponentProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import {
  closeDialog,
  Dialog,
  DialogActions,
  DialogBox,
  DialogClose,
  DialogTrigger,
} from "~/ui/dialog/dialog";
import { updateBookmarkAction } from "../client";
import type { BookmarkWithTagsModel } from "../server";
import { BookmarkFields } from "./bookmark-fields";

type UpdateBookmarkDialogProps = {
  bookmark: BookmarkWithTagsModel;
};

export const UpdateBookmarkDialog: Component<UpdateBookmarkDialogProps> = (
  props,
) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `update-dialog-${props.bookmark.id}`);
  const formId = createMemo(() => `update-form-${props.bookmark.id}`);

  const submission = useSubmission(
    updateBookmarkAction,
    ([form]) => form.get("bookmarkId") === String(props.bookmark.id),
  );

  const action = useAction(updateBookmarkAction);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await action(formData);
    if (result.success) {
      closeDialog(dialogId());
    }
  };

  const initialData = () => {
    return {
      ...props.bookmark,
      tags: props.bookmark.bookmarks_tags.map(
        (bookmarkTag) => bookmarkTag.tags.id,
      ),
    };
  };

  return (
    <>
      <DialogTrigger for={dialogId()}>{t("common.update")}</DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <h3>{t("bookmarks.form.title")}</h3>
          <form id={formId()} onSubmit={onSubmit} class="flex flex-col gap-6">
            <input type="hidden" value={props.bookmark.id} name="bookmarkId" />
            <BookmarkFields
              initialData={initialData()}
              pending={submission.pending}
              result={submission.result}
            />
          </form>
          <DialogActions>
            <DialogClose />
            <Button
              form={formId()}
              color="primary"
              disabled={submission.pending}
              isLoading={submission.pending}
              type="submit"
            >
              {t("common.save")}
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};
