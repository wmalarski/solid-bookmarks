import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { paths } from "~/modules/common/utils/paths";
import { Button } from "~/ui/button/button";
import { Link } from "~/ui/link/link";
import { signInAction } from "../client";
import { AuthFields } from "./auth-fields";

export const SignInForm: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signInAction);

  return (
    <form
      action={signInAction}
      method="post"
      class="flex w-full max-w-md flex-col gap-4"
    >
      <AuthFields
        pending={submission.pending}
        result={submission.result}
        title={t("auth.signIn")}
      />
      <Button
        color="primary"
        disabled={submission.pending}
        isLoading={submission.pending}
        type="submit"
      >
        {t("auth.signIn")}
      </Button>
      <div class="flex justify-center">
        <Link class="text-xs" href={paths.signUp}>
          {t("auth.signUp")}
        </Link>
      </div>
    </form>
  );
};
