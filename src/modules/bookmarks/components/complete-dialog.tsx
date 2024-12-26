import { useSubmission } from "@solidjs/router";
import { createMemo, type Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { useActionOnSubmit } from "~/modules/common/utils/use-action-on-submit";
import { Button } from "~/ui/button/button";
import {
  closeDialog,
  Dialog,
  DialogActions,
  DialogBox,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog/dialog";
import { CheckIcon } from "~/ui/icons/check-icon";
import { completeBookmarkAction } from "../client";
import type { BookmarkWithTagsModel } from "../server";
import { CompleteFields } from "./complete-fields";

type CompleteDialogProps = {
  bookmark: BookmarkWithTagsModel;
};

export const CompleteDialog: Component<CompleteDialogProps> = (props) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `complete-dialog-${props.bookmark.id}`);
  const formId = createMemo(() => `complete-form-${props.bookmark.id}`);

  const submission = useSubmission(
    completeBookmarkAction,
    ([form]) => form.get("bookmarkId") === String(props.bookmark.id),
  );

  const onSubmit = useActionOnSubmit({
    action: completeBookmarkAction,
    onSuccess: () => closeDialog(dialogId()),
  });

  return (
    <>
      <DialogTrigger for={dialogId()} size="sm" color="primary">
        <CheckIcon class="size-4" />
        {t("bookmarks.complete.complete")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("bookmarks.complete.complete")}</DialogTitle>
          <form id={formId()} onSubmit={onSubmit}>
            <input type="hidden" value={props.bookmark.id} name="bookmarkId" />
            <CompleteFields
              initialData={props.bookmark}
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
              {t("bookmarks.complete.complete")}
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};