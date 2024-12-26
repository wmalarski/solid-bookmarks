import { useSubmission } from "@solidjs/router";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { Card, CardBody } from "~/ui/card/card";
import { cardTitleRecipe } from "~/ui/card/card.recipe";
import { insertBookmarkAction } from "../client";
import { BookmarkFields, type BookmarkFieldsData } from "./bookmark-fields";

type InsertBookmarkFormProps = {
  initialData?: BookmarkFieldsData;
};

export const InsertBookmarkForm: Component<InsertBookmarkFormProps> = (
  props,
) => {
  const { t } = useI18n();

  const submission = useSubmission(insertBookmarkAction);

  return (
    <Card bg="base-200" class="w-full max-w-md mt-4" variant="bordered">
      <CardBody>
        <header class="flex items-center justify-between gap-2">
          <h2 class={cardTitleRecipe()}>{t("bookmarks.share")}</h2>
        </header>
        <form
          action={insertBookmarkAction}
          method="post"
          class="flex flex-col gap-6"
        >
          <BookmarkFields
            initialData={props.initialData}
            pending={submission.pending}
            result={submission.result}
          />
          <Button color="primary" size="sm" type="submit">
            {t("common.save")}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
