import { defineConfig } from "@solidjs/start/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	ssr: false,
	vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				injectRegister: null,
				workbox: {},
				devOptions: { enabled: true },
				includeAssets: ["favicon.ico"],
				manifest: {
					name: "Solid Bookmarks",
					short_name: "SolidBookmarks",
					description: "Solid Bookmarks description",
					theme_color: "#ffffff",
					display: "standalone",
					start_url: "/",
					orientation: "portrait",
					display_override: ["standalone"],
					share_target: {
						action: "/share-target/",
						enctype: "multipart/form-data",
						method: "POST",
						params: { title: "title", text: "text", url: "url" },
					},
				},
			}),
		],
	},
});
