import { useSubmission } from "@solidjs/router";
import { createMemo, type Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { useActionOnSubmit } from "~/modules/common/utils/use-action-on-submit";
import { Button } from "~/ui/button/button";
import {
  closeDialog,
  Dialog,
  DialogActions,
  DialogBackdrop,
  DialogBox,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog/dialog";
import { updateTagAction } from "../client";
import type { TagModel } from "../server";
import { TagFields } from "./tag-fields";

type UpdateTagDialogProps = {
  tag: TagModel;
};

export const UpdateTagDialog: Component<UpdateTagDialogProps> = (props) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `update-dialog-${props.tag.id}`);
  const formId = createMemo(() => `update-form-${props.tag.id}`);

  const submission = useSubmission(
    updateTagAction,
    ([form]) => form.get("tagId") === String(props.tag.id),
  );

  const onSubmit = useActionOnSubmit({
    action: updateTagAction,
    onSuccess: () => closeDialog(dialogId()),
  });

  return (
    <>
      <DialogTrigger for={dialogId()}>{t("common.update")}</DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("common.update")}</DialogTitle>
          <form id={formId()} onSubmit={onSubmit}>
            <input type="hidden" value={props.tag.id} name="tagId" />
            <TagFields
              pending={submission.pending}
              result={
                submission.result?.success ? undefined : submission.result
              }
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
        <DialogBackdrop />
      </Dialog>
    </>
  );
};
