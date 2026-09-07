import { test, expect, VALID_USERNAME, VALID_PASSWORD } from "../fixtures/authFixture";

test.describe("login", () => {
  test("redirects to the home page on valid credentials", async ({ page, login, homePage }) => {
    await login(VALID_USERNAME, VALID_PASSWORD);

    await expect(page).toHaveURL(/index\.html/);
    await expect(homePage.heading).toHaveText("Hello, its Playwright TS demo project");
  });

  test("shows an error on invalid credentials", async ({ page, login, loginPage }) => {
    await login("wrong_user", "wrong_pass");

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText("Invalid username or password");
    await expect(page).toHaveURL(/login\.html/);
  });
});
