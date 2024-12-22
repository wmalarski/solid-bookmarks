/// <reference types="@solidjs/start/env" />
/// <reference types="vite-plugin-pwa/solid" />
/// <reference types="vite-plugin-pwa/info" />

interface ImportMetaEnv {
	DB_URL: string;
	DB_MIGRATIONS_URL: string;
	SITE_NAME: string;
	SESSION_SECRET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module 'virtual:pwa-register/solid' {
  import type { Accessor, Setter } from 'solid-js';
  import type { RegisterSWOptions } from 'vite-plugin-pwa/types';

  export type { RegisterSWOptions };

  export function useRegisterSW(options?: RegisterSWOptions): {
    needRefresh: [Accessor<boolean>, Setter<boolean>]
    offlineReady: [Accessor<boolean>, Setter<boolean>]
    updateServiceWorker: (reloadPage?: boolean) => Promise<void>
  }
}