import { Browser } from 'playwright';
import { test } from '@playwright/test';

let browser: Browser;

test.afterAll(async () => {
  await browser.close();
});