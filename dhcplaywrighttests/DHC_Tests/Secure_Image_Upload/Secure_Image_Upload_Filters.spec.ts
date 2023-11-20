import { test } from "@playwright/test";
import * as urls from "../../Util/UIElements/urls";
import * as labels from "../../Util/UIElements/labelNames";
import * as buttons from "../../Util/UIElements/buttonNames";
test("Secure image upload filters, @regression", async ({ page }) => {
  // Go to the homepage
  await page.goto(urls.SECURE_IMAGE_UPLOAD); 
  // Click on the "filter" button
  await page.locator(".mbi-filter").click();  
  // Fill in the "Image name" filter with "1"
  await page.getByLabel(labels.IMAGE_NAME_LABEL).fill('1'); 
  // Fill in the "Image ID" filter with "2"
  await page.getByLabel(labels.IMAGE_ID_LABEL).fill('2'); 
  // Click on the "from" date field and select "10" from the calendar that appears
  await page.getByPlaceholder('From').click();
  await page.getByText('10').nth(1).click(); 
  // Click on the "to" date field and select "10" from the calendar that appears
  await page.getByPlaceholder('To').click();
  await page.getByRole('cell', { name: '10' }).getByText('10').click();
  // Click on the "apply" button to apply the filter
  await page.getByRole('button', { name: buttons.APPLY_BUTTON }).click();
  // Click on the "clear all" button to clear the filter
  await page.getByRole('button', { name: buttons.CLEAR_ALL_BUTTON }).click();     
}); 