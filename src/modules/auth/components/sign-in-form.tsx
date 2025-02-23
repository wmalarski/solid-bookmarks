import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { paths } from "~/modules/common/utils/paths";
import { Button } from "~/ui/button/button";
import { Card, CardBody } from "~/ui/card/card";
import { cardTitleRecipe } from "~/ui/card/card.recipe";
import { Link } from "~/ui/link/link";
import { signInAction } from "../client";
import { AuthFields } from "./auth-fields";

export const SignInForm: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signInAction);

  return (
    <Card class="w-full max-w-md" variant="bordered">
      <CardBody>
        <header class="flex items-center justify-between gap-2">
          <h2 class={cardTitleRecipe()}>{t("auth.signIn")}</h2>
        </header>
        <form action={signInAction} method="post" class="flex flex-col gap-4">
          <AuthFields pending={submission.pending} result={submission.result} />
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
      </CardBody>
    </Card>
  );
};
