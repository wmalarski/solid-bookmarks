import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { paths } from "~/modules/common/utils/paths";
import { Card, CardBody } from "~/ui/card/card";
import { cardTitleRecipe } from "~/ui/card/card.recipe";
import { CheckCircleIcon } from "~/ui/icons/check-circle-icon";
import { Link } from "~/ui/link/link";

export const SignUpSuccess: Component = () => {
  const { t } = useI18n();

  return (
    <Card bg="base-200" class="w-full max-w-md" variant="bordered">
      <CardBody class="items-center">
        <CheckCircleIcon class="size-10 text-success" />
        <header class="flex items-center justify-between gap-2 text-success">
          <h2 class={cardTitleRecipe()}>{t("auth.success")}</h2>\
        </header>
        <span class="text-center">{t("auth.signUpSuccess.description")}</span>
        <Link href={paths.signIn}>{t("auth.signIn")}</Link>
      </CardBody>
    </Card>
  );
};
