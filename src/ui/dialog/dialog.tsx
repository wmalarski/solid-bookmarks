import type { VariantProps } from "class-variance-authority";
import { splitProps, type Component, type ComponentProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { buttonSplitProps } from "../button/button";
import { buttonRecipe } from "../button/button.recipe";
import { twCx } from "../utils/tw-cva";

export type DialogProps = ComponentProps<"dialog"> & {
  id: string;
};

export const Dialog: Component<DialogProps> = (props) => {
  return <dialog {...props} class={twCx("modal", props.class)} />;
};

export type DialogTriggerProps = ComponentProps<"button"> &
  VariantProps<typeof buttonRecipe> & { for: string };

export const DialogTrigger: Component<DialogTriggerProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, buttonSplitProps);
  const [forValue, withoutFor] = splitProps(withoutVariants, ["for"]);

  const onClick: ComponentProps<"button">["onClick"] = () => {
    const id = `#${forValue.for}`;
    const dialog = document.querySelector<HTMLDialogElement>(id);
    dialog?.showModal();
  };

  return (
    <button
      onClick={onClick}
      {...withoutFor}
      class={buttonRecipe({ ...variants, class: props.class })}
    />
  );
};

export type DialogBoxProps = ComponentProps<"div">;

export const DialogBox: Component<DialogBoxProps> = (props) => {
  return <div {...props} class={twCx("modal-box", props.class)} />;
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

export type DialogCloseProps = Omit<ComponentProps<"button">, "children"> &
  VariantProps<typeof buttonRecipe>;

export const DialogClose: Component<DialogBackdropProps> = (props) => {
  const { t } = useI18n();

  const [variants, withoutVariants] = splitProps(props, buttonSplitProps);

  return (
    <form method="dialog">
      <button
        {...withoutVariants}
        class={buttonRecipe({ ...variants, class: props.class })}
      >
        {t("common.closeDialog")}
      </button>
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
