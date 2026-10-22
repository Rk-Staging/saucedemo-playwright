import { test, expect } from '../fixtures/pages.fixture';
import data from '../test-data/users.json';

const PASSWORD = process.env.PASSWORD!;

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(process.env.STANDARD_USER!, PASSWORD);
    await inventoryPage.expectLoaded();
  });

  test('locked out user sees error', async ({ loginPage, page }) => {
    await loginPage.login(process.env.LOCKED_USER!, PASSWORD);
    await loginPage.expectError(data.errors.lockedOut);
    await expect(page).not.toHaveURL(/inventory/);
  });

  test('empty username shows error', async ({ loginPage }) => {
    await loginPage.login('', PASSWORD);
    await loginPage.expectError(data.errors.usernameRequired);
  });

  test('empty password shows error', async ({ loginPage }) => {
    await loginPage.login(process.env.STANDARD_USER!, '');
    await loginPage.expectError(data.errors.passwordRequired);
  });
});
