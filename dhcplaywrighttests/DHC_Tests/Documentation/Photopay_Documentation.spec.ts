import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "./../../Util/UIElements/linkNames";
import * as urls from "./../../Util/UIElements/urls";
// An array of link text to click on the page
const LINK_TEXTS: string[] = [
  pageNames.ANDROID_SDK,
  pageNames.IOS_SDK,
  pageNames.PHOTOPAY_WEB_BROWSER_SDK
];
// An array of expected URLs for the corresponding links above
const URL_LINKS: string[] = [
  urls.PHOTOPAY_ANDROID_SDK_LINK ,
  urls.PHOTOPAY_IOS_SDK_LINK,
  urls.PHOTOPAY_WEB_SDK_LINK
];
test("Open Documentation Photopay menu items, @regression", async ({ page }) => {
  // Navigate to the documentation page
  await page.goto(urls.DOCUMENTATION_LINK);
  // Click on the documentation menu link
  await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
  // Click on the Photopay link
  await page.getByRole("link", { name: pageNames.PHOTOPAY }).nth(1).click();
  // Verify that the URLs of the opened pages match the expected URLs
  await openPagesAndVerifyUrls(page, URL_LINKS, LINK_TEXTS);
});