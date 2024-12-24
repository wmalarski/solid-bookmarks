import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { TagModel } from "~/modules/supabase/models";
import { Button } from "~/ui/button/button";
import { deleteTagAction } from "../client";

type DeleteTagFormProps = {
  tag: TagModel;
};

export const DeleteTagForm: Component<DeleteTagFormProps> = (props) => {
  const { t } = useI18n();

  const submission = useSubmission(deleteTagAction);

  return (
    <form action={deleteTagAction} method="post">
      <input type="hidden" value={props.tag.id} name="tagId" />
      <Button
        disabled={submission.pending}
        isLoading={submission.pending}
        type="submit"
      >
        {t("tags.form.delete")}
      </Button>
    </form>
  );
};
