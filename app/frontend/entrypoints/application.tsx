import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";

createInertiaApp({
  resolve: (name) => import(`../pages/${name}`),
  setup: ({ el, App, props }) => {
    const root = createRoot(el);
    root.render(
      <React.StrictMode>
        <App {...props} />
      </React.StrictMode>
    );
  },
});

InertiaProgress.init();

console.log("Vite ⚡️ Rails");
