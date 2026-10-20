
import { type Page, type Locator } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export class DataRoomPage {
  readonly page: Page;
  readonly myDataRoom: Locator;
  readonly newFolderButton: Locator;
  readonly folderNameInput: Locator;
  readonly createButton: Locator;
  readonly uploadButton: Locator;
  readonly fileInput: Locator;
  readonly fileNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myDataRoom = page.getByText('My Data Room', { exact: true });
    this.newFolderButton = page.getByRole('button', {
      name: 'New folder',
    });
    this.folderNameInput = page.getByRole('textbox', {
      name: 'Folder name',
    });
    this.createButton = page.getByRole('button', {
      name: 'Create',
    });
    this.uploadButton = page.getByRole('button', {
      name: 'Upload',
    });
    this.fileInput = page.locator('input[type="file"]');
    this.fileNameInput = page.getByRole('textbox', {
      name: 'File name',
    });
    this.saveButton = page.getByRole('button', {
      name: 'Save',
   });
  }

  async openMyDataRoom(): Promise<void> {
    await this.myDataRoom.click();
  }

  async createFolder(folderName: string): Promise<void> {
    await this.newFolderButton.click();
    await this.folderNameInput.fill(folderName);
    await this.createButton.click();
  }

  async expectFolderVisible(folderName: string): Promise<void> {
    await this.page.getByRole('cell', {
      name: folderName,
      exact: true,
    }).waitFor({ state: 'visible' });
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.uploadButton.click();
    await this.fileInput.setInputFiles(filePath);
 }

  async uploadFileWithName(
    filePath: string,
    fileName: string
  ): Promise<void> {
    const fileBuffer = await readFile(filePath);

    await this.uploadButton.click();

    await this.fileInput.setInputFiles({
      name: fileName,
      mimeType: 'application/pdf',
      buffer: fileBuffer,
    });
  }

  async renameFile(oldName: string, newName: string): Promise<void> {
    await this.page
      .getByRole('button', { name: `Actions for ${oldName}` })
      .click();

    await this.page.getByRole('menuitem', { name: 'Rename' }).click();

    const normalizedName = newName.replace(/\.pdf$/i, '');
    await this.fileNameInput.fill(normalizedName);
    await this.saveButton.click();
  }

  async deleteFile(fileName: string): Promise<void> {
    await this.page
      .getByRole('button', { name: `Actions for ${fileName}` })
      .click();

    await this.page.getByRole('menuitem', { name: 'Delete' }).click();
    await this.page.getByRole('button', { name: 'Delete', exact: true }).click();
  }

  async shareFile(fileName: string, email: string): Promise<void> {
    await this.page
      .getByRole('button', { name: `Actions for ${fileName}` })
      .click();
    await this.page.getByRole('menuitem', { name: 'Share' }).click();

    const shareDialog = this.page.getByRole('dialog', {
      name: `Share "${fileName}"`,
    });
    await shareDialog.getByRole('textbox', { name: 'Email' }).fill(email);
    await shareDialog.getByRole('button', { name: 'Share' }).click();
    await shareDialog.getByText(email, { exact: true }).waitFor({
      state: 'visible',
    });
    await shareDialog.getByRole('button', { name: 'Done' }).click();
  }
}
