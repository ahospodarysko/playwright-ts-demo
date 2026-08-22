import { test, expect } from "../fixtures/authFixture";

test.describe("home page", () => {
  test.beforeEach(async ({ login }) => {
    await login();
  });

  test("shows the profile summary and tech stack", async ({ page }) => {
    await expect(page.getByTestId("summary-text")).toContainText("QA Automation Engineer");
    await expect(page.getByText("Selenium, Selenide, Playwright, RestAssured")).toBeVisible();
  });
});
