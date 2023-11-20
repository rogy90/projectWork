import { test, expect } from '@playwright/test';
import * as pageNames from "../../../Util/UIElements/linkNames";
import * as labels from "../../../Util/UIElements/labelNames";
import * as buttons from "../../..//Util/UIElements/buttonNames";
import * as message from "../../../Util/assertions";

test.skip('Create new free trial BR cloud api, @regression @smoke', async ({ page }) => {
  // Visit the homepage
  await page.goto('/');
  // Click the API Keys link
  await page.locator('a').filter({ hasText: pageNames.API_KEYS }).click();
  // Click the BR Cloud API link
  await page.getByRole('link', { name: pageNames.BR_CLOUD_API }).click();
  // Click the "Create free trial key" button
  await page.getByRole('button', { name: buttons.NEW_FREE_TRIAL_BUTTON }).click();
  // Check the "Confirm API Terms" checkbox
  await page.getByLabel(labels.CONFIRM_API_TERMS).check();
  // Click the "Create" button
  await page.getByRole('button', { name: buttons.CREATE_BUTTON }).click();
  // Assert that the message "New credentials generated!" is displayed
  expect(await page.getByText(message.NEW_CREDENTIALS_GENERATED)).toBeTruthy();
  // Click the "Close" button
  await page.getByRole('button', { name: buttons.CLOSE_BUTTON }).filter({ hasText: buttons.CLOSE_BUTTON}).click();
});