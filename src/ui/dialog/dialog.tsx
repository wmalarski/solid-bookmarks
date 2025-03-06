import type { VariantProps } from "class-variance-authority";
import { type Component, type ComponentProps, splitProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "../button/button";
import { twCx } from "../utils/tw-cva";
import {
  modalActionRecipe,
  modalBackdropRecipe,
  modalBoxRecipe,
  modalRecipe,
} from "./dialog.recipe";

export type DialogProps = ComponentProps<"dialog"> &
  VariantProps<typeof modalRecipe> & {
    id: string;
  };

export const Dialog: Component<DialogProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, [
    "open",
    "horizontal",
    "vertical",
  ]);
  return (
    <dialog
      {...withoutVariants}
      class={modalRecipe({ class: props.class, ...variants })}
    />
  );
};

export type DialogTriggerProps = ComponentProps<typeof Button> & {
  for: string;
  onClick?: (event: MouseEvent) => void;
};

export const DialogTrigger: Component<DialogTriggerProps> = (props) => {
  const [forValue, withoutFor] = splitProps(props, ["for", "onClick"]);

  const onClick: ComponentProps<"button">["onClick"] = (event) => {
    props.onClick?.(event);
    const id = `#${forValue.for}`;
    const dialog = document.querySelector<HTMLDialogElement>(id);
    dialog?.showModal();
  };

  return <Button type="button" onClick={onClick} {...withoutFor} />;
};

export type DialogBoxProps = ComponentProps<"div">;

export const DialogBox: Component<DialogBoxProps> = (props) => {
  return <div {...props} class={modalBoxRecipe({ class: props.class })} />;
};

export type DialogTitleProps = ComponentProps<"h3">;

export const DialogTitle: Component<DialogTitleProps> = (props) => {
  return <h3 {...props} class={twCx("pb-6 text-xl", props.class)} />;
};

export type DialogBackdropProps = Record<string, never>;

export const DialogBackdrop: Component<DialogBackdropProps> = (props) => {
  const { t } = useI18n();

  return (
    <form method="dialog" class={modalBackdropRecipe({ class: props.class })}>
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
  return <div {...props} class={modalActionRecipe({ class: props.class })} />;
};

export const closeDialog = (dialogId: string) => {
  document.querySelector<HTMLDialogElement>(`#${dialogId}`)?.close();
};
