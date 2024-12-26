import { Show, type Component } from "solid-js";
import { Button, type ButtonProps } from "../button/button";
import {
  Dialog,
  DialogActions,
  DialogBackdrop,
  DialogBox,
  DialogClose,
} from "../dialog/dialog";
import { FormError } from "../form-error/form-error";

type AlertDialogProps = {
  id: string;
  title: string;
  description?: string;
  confirm: string;
  confirmColor?: ButtonProps["color"];
  pending?: boolean;
  errorMessage?: string;
};

export const AlertDialog: Component<AlertDialogProps> = (props) => {
  return (
    <Dialog id={props.id}>
      <DialogBox>
        <h3>{props.title}</h3>
        <Show when={props.description}>
          <p>{props.description}</p>
        </Show>
        <FormError message={props.errorMessage} />
        <DialogActions>
          <DialogClose />
          <Button
            type="submit"
            color={props.confirmColor}
            disabled={props.pending}
            isLoading={props.pending}
          >
            {props.confirm}
          </Button>
        </DialogActions>
      </DialogBox>
      <DialogBackdrop />
    </Dialog>
  );
};
