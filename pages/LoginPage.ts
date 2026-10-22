import { Page, Locator, expect } from '@playwright/test';

// Page Object for the login screen
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByTestId('error');
  }

  // Open the login page (baseURL comes from config)
  async goto() {
    await this.page.goto('/');
  }

  // Fill credentials and click Login
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Assert the visible error text
  async expectError(text: string) {
    await expect(this.errorMessage).toHaveText(text);
  }
}
