import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('textbox', { name: 'Email' })
    .fill(process.env.TEST_USER_EMAIL!);

  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.TEST_USER_PASSWORD!);

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(
    page.getByText('My Data Room', { exact: true })
  ).toBeVisible();

  await page.context().storageState({
    path: 'playwright/.auth/user.json',
  });
});