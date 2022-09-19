import { defineConfig } from "vite";
import RubyPlugin from "vite-plugin-ruby";
import ReactPlugin from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    https: {
      key: "/home/chazz/.certs/localhost-key.pem",
      cert: "/home/chazz/.certs/localhost.pem",
    },
    host: "localhost",
    hmr: { host: "localhost" },
  },
  plugins: [RubyPlugin(), ReactPlugin()],
});
