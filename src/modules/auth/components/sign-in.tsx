import { useSubmission } from "@solidjs/router";
import { css } from "@tokenami/css";
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
    <Card
      bg="base-200"
      style={css({
        "--width": "var(--size_full)",
        "--max-width": "var(--size_md)",
      })}
      variant="bordered"
    >
      <CardBody>
        <header
          style={css({
            "--display": "flex",
            "--gap": 2,
            "--justify-content": "space-between",
            "--align-items": "center",
          })}
        >
          <h2 style={cardTitleRecipe()}>{t("auth.signIn")}</h2>
        </header>
        <form
          action={signInAction}
          method="post"
          style={css({
            "--display": "flex",
            "--flex-direction": "column",
            "--gap": 4,
          })}
        >
          <AuthFields pending={submission.pending} result={submission.result} />
          <Button
            disabled={submission.pending}
            isLoading={submission.pending}
            type="submit"
          >
            {t("auth.signIn")}
          </Button>
          <div
            style={css({
              "--display": "flex",
              "--justify-content": "center",
            })}
          >
            <Link
              style={css({ "--font-size": "var(--font-size_xs)" })}
              href={paths.signUp}
            >
              {t("auth.signUp")}
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
