// @refresh reload
import { MetaProvider } from "@solidjs/meta";
import { createAsync, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import { getUserLoader } from "./modules/auth/client";
import { UserProvider } from "./modules/auth/contexts/user-context";
import { ErrorFallback } from "./modules/common/components/error-fallback";
import { Head } from "./modules/common/components/head";
import { I18nContextProvider } from "./modules/common/contexts/i18n";
import { ReloadPrompt } from "./modules/pwa/components/reload-prompt";

export default function App() {
  const user = createAsync(() => getUserLoader());

  return (
    <Router
      root={(props) => (
        <I18nContextProvider>
          <MetaProvider>
            <Head />
            <ErrorBoundary fallback={ErrorFallback}>
              <UserProvider user={user()}>
                <Suspense>{props.children}</Suspense>
              </UserProvider>
              <ReloadPrompt />
            </ErrorBoundary>
          </MetaProvider>
        </I18nContextProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
