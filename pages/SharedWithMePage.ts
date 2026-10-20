import { type Locator, type Page } from '@playwright/test';

export class SharedWithMePage {
  readonly page: Page;
  readonly sharedWithMeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sharedWithMeLink = page.getByRole('link', {
      name: 'Shared with me',
    });
  }

  async open(): Promise<void> {
    await this.sharedWithMeLink.click();
  }

  async expectFileVisible(fileName: string): Promise<void> {
    await this.page.getByRole('link').filter({ hasText: fileName }).waitFor({
      state: 'visible',
    });
  }

  async openFile(fileName: string): Promise<void> {
    await this.page.getByRole('link').filter({ hasText: fileName }).click();
    await this.page.getByRole('link', { name: 'Close' }).waitFor({
      state: 'visible',
    });
  }

  async downloadFile(): Promise<void> {
    await this.page.getByRole('button', { name: 'Download', exact: true }).click();
  }
}
