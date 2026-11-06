import { test, expect } from '@playwright/test';

async function skipInitialIntro(page) {
  await page.addInitScript(() => sessionStorage.setItem('kuro-intro-seen', '1'));
}

async function expectNoOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
}

test('every page, product route, and missing page renders without browser errors', async ({ page }) => {
  await skipInitialIntro(page);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const routes = [
    ['/', /WEAR THE/],
    ['/collections', /THE\s*COLLECTION/],
    ['/about', /NOT MADE TO/],
    ['/contact', /LET’S MAKE/],
    ['/products/void-oversized-tee', /VOID OVERSIZED TEE/],
    ['/products/signal-heavyweight-hoodie', /SIGNAL HEAVYWEIGHT HOODIE/],
    ['/products/district-graphic-tee', /DISTRICT GRAPHIC TEE/],
    ['/products/ash-oversized-sweatshirt', /ASH OVERSIZED SWEATSHIRT/],
    ['/products/afterhours-hoodie', /AFTERHOURS HOODIE/],
    ['/products/static-graphic-tee', /STATIC GRAPHIC TEE/],
    ['/does-not-exist', /OUTSIDE/],
    ['/products/missing-piece', /PIECE NOT FOUND/],
  ];
  for (const [route, title] of routes) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
    await expectNoOverflow(page);
  }
  expect(errors).toEqual([]);
});

test('collection filters, search, sort, no-results reset, and quick view work', async ({ page }) => {
  await skipInitialIntro(page);
  await page.goto('/collections');
  const cards = page.locator('.commerce-product-grid .commerce-product-card');
  await expect(cards).toHaveCount(6);
  await page.getByRole('button', { name: /^Hoodies/ }).click();
  await expect(cards).toHaveCount(2);
  await expect(page).toHaveURL(/category=Hoodies/);
  await page.getByRole('button', { name: /^All pieces/ }).click();
  await page.getByRole('combobox', { name: 'Sort products' }).selectOption('price-desc');
  await expect(cards.first().getByRole('heading')).toHaveText('AFTERHOURS HOODIE');
  await page.getByRole('combobox', { name: 'Sort products' }).selectOption('price-asc');
  await expect(cards.first().getByRole('heading')).toHaveText('VOID OVERSIZED TEE');
  await page.getByRole('textbox', { name: 'Search products' }).fill('void');
  await expect(cards).toHaveCount(1);
  await cards.first().getByRole('button', { name: 'Quick view VOID OVERSIZED TEE' }).click();
  const quick = page.getByRole('dialog', { name: 'VOID OVERSIZED TEE' });
  await expect(quick).toBeVisible();
  await expect(quick.getByRole('button', { name: 'SELECT A SIZE' })).toBeDisabled();
  await quick.getByRole('button', { name: 'M', exact: true }).click();
  await quick.getByRole('button', { name: /ADD TO BAG/ }).click();
  await expect(quick).toHaveCount(0);
  const bag = page.getByRole('dialog', { name: /Shopping bag/ });
  await expect(bag).toBeVisible();
  await expect(bag).toContainText('Washed black / M');
  await bag.getByRole('button', { name: 'Close shopping bag' }).click();
  await page.getByRole('textbox', { name: 'Search products' }).fill('nothing-matches-this');
  await expect(cards).toHaveCount(0);
  await expect(page.getByText('NO SIGNAL.')).toBeVisible();
  await page.getByRole('button', { name: 'RESET FILTERS' }).click();
  await expect(cards).toHaveCount(6);
});

