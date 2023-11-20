import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "./../../Util/UIElements/linkNames";
import * as urls from "./../../Util/UIElements/urls";

// Array of link text for menu items in the PDF417 SDK section
const LINK_TEXTS: string[] = [
  pageNames.ANDROID_SDK,
  pageNames.IOS_SDK,
  pageNames.CORDOVA_SDK,
  pageNames.XAMARIN_SDK,
  pageNames.PDF417_SELF_HOSTED_SDK
];
// Array of URLs for menu items in the PDF417 SDK section
const URL_LINKS: string[] = [
  urls.PDF417_ANDROID_SDK_LINK,
  urls.PDF417_IOS_SDK_LINK,
  urls.PDF417_CORDOVA_SDK_LINK,
  urls.PDF417_XAMARIN_SDK_LINK,
  urls.SELF_HOSTED_SDK_LINK
];
test("Open Documentation PDF417 menu items, @regression", async ({ page, browser }) => {
  // Go to the Documentation link
  await page.goto(urls.DOCUMENTATION_LINK);
  // Click the Documentation menu
  await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
  // Click the PDF417 menu item
  await page.getByRole("link", { name: pageNames.PDF417 }).nth(1).click();
  // Open the PDF417 menu items and verify the URLs
  await openPagesAndVerifyUrls(page, URL_LINKS, LINK_TEXTS);
});