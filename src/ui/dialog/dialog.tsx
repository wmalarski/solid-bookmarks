import { type Component, type ComponentProps, splitProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "../button/button";
import { twCx } from "../utils/tw-cva";

export type DialogProps = ComponentProps<"dialog"> & {
  id: string;
};

export const Dialog: Component<DialogProps> = (props) => {
  return <dialog {...props} class={twCx("modal", props.class)} />;
};

export type DialogTriggerProps = ComponentProps<typeof Button> & {
  for: string;
};

export const DialogTrigger: Component<DialogTriggerProps> = (props) => {
  const [forValue, withoutFor] = splitProps(props, ["for"]);

  const onClick: ComponentProps<"button">["onClick"] = () => {
    const id = `#${forValue.for}`;
    const dialog = document.querySelector<HTMLDialogElement>(id);
    dialog?.showModal();
  };

  return <Button type="button" onClick={onClick} {...withoutFor} />;
};

export type DialogBoxProps = ComponentProps<"div">;

export const DialogBox: Component<DialogBoxProps> = (props) => {
  return <div {...props} class={twCx("modal-box", props.class)} />;
};

export type DialogTitleProps = ComponentProps<"h3">;

export const DialogTitle: Component<DialogTitleProps> = (props) => {
  return <h3 {...props} class={twCx("text-xl pb-6", props.class)} />;
};

export type DialogBackdropProps = Record<string, never>;

export const DialogBackdrop: Component<DialogBackdropProps> = (props) => {
  const { t } = useI18n();

  return (
    <form method="dialog" class={twCx("modal-backdrop", props.class)}>
      <button type="submit">{t("common.closeDialog")}</button>
    </form>
  );
};

export type DialogCloseProps = Omit<ComponentProps<typeof Button>, "children">;

export const DialogClose: Component<DialogBackdropProps> = (props) => {
  const { t } = useI18n();

  return (
    <form method="dialog">
      <Button {...props}>{t("common.closeDialog")}</Button>
    </form>
  );
};

export type DialogActionsProps = ComponentProps<"div">;

export const DialogActions: Component<DialogActionsProps> = (props) => {
  return <div {...props} class={twCx("modal-action", props.class)} />;
};

export const closeDialog = (dialogId: string) => {
  document.querySelector<HTMLDialogElement>(`#${dialogId}`)?.close();
};
