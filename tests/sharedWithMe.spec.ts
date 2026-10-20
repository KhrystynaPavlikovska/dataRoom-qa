import { expect, test } from '@playwright/test';
import { resolve } from 'node:path';
import { DataRoomPage } from '../pages/DataRoomPage';
import { LoginPage } from '../pages/LoginPage';
import { SharedWithMePage } from '../pages/SharedWithMePage';

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test('Recipient can download a file shared with them', async ({ page }) => {
  const dataRoomPage = new DataRoomPage(page);
  const loginPage = new LoginPage(page);
  const sharedWithMePage = new SharedWithMePage(page);
  const recipientEmail = process.env.TEST_USER_EMAIL!;

  await loginPage.open();
  await loginPage.signIn(
    process.env.VIEWER_EMAIL!,
    process.env.VIEWER_PASSWORD!
  );

  await expect(
    page.getByText('My Data Room', { exact: true })
  ).toBeVisible();

  const fileName = `shared-test-${Date.now()}.pdf`;
  await dataRoomPage.uploadFileWithName(
    resolve('test-data', 'text.pdf'),
    fileName
  );

  const uploadedFile = page.getByRole('cell', {
    name: fileName,
    exact: true,
  });
  await expect(uploadedFile).toBeVisible();
  await dataRoomPage.shareFile(fileName, recipientEmail);

  await page.getByRole('button', { name: 'Sign out' }).click();
  await loginPage.open();
  await loginPage.signIn(
    recipientEmail,
    process.env.TEST_USER_PASSWORD!
  );
  await expect(
    page.getByRole('link', { name: 'Shared with me' })
  ).toBeVisible();

  await sharedWithMePage.open();
  await sharedWithMePage.expectFileVisible(fileName);
  await sharedWithMePage.openFile(fileName);

  const downloadPromise = page.waitForEvent('download');
  await sharedWithMePage.downloadFile();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(fileName);
});
