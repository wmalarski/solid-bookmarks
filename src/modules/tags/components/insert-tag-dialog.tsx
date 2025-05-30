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
import { PlusIcon } from "~/ui/icons/plus-icon";
import { insertTagServerAction } from "../server";
import { TagFields } from "./tag-fields";

export const InsertTagDialog: Component = () => {
  const { t } = useI18n();

  const dialogId = "insert-dialog";
  const formId = "insert-form";

  const submission = useSubmission(insertTagServerAction);

  const onSubmit = useActionOnSubmit({
    action: insertTagServerAction,
    onSuccess: () => closeDialog(dialogId),
    resetOnSuccess: true,
  });

  return (
    <>
      <DialogTrigger color="primary" for={dialogId} size="sm">
        <PlusIcon class="size-4" />
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
              color="primary"
              disabled={submission.pending}
              form={formId}
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
