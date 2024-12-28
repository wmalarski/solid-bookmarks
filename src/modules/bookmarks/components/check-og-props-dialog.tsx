import { createAsync } from "@solidjs/router";
import { type Component, createMemo, For, Suspense } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import {
  Dialog,
  DialogActions,
  DialogBox,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog/dialog";
import { PencilIcon } from "~/ui/icons/pencil-icon";
import { getOgPropsQuery } from "../client";
import type { BookmarkFieldsData } from "./bookmark-fields";

type CheckOgPropsDialogProps = {
  name: string;
  value: string;
  onSubmit: (data: BookmarkFieldsData) => void;
};

export const CheckOgPropsDialog: Component<CheckOgPropsDialogProps> = (
  props,
) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => `check-dialog-${props.name}`);
  const formId = createMemo(() => `check-form-${props.name}`);

  return (
    <>
      <DialogTrigger for={dialogId()} size="xs" color="secondary">
        <PencilIcon class="size-4" />
        {t("bookmarks.check.check")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("bookmarks.check.check")}</DialogTitle>
          <CheckOgPropsContent value={props.value} onSubmit={props.onSubmit} />
          <DialogActions>
            <DialogClose />
            <Button form={formId()} color="primary" type="submit">
              {t("common.save")}
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};

type CheckOgPropsContentProps = {
  value: string;
  onSubmit: (data: BookmarkFieldsData) => void;
};

const CheckOgPropsContent: Component<CheckOgPropsContentProps> = (props) => {
  const ogProps = createAsync(() => getOgPropsQuery(props.value));

  return (
    <Suspense>
      <div class="grid grid-cols-3 gap-2">
        <For each={ogProps()?.props}>
          {(prop) => (
            <>
              <span>{prop.property}</span>
              <span class="break-words">{prop.content}</span>
              <div class="flex flex-col">
                <Button size="xs" type="button">
                  title
                </Button>
                <Button size="xs" type="button">
                  text
                </Button>
                <Button size="xs" type="button">
                  url
                </Button>
                <Button size="xs" type="button">
                  preview
                </Button>
              </div>
            </>
          )}
        </For>
      </div>
    </Suspense>
  );
};
