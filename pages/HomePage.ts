import { Page } from "@playwright/test";
import { LoggerHelper } from "../helpers/loggerHelper";

// Page object for site/index.html: locators and actions for the CV/profile home page.
export class HomePage {
  readonly page: Page;
  readonly heading;
  readonly logoutButton;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByTestId("page-heading");
    this.logoutButton = page.getByTestId("logout-button");
  }

  async goto() {
    await LoggerHelper.logStep("navigate to home page");
    await this.page.goto("/");
  }

  async logout() {
    await LoggerHelper.logStep("logout");
    await this.logoutButton.click();
  }
}
