import type { Component } from "solid-js";
import { Button } from "../button/button";
import {
  Dialog,
  DialogActions,
  DialogBackdrop,
  DialogBox,
  DialogClose,
} from "../dialog/dialog";

type AlertDialogProps = {
  id: string;
  title: string;
  description: string;
  confirm: string;
};

export const AlertDialog: Component<AlertDialogProps> = (props) => {
  return (
    <Dialog id={props.id}>
      <DialogBox>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <DialogActions>
          <DialogClose />
          <Button type="submit">{props.confirm}</Button>
        </DialogActions>
      </DialogBox>
      <DialogBackdrop />
    </Dialog>
  );
};
