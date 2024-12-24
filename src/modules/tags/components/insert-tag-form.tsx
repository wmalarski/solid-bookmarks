import { useSubmission } from "@solidjs/router";
import { css } from "@tokenami/css";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { insertTagAction } from "../client";
import { TagFields } from "./tag-fields";

export const InsertTagForm: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(insertTagAction);

  return (
    <form
      action={insertTagAction}
      method="post"
      style={css({
        "--display": "flex",
        "--flex-direction": "column",
        "--gap": 4,
      })}
    >
      <TagFields pending={submission.pending} result={submission.result} />
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
