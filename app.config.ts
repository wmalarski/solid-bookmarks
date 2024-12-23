import { defineConfig } from "@solidjs/start/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  middleware: "./src/middleware.ts",
  server: {
    // https: true,
    preset: "cloudflare-pages",
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        devOptions: { enabled: true },
        includeAssets: ["favicon.ico"],
        manifest: {
          name: "Solid Bookmarks",
          short_name: "Bookmarks",
          description: "Solid Bookmarks description",
          theme_color: "#ffffff",
          background_color: "#000000",
          display: "standalone",
          scope: "/",
          start_url: "/",
          orientation: "portrait",
          display_override: ["standalone"],
          screenshots: [
            {
              sizes: "512x512",
              src: "/icons/pwa-512x512.png",
              form_factor: "narrow",
              type: "image/png",
            },
            {
              sizes: "512x512",
              src: "/icons/pwa-512x512.png",
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
            action: "/api/share/",
            enctype: "multipart/form-data",
            method: "POST",
            params: { title: "title", text: "text", url: "url", files: [] },
          },
        },
      }),
    ],
  },
});
