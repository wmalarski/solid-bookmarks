import { css, type TokenamiStyle, type Variants } from "@tokenami/css";
import { type Component, type ComponentProps, splitProps } from "solid-js";

const checkboxRecipe = css.compose({
  /*
.checkbox:checked, .checkbox[aria-checked=true] {
    background-repeat: no-repeat;
    animation: checkmark var(--animation-input, .2s) ease-out;
    background-color: var(--chkbg);
    background-image: linear-gradient(-45deg, transparent 65%, var(--chkbg) 65.99%), linear-gradient(45deg, transparent 75%, var(--chkbg) 75.99%), linear-gradient(-45deg, var(--chkbg) 40%, transparent 40.99%), linear-gradient(45deg, var(--chkbg) 30%, var(--chkfg) 30.99%, var(--chkfg) 40%, transparent 40.99%), linear-gradient(-45deg, var(--chkfg) 50%, var(--chkbg) 50.99%);
}

.checkbox:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 2px;
    outline-color: var(--fallback-bc, oklch(var(--bc) / 1));
}
.checkbox:focus {
    box-shadow: none;
}

    flex-shrink: 0;
    --chkbg: var(--fallback-bc, oklch(var(--bc) / 1));
    --chkfg: var(--fallback-b1, oklch(var(--b1) / 1));
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: var(--rounded-btn, .5rem);
    border-width: 1px;
    border-color: var(--fallback-bc, oklch(var(--bc) / var(--tw-border-opacity)));
    --tw-border-opacity: .2;

font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
*/

  variants: {
    variant: {
      bordered: {},
    },
    size: {
      xs: { "--height": 4, "--width": 4 },
      sm: { "--height": 5, "--width": 5 },
      md: { "--height": 6, "--width": 6 },
      lg: { "--height": 8, "--width": 8 },
    },
  },
});

export type CheckboxProps = TokenamiStyle<ComponentProps<"input">> &
  Variants<typeof checkboxRecipe>;

export const Checkbox: Component<CheckboxProps> = (props) => {
  const [split, rest] = splitProps(props, ["size"]);

  return (
    <input
      {...rest}
      type="checkbox"
      style={checkboxRecipe(split, props.style)}
    />
  );
};
