import { test } from '@playwright/test';
import * as labels from "../../../Util/UIElements/labelNames";
import * as urls from "../../../Util/UIElements/urls";
import * as buttons from "../../../Util/UIElements/buttonNames";
test('Check Project filters @regression', async ({ page }) => {
  // Go to the organization member link
  await page.goto(urls.ORG_MEMBER_LINK);
  // Click on the filter button
  await page.locator(".mbi-filter").click();
  // Fill in the project name filter with '1'
  await page.getByLabel(labels.PROJECT_NAME_LABEL).fill('1');
  // Click on the "apply" button to apply the filter
  await page.getByRole('button', { name: buttons.APPLY_BUTTON }).click();
  // Click on the "clear all" button to clear the filter
  await page.getByRole('button', { name: buttons.CLEAR_ALL_BUTTON }).click();
});