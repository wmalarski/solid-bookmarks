import { useAction, useSubmission } from "@solidjs/router";
import { createMemo, type Component, type ComponentProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { AlertDialog } from "~/ui/alert-dialog/alert-dialog";
import { closeDialog, DialogTrigger } from "~/ui/dialog/dialog";
import { deleteTagAction } from "../client";
import type { TagModel } from "../server";

type DeleteTagFormProps = {
  tag: TagModel;
};

export const DeleteTagForm: Component<DeleteTagFormProps> = (props) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `delete-tag-dialog-${props.tag.id}`);

  const submission = useSubmission(
    deleteTagAction,
    ([form]) => form.get("tagId") === String(props.tag.id),
  );

  const action = useAction(deleteTagAction);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await action(formData);

    if (result?.success) {
      closeDialog(dialogId());
    }
  };

  return (
    <form onSubmit={onSubmit} method="post">
      <input type="hidden" value={props.tag.id} name="tagId" />
      <DialogTrigger for={dialogId()}>{t("common.delete")}</DialogTrigger>
      <AlertDialog
        confirm={t("common.save")}
        title={t("common.delete")}
        pending={submission.pending}
        id={dialogId()}
        errorMessage={submission.result?.error}
      />
    </form>
  );
};
