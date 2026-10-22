import { Page, Locator, expect } from '@playwright/test';

// Page Object for the cart screen
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async expectItems(names: string[]) {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.page.getByTestId('inventory-item-name')).toHaveText(names);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
