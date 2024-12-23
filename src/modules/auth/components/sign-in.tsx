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

export const SignIn: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signInAction);

  return (
    <Card bg="base-200" class="w-full max-w-md" variant="bordered">
      <CardBody>
        <header class="flex items-center justify-between gap-2">
          <h2 style={cardTitleRecipe()}>{t("auth.signIn")}</h2>
        </header>
        <form action={signInAction} class="flex flex-col gap-4" method="post">
          <AuthFields pending={submission.pending} result={submission.result} />
          <Button
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