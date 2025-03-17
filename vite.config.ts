import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const proxyUrl = "https://93.188.85.234:4443";

const proxyConfig = {
  target: proxyUrl,
  changeOrigin: true,
  secure: false,
};

const proxyPaths = ["/api", "/uploads"];

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: Object.fromEntries(proxyPaths.map((path) => [path, proxyConfig])),
  },
});
