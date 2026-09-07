import { test, expect } from "../fixtures/authFixture";

test.describe("home page", () => {
  test.beforeEach(async ({ login }) => {
    await login();
  });

  test("shows the welcome heading", async ({ homePage }) => {
    await expect(homePage.heading).toHaveText("Hello, its Playwright TS demo project");
  });
});
