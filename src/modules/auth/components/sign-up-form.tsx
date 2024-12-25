import { useSubmission } from "@solidjs/router";
import { type Component, Show } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { paths } from "~/modules/common/utils/paths";
import { Alert, AlertIcon } from "~/ui/alert/alert";
import { Button } from "~/ui/button/button";
import { Card, CardBody } from "~/ui/card/card";
import { cardTitleRecipe } from "~/ui/card/card.recipe";
import { Link } from "~/ui/link/link";
import { signUpAction } from "../client";
import { AuthFields } from "./auth-fields";

export const SignUpForm: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signUpAction);

  return (
    <Card bg="base-200" class="w-full max-w-md" variant="bordered">
      <CardBody>
        <header class="flex items-center justify-between gap-2">
          <h2 class={cardTitleRecipe()}>{t("auth.signUp")}</h2>
        </header>
        <form action={signUpAction} class="flex flex-col gap-4" method="post">
          <Show when={submission.result?.success}>
            <Alert variant="success">
              <AlertIcon variant="success" />
              {t("auth.success")}
            </Alert>
          </Show>
          <AuthFields
            pending={submission.pending}
            result={submission.result?.success ? undefined : submission.result}
          />
          <Button
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
      </CardBody>
    </Card>
  );
};
