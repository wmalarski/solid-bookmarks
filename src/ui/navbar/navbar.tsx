import type { Component, ComponentProps } from "solid-js";
import { twCx } from "../utils/tw-cva";

export type NavbarProps = ComponentProps<"nav">;

export const Navbar: Component<NavbarProps> = (props) => {
  return <nav {...props} class={twCx("navbar justify-between", props.class)} />;
};

export type NavbarStartProps = ComponentProps<"div">;

export const NavbarStart = (props: NavbarStartProps) => {
  return (
    <div {...props} class={twCx("navbar-start w-fit flex-wrap", props.class)} />
  );
};

export type NavbarEndProps = ComponentProps<"div">;

export const NavbarEnd = (props: NavbarEndProps) => {
  return <div {...props} class={twCx("navbar-end gap-2", props.class)} />;
};
