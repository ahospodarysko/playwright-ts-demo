import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

// Demo credentials accepted by site/app.js.
export const VALID_USERNAME = "qa_name";
export const VALID_PASSWORD = "qa_pass";

type AuthFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  // Navigates to the login page and submits credentials (valid ones by default).
  login: (username?: string, password?: string) => Promise<void>;
};

// Extends the base Playwright test with page objects and a reusable login step,
// so specs don't have to construct LoginPage/HomePage or repeat the login flow.
export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  login: async ({ loginPage }, use) => {
    await use(async (username = VALID_USERNAME, password = VALID_PASSWORD) => {
      await loginPage.goto();
      await loginPage.login(username, password);
    });
  },
});

export { expect };
