import { test } from '@playwright/test';
import * as labels from "../../../Util/UIElements/labelNames";
import * as urls from "../../../Util/UIElements/urls";
import * as buttons from "../../../Util/UIElements/buttonNames";
test('Check Guests filters @regression', async ({ page }) => {
  // Go to the org guest link
  await page.goto(urls.ORG_GUEST_LINK);
  // Click on the filter button
  await page.locator(".mbi-filter").click();
  // Fill in the guest name filter with '1'
  await page.getByLabel(labels.GUEST_NAME_LABEL).fill('1');
  // Fill in the guest email filter with '2'
  await page.getByLabel(labels.GUEST_EMAIL_LABEL).fill('2');
  // Fill in the guest organization filter with '3'
  await page.getByLabel(labels.GUEST_ORGANIZATION_LABEL).fill('3');
  // Click on the "apply" button to apply the filter
  await page.getByRole('button', { name:  buttons.APPLY_BUTTON }).click();
  // Click on the "clear all" button to clear the filter
  await page.getByRole('button', { name: buttons.CLEAR_ALL_BUTTON }).click();
});