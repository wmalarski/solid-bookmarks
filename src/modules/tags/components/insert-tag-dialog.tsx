import { createUniqueId, type Component } from "solid-js";
import { Button } from "~/ui/button/button";
import {
  Dialog,
  DialogActions,
  DialogBackdrop,
  DialogBox,
  DialogClose,
  DialogTrigger,
} from "~/ui/dialog/dialog";

export const InsertTagDialog: Component = () => {
  const dialogId = createUniqueId();
  const formId = createUniqueId();

  return (
    <>
      <DialogTrigger for={dialogId}>Insert</DialogTrigger>
      <Dialog id={dialogId}>
        <DialogBox>
          <h3>Title</h3>
          <p>description</p>
          <DialogActions>
            <DialogClose />
            <Button form={formId} type="submit">
              Save
            </Button>
          </DialogActions>
        </DialogBox>
        <DialogBackdrop />
      </Dialog>
    </>
  );
};
