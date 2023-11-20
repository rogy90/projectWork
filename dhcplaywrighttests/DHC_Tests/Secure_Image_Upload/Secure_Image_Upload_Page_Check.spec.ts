import { test, expect } from "@playwright/test";
import * as buttons from "../../Util/UIElements/buttonNames";
import * as pageNames from "../../Util/UIElements/linkNames";
import * as urls from "../../Util/UIElements/urls";
import * as message from "../../Util/assertions";
import { openPagesAndVerifyUrls } from "../../Util/functions";
// Define an array of download links to be opened
const downloadLinks: { url: string, locator: string }[] = [
  { url: urls.SAMPLE_DOCUMENTS_TIPS_LINK, locator: ".mbi-download" },
  { url: urls.BLINK_CARD_IMG_UPLOAD_GUIDE_LINK, locator: ".mbi-download" },
  { url: urls.SECURE_IMG_UPLOAD_DATA_PRIVACY_LINK, locator: ".mbi-download" }
];
test("Navigate through Secure Image Upload page, @regression", async ({ page }) => {
  // Go to the homepage
  await page.goto("/"); 
  // Click on the Secure image upload page
  await page.locator("a").filter({ hasText: pageNames.SECURE_IMG_UPLOAD_MENU }).click();
  // Open all download links
  for (let i = 0; i < downloadLinks.length; i++) {
    const locator = await page.locator(downloadLinks[i].locator).nth(i);
    // Call function to open pages and verify URLs
    await openPagesAndVerifyUrls(page, [downloadLinks[i].url.toString()], locator);
  }
  // Click on the button 'Uploading ID document images'
  await page.getByRole("button", { name: buttons.UPLOAD_ID_DOC_IMG_BUTTON }).click(); 
  // Check if the text "Uploading your images the right way" is present
  expect(await page.getByText(message.UPLOADING_YOUR_IMAGES)).toBeTruthy(); 
  // Click on the button 'Got it'
  await page.getByRole("button", { name: buttons.GOT_IT_BUTTON }).click();
  // Click on the button 'Uploading payment card images'
  await page.getByRole("button", { name: buttons.UPLOAD_PAYMENT_CARD_IMG_BUTTON }).click();
  // Check if the text "Uploading your images the right way" is present
  expect(await page.getByText(message.UPLOADING_YOUR_IMAGES)).toBeTruthy();
  // Click on the button 'Got it'
  await page.getByRole("button", { name: buttons.GOT_IT_BUTTON }).click(); 
  // Wait for a pop-up and click the email link 'privacy@microblink.com'
  await page.getByRole("link", { name: "privacy@microblink.com" }).click(); 
  // Click on the first element with text 'Secure image upload'
  await page.getByText("Secure image upload").first().click(); 
  // Click on the button 'Data privacy notice'
  await page.getByRole("button", { name: buttons.DATA_PRIVACY_NOTICE_BUTTON }).click();
  // Check if the text "Microblink Secure Upload Data Privacy Notice" is present
  expect(await page.getByText(message.MB_SECURE_UPLOAD_DATA_PRIVACY_NOTICE)).toBeTruthy();
  // Click on the button 'Close' with the text 'Close'
  await page.getByRole("button", { name: buttons.CLOSE_BUTTON }).filter({ hasText: buttons.CLOSE_BUTTON }).click();
});