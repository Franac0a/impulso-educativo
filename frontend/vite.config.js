import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite conexiones desde localhost o red local
    port: 5173, // Puerto del dev server
    strictPort: true, // Lanza error si el puerto ya está en uso
    hmr: {
      protocol: "ws", // Fuerza WebSocket
      host: "localhost", // Host para HMR
    },
  },
});
