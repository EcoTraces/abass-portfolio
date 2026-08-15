import { test, expect } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';

test.describe('Portfolio smoke tests', () => {
  test('homepage loads and navigation works', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveTitle(/Abass David Komeh/);
    await page.locator('header a[href="#projects"]').click();
    await expect(page).toHaveURL(/#projects$/);
  });

  test('resume page resolves', async ({ page }) => {
    await page.goto(`${baseUrl}/resume`);
    await expect(page.locator('text=View Resume')).toBeVisible();
  });

  test('blog page resolves', async ({ page }) => {
    await page.goto(`${baseUrl}/blog`);
    await expect(page.locator('text=Writing')).toBeVisible();
  });
});
