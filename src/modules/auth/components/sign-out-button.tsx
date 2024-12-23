import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { signOutAction } from "~/modules/auth/client";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { ExitIcon } from "~/ui/icons/exit-icon";

export const SignOutButton: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signOutAction);

  return (
    <form action={signOutAction} method="post">
      <Button disabled={submission.pending} size="sm">
        <ExitIcon class="size-4" />
        {t("auth.signOut")}
      </Button>
    </form>
  );
};
