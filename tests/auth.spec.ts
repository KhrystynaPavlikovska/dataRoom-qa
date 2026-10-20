import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test('User can sign in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.signIn(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );

  await expect(loginPage.signInButton).not.toBeVisible();
});
