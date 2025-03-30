import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { ExitIcon } from "~/ui/icons/exit-icon";
import { signOutServerAction } from "../server";

export const SignOutButton: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signOutServerAction);

  return (
    <form action={signOutServerAction} method="post">
      <Button
        disabled={submission.pending}
        isLoading={submission.pending}
        size="sm"
      >
        <ExitIcon class="size-4" />
        {t("auth.signOut")}
      </Button>
    </form>
  );
};
