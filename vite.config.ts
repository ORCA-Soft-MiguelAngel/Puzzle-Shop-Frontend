import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/layouts": path.resolve(__dirname, "./src/components/layouts"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/contexts": path.resolve(__dirname, "./src/contexts"),
    },
  },
  plugins: [react()],
});
