import { useSubmission } from "@solidjs/router";
import { type Component, Show } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { paths } from "~/modules/common/utils/paths";
import { Alert, AlertIcon } from "~/ui/alert/alert";
import { Button } from "~/ui/button/button";
import { Card, CardBody } from "~/ui/card/card";
import { cardTitleRecipe } from "~/ui/card/card.recipe";
import { Link } from "~/ui/link/link";
import {
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelText,
  TextFieldRoot,
} from "~/ui/text-field/text-field";
import { signUpAction } from "../client";

export const SignUp: Component = () => {
  const { t } = useI18n();

  const submission = useSubmission(signUpAction);

  return (
    <Card bg="base-200" class="w-full max-w-md" variant="bordered">
      <CardBody>
        <header class="flex items-center justify-between gap-2">
          <h2 style={cardTitleRecipe()}>{t("auth.signUp")}</h2>
        </header>
        <form action={signUpAction} class="flex flex-col gap-4" method="post">
          <Show when={submission.result?.success}>
            <Alert variant="success">
              <AlertIcon variant="success" />
              {t("auth.success")}
            </Alert>
          </Show>
          <Show when={submission.result?.error}>
            <Alert variant="error">
              <AlertIcon variant="error" />
              {submission.result?.error}
            </Alert>
          </Show>
          <TextFieldRoot>
            <TextFieldLabel for="email">
              <TextFieldLabelText>{t("auth.email")}</TextFieldLabelText>
            </TextFieldLabel>
            <TextFieldInput
              disabled={submission.pending}
              id="email"
              inputMode="email"
              name="email"
              placeholder={t("auth.email")}
              type="email"
              variant="bordered"
            />
            <Show when={submission.result?.errors?.email}>
              <TextFieldErrorMessage>
                {submission.result?.errors?.email}
              </TextFieldErrorMessage>
            </Show>
          </TextFieldRoot>
          <TextFieldRoot>
            <TextFieldLabel for="password">
              <TextFieldLabelText>{t("auth.password")}</TextFieldLabelText>
            </TextFieldLabel>
            <TextFieldInput
              disabled={submission.pending}
              id="password"
              name="password"
              placeholder={t("auth.password")}
              type="password"
              variant="bordered"
            />
            <Show when={submission.result?.errors?.password}>
              <TextFieldErrorMessage>
                {submission.result?.errors?.password}
              </TextFieldErrorMessage>
            </Show>
          </TextFieldRoot>
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
