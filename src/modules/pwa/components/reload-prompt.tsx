import { useRegisterSW } from "virtual:pwa-register/solid";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import styles from "./reload-prompt.module.css";

export const ReloadPrompt: Component = () => {
  const { t } = useI18n();

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisterError(error) {
      console.info("SW registration error", error);
    },
    onRegistered(r) {
      console.info(`SW Registered: ${r}`);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const onReloadClick = () => {
    updateServiceWorker(true);
  };

  const onCloseClick = () => {
    close();
  };

  return (
    <div class={styles.Container}>
      <Show when={offlineReady() || needRefresh()}>
        <div class={styles.Toast}>
          <div class={styles.Message}>
            <Show
              fallback={<span>{t("pwa.update")}</span>}
              when={offlineReady()}
            >
              <span>{t("pwa.readyOffline")}</span>
            </Show>
          </div>
          <Show when={needRefresh()}>
            <Button class={styles.ToastButton} onClick={onReloadClick}>
              {t("pwa.reload")}
            </Button>
          </Show>
          <Button class={styles.ToastButton} onClick={onCloseClick}>
            {t("common.closeDialog")}
          </Button>
        </div>
      </Show>
    </div>
  );
};
