import { test } from '@playwright/test';
import * as labels from "../../../Util/UIElements/labelNames";
import * as urls from "../../../Util/UIElements/urls";
import * as buttons from "../../../Util/UIElements/buttonNames";
test('Check Members filters @regression', async ({ page }) => { 
  // Visit the organization members page
  await page.goto(urls.ORG_MEMBER_LINK); 
  // Click on the filter button to open the filter menu
  await page.locator(".mbi-filter").click();
  // Fill the "Name" filter with the value "1"
  await page.getByLabel(labels.ORG_MEMBER_NAME_LABEL).fill('1');
  // Fill the "Email" filter with the value "2"
  await page.getByLabel(labels.ORG_MEMBER_EMAIL_LABEL).fill('2');
  // Check both the "Admin" and "Member" checkboxes
  await page.getByLabel(labels.ADMIN_MEMBER_CHKBOX).check();
  await page.getByLabel(labels.MEMBER_MEMBER_CHKBOX).check();
  // Click on the "apply" button to apply the filter
  await page.getByRole('button', { name: buttons.APPLY_BUTTON }).click();
  // Click on the "clear all" button to clear the filter
  await page.getByRole('button', { name: buttons.CLEAR_ALL_BUTTON }).click();  
}); 