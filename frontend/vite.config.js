import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    const proxyTarget = env.VITE_PROXY_TARGET || "http://localhost:3000";

    return {
        plugins: [react()],
        server: {
            host: true,
            port: 5173,
            watch: {
                usePolling: true, // Docker 환경에서 파일 변경 감지 안정화
            },
            proxy: {
                "/api": {
                    target: proxyTarget,
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
    };
});
