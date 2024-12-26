import { createMemo, type Component, type ComponentProps } from "solid-js";
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

export const BookmarkFilters: Component = () => {
  const { t } = useI18n();

  const dialogId = createMemo(() => "filters-dialog");
  const formId = createMemo(() => "filters-form");

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(formData);
  };

  return (
    <>
      <DialogTrigger for={dialogId()}>
        {t("bookmarks.complete.complete")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("bookmarks.complete.complete")}</DialogTitle>
          <form id={formId()} onSubmit={onSubmit}>
            <span />
          </form>
          <DialogActions>
            <DialogClose />
            <Button form={formId()} color="primary" type="submit">
              {t("bookmarks.complete.complete")}
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};
