// @refresh reload
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import { ErrorFallback } from "./modules/common/components/error-fallback";
import { Head } from "./modules/common/components/head";
import { I18nContextProvider } from "./modules/common/contexts/i18n";
import { ReloadPrompt } from "./modules/pwa/components/reload-prompt";

export default function App() {
	// useRegisterSW({
	// 	immediate: true,
	// 	onNeedRefresh: (...event) => {
	// 		console.log("onNeedRefresh", ...event);
	// 	},
	// 	onOfflineReady: (...event) => {
	// 		console.log("onOfflineReady", ...event);
	// 	},
	// 	onRegisteredSW: (...event) => {
	// 		console.log("onRegisteredSW", ...event);
	// 	},
	// 	onRegisterError: (...event) => {
	// 		console.log("onRegisterError", ...event);
	// 	},
	// });

	return (
		<Router
			root={(props) => (
				<I18nContextProvider>
					<MetaProvider>
						<Head />
						<ErrorBoundary fallback={ErrorFallback}>
							<Suspense>{props.children}</Suspense>
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
