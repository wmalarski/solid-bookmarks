import { defineConfig } from "@solidjs/start/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  ssr: false,
  server: { https: true },
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
          short_name: "Bookmarks",
          description: "Solid Bookmarks description",
          theme_color: "#ff04aa",
          background_color: "#ffffff",
          display: "standalone",
          scope: "/",
          start_url: "/",
          orientation: "portrait",
          display_override: ["standalone"],
          screenshots: [
            {
              sizes: "512x512",
              src: "pwa-512x512.png",
              form_factor: "narrow",
              type: "image/png",
            },
            {
              sizes: "512x512",
              src: "pwa-512x512.png",
              form_factor: "wide",
              type: "image/png",
            },
          ],
          icons: ["48", "72", "128", "144", "152", "192", "512"].map(
            (size) => ({
              src: `/icons/pwa-${size}x${size}.png`,
              sizes: `${size}x${size}`,
              type: "image/png",
            }),
          ),
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
