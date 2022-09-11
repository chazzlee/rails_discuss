import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { MantineProvider } from "@mantine/core";

const currentPath = window.location.pathname;
if (!currentPath.startsWith("/auth")) {
  createInertiaApp({
    resolve: (name) => import(`../pages/${name}`),
    setup: ({ el, App, props }) => {
      const root = createRoot(el);
      root.render(
        <React.StrictMode>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <App {...props} />
          </MantineProvider>
        </React.StrictMode>
      );
    },
  });

  InertiaProgress.init();
}

console.log("Vite ⚡️ Rails");
