import { useIsRouting } from "@solidjs/router";
import { type Component, Show } from "solid-js";
import { ClientOnly } from "~/ui/client-only/client-only";
import { Progress } from "~/ui/progress/progress";

const Client: Component = () => {
  const isRouting = useIsRouting();

  return (
    <Show when={isRouting()}>
      <Progress />
    </Show>
  );
};

export const PendingProcess: Component = () => {
  return (
    <ClientOnly>
      <Client />
    </ClientOnly>
  );
};
