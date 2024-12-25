import { useSubmission } from "@solidjs/router";
import { css } from "@tokenami/css";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { updateBookmarkAction } from "../client";
import type { BookmarkWithTagsModel } from "../server";
import { BookmarkFields } from "./bookmark-fields";

type UpdateBookmarkFormProps = {
  bookmark: BookmarkWithTagsModel;
};

export const UpdateBookmarkForm: Component<UpdateBookmarkFormProps> = (
  props,
) => {
  const { t } = useI18n();

  const submission = useSubmission(updateBookmarkAction);

  const initialData = () => {
    return {
      ...props.bookmark,
      tags: props.bookmark.bookmarks_tags.map(
        (bookmarkTag) => bookmarkTag.tag_id,
      ),
    };
  };

  return (
    <form
      action={updateBookmarkAction}
      method="post"
      style={css({
        "--display": "flex",
        "--flex-direction": "column",
        "--gap": 6,
      })}
    >
      <input type="hidden" value={props.bookmark.id} name="bookmarkId" />
      <BookmarkFields
        initialData={initialData()}
        pending={submission.pending}
        result={submission.result}
      />
      <Button color="primary" size="sm" type="submit">
        {t("bookmarks.form.save")}
      </Button>
    </form>
  );
};
