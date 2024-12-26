import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
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
import { insertTagAction } from "../client";
import { TagFields } from "./tag-fields";

export const InsertTagDialog: Component = () => {
  const { t } = useI18n();

  const dialogId = "insert-dialog";
  const formId = "insert-form";

  const submission = useSubmission(insertTagAction);

  const onSubmit = useActionOnSubmit({
    action: insertTagAction,
    onSuccess: () => closeDialog(dialogId),
  });

  return (
    <>
      <DialogTrigger color="primary" for={dialogId}>
        {t("tags.form.add")}
      </DialogTrigger>
      <Dialog id={dialogId}>
        <DialogBox>
          <DialogTitle>{t("tags.form.add")}</DialogTitle>
          <form id={formId} onSubmit={onSubmit}>
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
              form={formId}
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
