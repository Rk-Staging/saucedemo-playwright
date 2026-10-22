import { test, expect } from '../fixtures/pages.fixture';
import data from '../test-data/users.json';

const { backpack, bikeLight } = data.products;
const { firstName, lastName, postalCode } = data.checkoutInfo;

test.describe('Checkout', () => {
  test('complete purchase with correct totals', async ({ loggedInPage, cartPage, checkoutPage }) => {
    // 1. Add two products and remember their prices
    await loggedInPage.addToCart(backpack);
    await loggedInPage.addToCart(bikeLight);
    const expectedSubtotal =
      (await loggedInPage.getPriceOf(backpack)) + (await loggedInPage.getPriceOf(bikeLight));

    // 2. Verify cart and go to checkout
    await loggedInPage.openCart();
    await cartPage.expectItems([backpack, bikeLight]);
    await cartPage.checkout();

    // 3. Fill customer info
    await checkoutPage.fillInfo(firstName, lastName, postalCode);

    // 4. Verify subtotal, tax (8%) and total
    const { subtotal, tax, total } = await checkoutPage.getTotals();
    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(tax).toBeCloseTo(subtotal * data.taxRate, 2);
    expect(total).toBeCloseTo(subtotal + tax, 2);

    // 5. Finish the order
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('missing first name shows error', async ({ loggedInPage, cartPage, checkoutPage }) => {
    await loggedInPage.addToCart(backpack);
    await loggedInPage.openCart();
    await cartPage.checkout();
    await checkoutPage.fillInfo('', lastName, postalCode);
    await expect(checkoutPage.errorMessage).toHaveText(data.errors.firstNameRequired);
  });
});
