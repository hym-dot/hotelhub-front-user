import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
 plugins: [react()],
 server: {
  host: true,
  port: 5173,
  watch: {
   usePolling: true, // Docker에서 파일 변경 감지
  },
  proxy: {
   "/api": {
    target: "http://express-dev:3000",
    changeOrigin: true,
   },
  },
 },
 css: {
  devSourcemap: true,
  preprocessorOptions: {
   scss: {
    sourceMap: true,
    sourceMapContents: true,
   },
  },
 },
});
