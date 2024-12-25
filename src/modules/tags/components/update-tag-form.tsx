import { useSubmission } from "@solidjs/router";
import { css } from "@tokenami/css";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";

import { Button } from "~/ui/button/button";
import { updateTagAction } from "../client";
import type { TagModel } from "../server";
import { TagFields } from "./tag-fields";

type UpdateTagFormProps = {
  tag: TagModel;
};

export const UpdateTagForm: Component<UpdateTagFormProps> = (props) => {
  const { t } = useI18n();

  const submission = useSubmission(updateTagAction);

  return (
    <form
      action={updateTagAction}
      method="post"
      style={css({
        "--display": "flex",
        "--flex-direction": "column",
        "--gap": 4,
      })}
    >
      <input type="hidden" value={props.tag.id} name="tagId" />
      <TagFields
        pending={submission.pending}
        result={submission.result}
        initialData={props.tag}
      />
      <Button
        disabled={submission.pending}
        isLoading={submission.pending}
        type="submit"
      >
        {t("tags.form.save")}
      </Button>
    </form>
  );
};