test('gallery, variants, quantities, persistent bag, removal, and honest checkout preview work', async ({ page }) => {
  await skipInitialIntro(page);
  await page.goto('/products/void-oversized-tee');
  await page.getByRole('button', { name: 'Show back view' }).click();
  await expect(page.locator('.commerce-gallery-main img')).toHaveAttribute('src', '/images/void-tee-back.svg');
  await page.getByRole('button', { name: 'Show front view' }).click();
  await expect(page.locator('.commerce-gallery-main img')).toHaveAttribute('src', '/images/void-tee.svg');
  await page.getByRole('button', { name: 'SIZE GUIDE', exact: true }).click();
  await expect(page.getByRole('table')).toBeVisible();
  await page.getByRole('button', { name: 'L', exact: true }).click();
  await page.getByRole('button', { name: 'Increase quantity', exact: true }).click();
  await expect(page.getByRole('button', { name: /ADD TO BAG/ })).toContainText('$96.00');
  await page.getByRole('button', { name: /ADD TO BAG/ }).click();
  let bag = page.getByRole('dialog', { name: /Shopping bag/ });
  await expect(bag.getByRole('heading', { name: 'Shopping bag (2)' })).toBeVisible();
  await bag.getByRole('button', { name: 'Increase quantity of VOID OVERSIZED TEE' }).click();
  await expect(bag.getByRole('heading', { name: 'Shopping bag (3)' })).toBeVisible();
  await bag.getByRole('button', { name: 'Decrease quantity of VOID OVERSIZED TEE' }).click();
  await bag.getByRole('button', { name: 'Close shopping bag' }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Open shopping bag, 2 items' }).click();
  bag = page.getByRole('dialog', { name: /Shopping bag/ });
  await expect(bag).toContainText('Washed black / L');
  await expect(bag.locator('.commerce-cart-total')).toContainText('$96.00');
  await bag.getByRole('button', { name: 'Preview checkout' }).click();
  await expect(bag).toContainText('Demo checkout — no payment is collected and no order is placed.');
  await expect(bag.locator('.commerce-cart-total')).toContainText('$96.00');
  await bag.getByRole('button', { name: 'Return to bag' }).click();
  await bag.getByRole('button', { name: 'Remove VOID OVERSIZED TEE from bag' }).click();
  await expect(bag.getByRole('heading', { name: 'A blank canvas.' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(bag).toHaveCount(0);
});

test('header navigation and search reach the expected route', async ({ page }) => {
  await skipInitialIntro(page);
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation', exact: true });
  await nav.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL('/about');
  await nav.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL('/contact');
  await page.getByRole('button', { name: 'Search collection' }).click();
  const search = page.getByRole('dialog', { name: 'Search collection', exact: true });
  await search.getByRole('textbox').fill('signal');
  await search.getByRole('button', { name: 'Submit search' }).click();
  await expect(page).toHaveURL(/\/collections\?q=signal/);
  await expect(page.locator('.commerce-product-grid .commerce-product-card')).toHaveCount(1);
});

test('contact and newsletter validate and explicitly save local demo drafts', async ({ page }) => {
  await skipInitialIntro(page);
  await page.goto('/contact');
  await page.getByLabel('NAME', { exact: false }).fill('Night Visitor');
  await page.getByLabel('EMAIL', { exact: false }).first().fill('visitor@example.com');
  await page.getByLabel('SUBJECT', { exact: false }).selectOption('Collaboration');
  await page.getByLabel('MESSAGE', { exact: false }).fill('An original idea for the next collection.');
  await page.getByRole('button', { name: 'SAVE MESSAGE DRAFT' }).click();
  await expect(page.getByRole('status')).toContainText('This demo has not sent your message.');
  await page.reload();
  await expect(page.getByLabel('NAME', { exact: false })).toHaveValue('Night Visitor');
  await expect(page.getByLabel('MESSAGE', { exact: false })).toHaveValue('An original idea for the next collection.');
  await page.getByLabel('Your email. Our next transmission.').fill('subscriber@example.com');
  await page.getByRole('button', { name: 'Join the newsletter' }).click();
  await expect(page.getByRole('status')).toContainText('This demo has not subscribed you to a mailing list.');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('kuro-newsletter-interest')).email)).toBe('subscriber@example.com');
});

test('mobile navigation, cart and all main layouts fit a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await skipInitialIntro(page);
  await page.goto('/');
  await expectNoOverflow(page);
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const menu = page.getByRole('dialog', { name: 'Navigation', exact: true });
  await expect(menu).toBeVisible();
  await menu.getByRole('link', { name: /Collection/ }).click();
  await expect(page).toHaveURL('/collections');
  await expect(menu).toHaveCount(0);
  await expectNoOverflow(page);
  await page.getByRole('button', { name: /^Hoodies/ }).click();
  await expect(page.locator('.commerce-product-grid .commerce-product-card')).toHaveCount(2);
  for (const route of ['/products/void-oversized-tee', '/about', '/contact']) {
    await page.goto(route);
    await expectNoOverflow(page);
  }
  await page.getByRole('button', { name: 'Open shopping bag, 0 items' }).click();
  await expect(page.getByRole('dialog', { name: /Shopping bag/ })).toBeVisible();
  await expectNoOverflow(page);
});

test('intro uses four panels, supports skipping, stays dismissed, and can replay', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const intro = page.getByRole('dialog', { name: 'Kuro District cinematic introduction' });
  await expect(intro).toBeVisible();
  await expect(intro.locator('.intro-panel')).toHaveCount(4);
  await intro.getByRole('button', { name: 'Skip intro' }).click();
  await expect(intro).toHaveCount(0);
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'About' }).click();
  await expect(intro).toHaveCount(0);
  await page.goto('/intro');
  await expect(intro).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(intro).toHaveCount(0);
  await expect(page).toHaveURL('/');
});

test('reduced-motion intro completes without requiring interaction', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('dialog', { name: 'Kuro District cinematic introduction' })).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('WEAR THE');
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});
