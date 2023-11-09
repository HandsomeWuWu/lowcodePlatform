import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index", wrappers: [
      'wrappers/auth',
    ]
    },
    { path: "/login", component: "Login/index" },
    { path: "/docs", component: "docs" },
  ],
  npmClient: 'pnpm',
});
