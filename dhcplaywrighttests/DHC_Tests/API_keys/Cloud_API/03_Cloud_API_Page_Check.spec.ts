import { test, expect } from "@playwright/test";
import { openPagesAndVerifyUrls, handleContactUsForm } from "../../../Util/functions";
import * as urls from "../../../Util/UIElements/urls";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as pageNames from "../../../Util/UIElements/linkNames";
import * as message from "../../../Util/assertions";

test.skip("Test Cloud API page links, @regression", async ({ page }) => {
  // Visit the Cloud API
  await page.goto(urls.CLOUD_API_LINK);
  // Click on the "API keys" link
  await page.locator("a").filter({ hasText: pageNames.API_KEYS }).click();
  // Click on the "Cloud API" link
  await page.getByRole("link", { name: pageNames.CLOUD_API }).first().click();
  // Click on the generated API key
  await page.locator("app-mb-api-my-licenses >> text = BlinkID").click();
  // Click on Contact sales button
  const buttonContactSales = await page.getByRole("button", { name: buttons.CONTACT_SALES_BUTTON }).first();
  await handleContactUsForm(page, buttonContactSales);
  // Click on View supported document list
  await page.getByText(buttons.VIEW_SUPPORTED_DOCUMENTS).click();
  expect(await page.getByText(message.BLINK_ID_SUPPORTED_DOCUMENTS)).toBeTruthy();
  // Click on Close
  await page.getByRole("button", { name: buttons.CLOSE_BUTTON }).click();
  // Click on Edit domain
  await page.getByText(buttons.EDIT_DOMAIN).click();
  await page.getByRole("button", { name: buttons.UPDATE_DOMAIN }).click();
  // Click on Copy and copy it to clipboard
  await page.getByRole("button", { name: buttons.COPY }).click();
  await expect(page.getByText(message.COPIED_TO_CLIPBOARD)).toBeTruthy();
  // Wait for the "popup" event, then click on the link "https://docs.microblink.com/documentation/cloudapi/"
  await openPagesAndVerifyUrls(page, [urls.CLOUD_API_DOC_LINK.toString()], pageNames.CLOUD_API_DOCUMENTATION);
  // Wait for the "popup" event, then click on the link "https://microblink.com/terms-of-service/"
  await openPagesAndVerifyUrls(page, [urls.TERMS_OF_SERVICE_LINK.toString()], pageNames.READ_TERMS_OF_SERVICE);
  // Copy sample code
  await page.getByRole('button', { name: buttons.COPY_SAMPLE_CODE }).click();
  await expect(await page.getByText(message.COPIED_TO_CLIPBOARD)).toBeTruthy();
  // Switch to Scanning history tab
  await page.getByRole('button', { name: buttons.SCANNING_HISTORY }).click();
  await expect(await page.getByText(message.SCANNING_HISTORY_TAB)).toBeTruthy();
});
