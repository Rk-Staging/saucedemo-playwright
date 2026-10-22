import { test, expect } from '../fixtures/pages.fixture';
import data from '../test-data/users.json';

const { backpack, bikeLight, boltTShirt } = data.products;

test.describe('Inventory', () => {
  test('sort by price low to high', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('lohi');
    const prices = await loggedInPage.getPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sort by name Z to A', async ({ loggedInPage }) => {
    await loggedInPage.sortBy('za');
    const names = await loggedInPage.itemNames.allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('add items updates cart badge', async ({ loggedInPage }) => {
    await loggedInPage.expectCartCount(0);
    await loggedInPage.addToCart(backpack);
    await loggedInPage.addToCart(bikeLight);
    await loggedInPage.addToCart(boltTShirt);
    await loggedInPage.expectCartCount(3);
  });

  test('remove item decreases cart badge', async ({ loggedInPage }) => {
    await loggedInPage.addToCart(backpack);
    await loggedInPage.addToCart(bikeLight);
    await loggedInPage.removeFromCart(backpack);
    await loggedInPage.expectCartCount(1);
    await loggedInPage.removeFromCart(bikeLight);
    await loggedInPage.expectCartCount(0);
  });

  test('cart page lists added items', async ({ loggedInPage, cartPage }) => {
    await loggedInPage.addToCart(backpack);
    await loggedInPage.addToCart(boltTShirt);
    await loggedInPage.openCart();
    await cartPage.expectItems([backpack, boltTShirt]);
  });
});
