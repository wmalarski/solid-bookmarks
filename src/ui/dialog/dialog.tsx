import { css, type TokenamiStyle, type Variants } from "@tokenami/css";
import { splitProps, type Component, type ComponentProps } from "solid-js";
import { buttonSplitProps } from "../button/button";
import { buttonRecipe } from "../button/button.recipe";

export type DialogProps = TokenamiStyle<ComponentProps<"dialog">> & {
  id: string;
};

export const Dialog: Component<DialogProps> = (props) => {
  return (
    <dialog
      {...props}
      style={css(
        {
          /*
.modal-open, .modal:target, .modal-toggle:checked+.modal, .modal[open] {
    pointer-events: auto;
    visibility: visible;
    opacity: 1;
}
.modal {
    pointer-events: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    display: grid
;
    height: 100%;
    max-height: none;
    width: 100%;
    max-width: none;
    justify-items: center;
    padding: 0;
    opacity: 0;
    overscroll-behavior: contain;
    z-index: 999;
    background-color: transparent;
    color: inherit;
    transition-duration: .2s;
    transition-timing-function: cubic-bezier(0,0,.2,1);
    transition-property: transform, opacity, visibility;
    overflow-y: hidden;
*/
        },
        props.style,
      )}
    />
  );
};

export type DialogTriggerProps = TokenamiStyle<ComponentProps<"button">> &
  Variants<typeof buttonRecipe> & { for: string };

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
      style={buttonRecipe(variants, props.style)}
    />
  );
};

export type DialogBoxProps = TokenamiStyle<ComponentProps<"div">>;

export const DialogBox: Component<DialogBoxProps> = (props) => {
  return (
    <div
      {...props}
      style={css(
        {
          /*
.modal-box, .modal[open] .modal-box {
    --tw-translate-y: 0px;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.modal-box {
    max-height: calc(100vh - 5em);
    grid-column-start: 1;
    grid-row-start: 1;
    width: 91.666667%;
    max-width: 32rem;
    --tw-scale-x: .9;
    --tw-scale-y: .9;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    border-bottom-right-radius: var(--rounded-box, 1rem);
    border-bottom-left-radius: var(--rounded-box, 1rem);
    border-top-left-radius: var(--rounded-box, 1rem);
    border-top-right-radius: var(--rounded-box, 1rem);
    --tw-bg-opacity: 1;
    background-color: var(--fallback-b1, oklch(var(--b1) / var(--tw-bg-opacity)));
    padding: 1.5rem;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    transition-timing-function: cubic-bezier(0,0,.2,1);
    transition-duration: .2s;
    box-shadow: #00000040 0 25px 50px -12px;
    overflow-y: auto;
    overscroll-behavior: contain;

*/
        },
        props.style,
      )}
    />
  );
};

export type DialogBackdropProps = TokenamiStyle<Record<string, never>>;

export const DialogBackdrop: Component<DialogBackdropProps> = (props) => {
  return (
    <div
      {...props}
      style={css(
        {
          /*
    z-index: -1;
    grid-column-start: 1;
    grid-row-start: 1;
    display: grid
;
    align-self: stretch;
    justify-self: stretch;
    color: transparent;
  */
        },
        props.style,
      )}
    />
  );
};

export type DialogCloseProps = TokenamiStyle<ComponentProps<"button">> &
  Variants<typeof buttonRecipe>;

export const DialogClose: Component<DialogBackdropProps> = (props) => {
  const [variants, withoutVariants] = splitProps(props, buttonSplitProps);

  return (
    <form method="dialog">
      <button
        {...withoutVariants}
        style={buttonRecipe(variants, props.style)}
      />
    </form>
  );
};

export type DialogActionsProps = TokenamiStyle<ComponentProps<"div">>;

export const DialogActions: Component<DialogActionsProps> = (props) => {
  return (
    <div
      {...props}
      style={css(
        {
          /*
              display: flex
;
    margin-top: 1.5rem;
    justify-content: flex-end;
*/
        },
        props.style,
      )}
    />
  );
};
