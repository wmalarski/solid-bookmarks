import type { Component } from "solid-js";
import type { ComponentVariantProps } from "../utils/types";
import {
  navbarEndRecipe,
  navbarRecipe,
  navbarStartRecipe,
} from "./navbar.recipe";

type NavbarProps = ComponentVariantProps<"nav", typeof navbarRecipe>;

export const Navbar: Component<NavbarProps> = (props) => {
  return <nav {...props} class={navbarRecipe({ class: props.class })} />;
};

type NavbarStartProps = ComponentVariantProps<"div", typeof navbarStartRecipe>;

export const NavbarStart = (props: NavbarStartProps) => {
  return <div {...props} class={navbarStartRecipe({ class: props.class })} />;
};

type NavbarEndProps = ComponentVariantProps<"div", typeof navbarEndRecipe>;

export const NavbarEnd = (props: NavbarEndProps) => {
  return <div {...props} class={navbarEndRecipe({ class: props.class })} />;
};
