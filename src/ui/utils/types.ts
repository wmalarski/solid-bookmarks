import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ValidComponent } from "solid-js";

export type ComponentVariantProps<
  T extends ValidComponent,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  Component extends (...args: any) => any,
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  Rest = {},
> = ComponentProps<T> & VariantProps<Component> & Rest;
