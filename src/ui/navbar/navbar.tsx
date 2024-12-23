import { css, type TokenamiStyle } from "@tokenami/css";
import type { Component, ComponentProps } from "solid-js";

export type NavbarProps = TokenamiStyle<ComponentProps<"nav">>;

export const Navbar: Component<NavbarProps> = (props) => {
  return <nav {...props} style={css({}, props.style)} />;
};

export type NavbarStartProps = TokenamiStyle<ComponentProps<"div">>;

export const NavbarStart = (props: NavbarStartProps) => {
  return <div {...props} style={css({}, props.style)} />;
};

export type NavbarCenterProps = TokenamiStyle<ComponentProps<"div">>;

export const NavbarCenter = (props: NavbarCenterProps) => {
  return <div {...props} style={css({}, props.style)} />;
};

export type NavbarEndProps = TokenamiStyle<ComponentProps<"div">>;

export const NavbarEnd = (props: NavbarEndProps) => {
  return <div {...props} style={css({}, props.style)} />;
};
