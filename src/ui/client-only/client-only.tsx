import {
  type Component,
  createSignal,
  onMount,
  type ParentProps,
  Show,
} from "solid-js";

export const ClientOnly: Component<ParentProps> = (props) => {
  const [isMounted, setIsMounted] = createSignal(false);

  onMount(() => {
    setIsMounted(true);
  });

  return <Show when={isMounted()}>{props.children}</Show>;
};
