import { defineConfig, devices } from "@playwright/test";
import { EnvHelper } from "./helpers/envHelper";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: EnvHelper.BASE_URL,
    trace: "retain-on-failure",
    headless: false,
    launchOptions: { slowMo: 500 },
  },
  webServer: {
    command: "node server.js",
    url: EnvHelper.BASE_URL,
    reuseExistingServer: !process.env.CI,
    env: { PORT: new URL(EnvHelper.BASE_URL).port },
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices[`Desktop ${EnvHelper.BROWSER === "webkit" ? "Safari" : "Chrome"}`] },
    },
  ],
});
