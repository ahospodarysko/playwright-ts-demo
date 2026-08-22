import { Page } from "@playwright/test";
import { LoggerHelper } from "../helpers/loggerHelper";

// Page object for site/login.html: locators and actions for signing in.
export class LoginPage {
  readonly page: Page;
  readonly usernameInput;
  readonly passwordInput;
  readonly submitButton;
  readonly errorMessage;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId("username-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("login-submit");
    this.errorMessage = page.getByTestId("login-error");
  }

  async goto() {
    LoggerHelper.logStep("navigate to login page");
    await this.page.goto("/login.html");
  }

  async login(username: string, password: string) {
    LoggerHelper.logStep(`login as ${username}`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
