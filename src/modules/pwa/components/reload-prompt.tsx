import { useRegisterSW } from "virtual:pwa-register/solid";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import { Button } from "~/ui/button/button";
import styles from "./reload-prompt.module.css";

export const ReloadPrompt: Component = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.info(`SW Registered: ${r}`);
    },
    onRegisterError(error) {
      console.info("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div class={styles.Container}>
      <Show when={offlineReady() || needRefresh()}>
        <div class={styles.Toast}>
          <div class={styles.Message}>
            <Show
              fallback={
                <span>
                  New content available, click on reload button to update.
                </span>
              }
              when={offlineReady()}
            >
              <span>App ready to work offline</span>
            </Show>
          </div>
          <Show when={needRefresh()}>
            <Button
              class={styles.ToastButton}
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </Button>
          </Show>
          <Button class={styles.ToastButton} onClick={() => close()}>
            Close
          </Button>
        </div>
      </Show>
    </div>
  );
};
