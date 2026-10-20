
import { test, expect } from '@playwright/test';
import { DataRoomPage } from '../pages/DataRoomPage';

test('User can create a folder', async ({ page }) => {
  const dataRoomPage = new DataRoomPage(page);
   
  await page.goto('/');

  await dataRoomPage.openMyDataRoom();

  const folderName = `Test Folder ${Date.now()}`;

  await dataRoomPage.createFolder(folderName);

  await expect(
    page.getByRole('cell', {
      name: folderName,
      exact: true,
    })
  ).toBeVisible();

});


test('User sees validation error when creating a folder without a name', async ({ page }) => {
  const dataRoomPage = new DataRoomPage(page);
    
  await page.goto('/');

  await dataRoomPage.openMyDataRoom();

  await dataRoomPage.newFolderButton.click();
  await dataRoomPage.createButton.click();

  await expect(
    page.getByText('Enter a folder name', { exact: true })
  ).toBeVisible();

  //await page.pause();
});

