import { useAction, useSubmission } from "@solidjs/router";
import type { Component, ComponentProps } from "solid-js";
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
import { insertTagAction } from "../client";
import { TagFields } from "./tag-fields";

export const InsertTagDialog: Component = () => {
  const { t } = useI18n();

  const dialogId = "insert-tag-dialog";
  const formId = "insert-tag-form";

  const submission = useSubmission(insertTagAction);
  const action = useAction(insertTagAction);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await action(formData);
    if (result?.success) {
      closeDialog(dialogId);
    }
  };

  return (
    <>
      <DialogTrigger color="primary" for={dialogId}>
        {t("tags.form.add")}
      </DialogTrigger>
      <Dialog id={dialogId}>
        <DialogBox>
          <h3>{t("tags.form.add")}</h3>
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
