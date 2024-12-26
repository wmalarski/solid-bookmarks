import { useSubmission } from "@solidjs/router";
import { createMemo, type Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { useActionOnSubmit } from "~/modules/common/utils/use-action-on-submit";
import { AlertDialog } from "~/ui/alert-dialog/alert-dialog";
import { closeDialog, DialogTrigger } from "~/ui/dialog/dialog";
import { TrashIcon } from "~/ui/icons/trash-icon";
import { deleteTagAction } from "../client";
import type { TagModel } from "../server";

type DeleteTagFormProps = {
  tag: TagModel;
};

export const DeleteTagForm: Component<DeleteTagFormProps> = (props) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `delete-dialog-${props.tag.id}`);

  const submission = useSubmission(
    deleteTagAction,
    ([form]) => form.get("tagId") === String(props.tag.id),
  );

  const onSubmit = useActionOnSubmit({
    action: deleteTagAction,
    onSuccess: () => closeDialog(dialogId()),
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" value={props.tag.id} name="tagId" />
      <DialogTrigger for={dialogId()} color="error" size="sm">
        <TrashIcon class="size-4" />
        {t("common.delete")}
      </DialogTrigger>
      <AlertDialog
        confirm={t("common.delete")}
        confirmColor="error"
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
