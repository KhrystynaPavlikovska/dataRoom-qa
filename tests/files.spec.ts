import { test, expect } from '@playwright/test';
import path from 'node:path';
import { DataRoomPage } from '../pages/DataRoomPage';
import { resolve } from 'node:path';

test('User can upload a PDF file', async ({ page }) => {
  const dataRoomPage = new DataRoomPage(page);

  await page.goto('/');

  await dataRoomPage.openMyDataRoom();

  const fileName = 'Lorem ipsum.pdf';
  const filePath = path.resolve(
    process.cwd(),
    'test-data',
    fileName
  );

  await dataRoomPage.uploadFile(filePath);

  await expect(
    page.getByRole('cell', {
      name: fileName,
      exact: true,
    })
  ).toBeVisible();
});


test('User can rename an uploaded file', async ({ page }) => {
  const dataRoomPage = new DataRoomPage(page);

  await page.goto('/');
  await dataRoomPage.openMyDataRoom();

  const originalName = 'text.pdf';
  const newName = `renamed-test-${Date.now()}.pdf`;

  await dataRoomPage.uploadFileWithName(
    resolve('test-data', 'text.pdf'),
    originalName
  );

  await expect(
    page.getByRole('cell', {
      name: originalName,
      exact: true,
    })
  ).toBeVisible();

  await dataRoomPage.renameFile(originalName, newName);

  await expect(
    page.getByRole('cell', {
      name: newName,
      exact: true,
    })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', {
      name: originalName,
      exact: true,
    })
  ).toHaveCount(0);

});

test('User can delete an uploaded file', async ({ page }) => {
  const dataRoomPage = new DataRoomPage(page);

  await page.goto('/');
  await dataRoomPage.openMyDataRoom();

  const fileName = `delete-test-${Date.now()}.pdf`;

  await dataRoomPage.uploadFileWithName(
    resolve('test-data', 'text.pdf'),
    fileName
  );

  const fileCell = page.getByRole('cell', {
    name: fileName,
    exact: true,
  });
  await expect(fileCell).toBeVisible();

  await dataRoomPage.deleteFile(fileName);

  await expect(fileCell).toHaveCount(0);
});