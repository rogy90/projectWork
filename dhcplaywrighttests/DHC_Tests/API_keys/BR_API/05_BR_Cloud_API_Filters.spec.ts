import { test } from '@playwright/test';
import * as urls from '../../../Util/UIElements/urls';
import * as labels from "../../../Util/UIElements/labelNames";
import * as buttons from '../../../Util/UIElements/buttonNames';

test.skip("BR Cloud Api filters, @regression", async ({ page }) => {
  // Visit the API key page
  await page.goto(urls.BR_CLOUD_API_LINK);
  // Click on the filter button
  await page.locator(".mbi-filter").click();
  // Fill in the API key input field
  await page.getByLabel(labels.API_KEY_LABEL).fill('1');
  // Click on the type label and select "BR Free Trial" from the dropdown
  await page.getByLabel(labels.TYPE_LABEL).click();
  await page.locator(".ant-select-item-option-content").first().click();
   // Check the "Active", "Deactivated", and "Show Expired" checkboxes
  await page.getByLabel(labels.BR_ACTIVE_CHKBOX).check();
  await page.getByLabel(labels.BR_DEACTIVATED_CHKBOX).check();
  await page.getByLabel(labels.BR_SHOW_EXPIRED_CHKBOX).check();
  // Click on the "apply" button to apply the filter
  await page.getByRole('button', { name:  buttons.APPLY_BUTTON }).click();
  // Click on the "clear all" button to clear the filter
  await page.getByRole('button', { name: buttons.CLEAR_ALL_BUTTON }).click();
});