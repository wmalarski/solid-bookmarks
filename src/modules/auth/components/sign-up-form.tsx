import { useSubmission } from "@solidjs/router";
import { type Component, Show } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { paths } from "~/modules/common/utils/paths";
import { Alert, AlertIcon } from "~/ui/alert/alert";
import { Button } from "~/ui/button/button";
import { formContainerRecipe } from "~/ui/form-container/form-container.recipe";
import { Link } from "~/ui/link/link";
import { signUpServerAction } from "../server";
import { AuthFields } from "./auth-fields";

export const SignUpForm: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signUpServerAction);

  return (
    <form
      action={signUpServerAction}
      class={formContainerRecipe()}
      method="post"
    >
      <Show when={submission.result?.success}>
        <Alert color="success">
          <AlertIcon variant="success" />
          {t("auth.success")}
        </Alert>
      </Show>
      <AuthFields
        pending={submission.pending}
        result={submission.result?.success ? undefined : submission.result}
        title={t("auth.signUp")}
      />
      <Button
        color="primary"
        disabled={submission.pending}
        isLoading={submission.pending}
        type="submit"
      >
        {t("auth.signUp")}
      </Button>
      <div class="flex justify-center">
        <Link class="text-xs" href={paths.signIn}>
          {t("auth.signIn")}
        </Link>
      </div>
    </form>
  );
};
