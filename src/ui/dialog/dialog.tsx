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
  const [split, rest] = splitProps(withoutVariants, ["for"]);

  const onClick: ComponentProps<"button">["onClick"] = () => {
    document.querySelector<HTMLDialogElement>(split.for)?.showModal();
  };

  return (
    <button
      onClick={onClick}
      {...rest}
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

export type DialogCloseProps = ComponentProps<"button"> &
  VariantProps<typeof buttonRecipe>;

export const DialogClose: Component<DialogBackdropProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, buttonSplitProps);

  return (
    <form method="dialog">
      <button
        {...withoutVariants}
        class={buttonRecipe({ ...variants, class: props.class })}
      />
    </form>
  );
};

export type DialogActionsProps = ComponentProps<"div">;

export const DialogActions: Component<DialogActionsProps> = (props) => {
  return <div {...props} class={twCx("modal-action", props.class)} />;
};
