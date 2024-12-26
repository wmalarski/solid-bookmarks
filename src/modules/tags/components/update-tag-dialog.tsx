import { useAction, useSubmission } from "@solidjs/router";
import { createMemo, type Component, type ComponentProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import {
  closeDialog,
  Dialog,
  DialogActions,
  DialogBackdrop,
  DialogBox,
  DialogClose,
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

  const dialogId = createMemo(() => `update-tag-dialog-${props.tag.id}`);
  const formId = createMemo(() => `update-tag-form-${props.tag.id}`);

  const submission = useSubmission(
    updateTagAction,
    ([form]) => form.get("tagId") === String(props.tag.id),
  );
  const action = useAction(updateTagAction);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await action(formData);
    if (result.success) {
      closeDialog(dialogId());
    }
  };

  return (
    <>
      <DialogTrigger for={dialogId()}>{t("tags.form.update")}</DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <h3>{t("tags.form.update")}</h3>
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
