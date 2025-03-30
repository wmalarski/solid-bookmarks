import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  middleware: "./src/middleware.ts",
  server: {
    // preset: "cloudflare-pages",
  },
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        includeAssets: ["favicon.ico"],
        manifest: {
          background_color: "#1c1917",
          description: "Solid Bookmarks description",
          display: "standalone",
          display_override: ["standalone"],
          icons: ["48", "72", "128", "144", "152", "192", "512"].map(
            (size) => ({
              sizes: `${size}x${size}`,
              src: `/icons/pwa-${size}x${size}.png`,
              type: "image/png",
            }),
          ),
          name: "Solid Bookmarks",
          orientation: "portrait",
          scope: "/",
          screenshots: [
            {
              form_factor: "narrow",
              sizes: "512x512",
              src: "/icons/pwa-512x512.png",
              type: "image/png",
            },
            {
              form_factor: "wide",
              sizes: "512x512",
              src: "/icons/pwa-512x512.png",
              type: "image/png",
            },
          ],
          share_target: {
            action: "/share/",
            method: "GET",
            params: { files: [], text: "text", title: "title", url: "url" },
          },
          short_name: "Bookmarks",
          start_url: "/",
          theme_color: "#1c1917",
        },
        registerType: "autoUpdate",
      }),
    ],
  },
});
