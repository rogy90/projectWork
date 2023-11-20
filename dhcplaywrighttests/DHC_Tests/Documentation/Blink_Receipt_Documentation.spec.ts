import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "./../../Util/UIElements/linkNames";
import * as urls from "./../../Util/UIElements/urls";

// Define the link texts and URLs that should be opened and verified
const LINK_TEXTS: string[] = [
  pageNames.BLINK_RECEIPT_LEARN,
  pageNames.ANDROID_SDK,
  pageNames.IOS_SDK
];
const URL_LINKS: string[] = [
  urls.BLINK_RECEIPT_LEARN_LINK,
  urls.BLINK_RECEIPT_ANDROID_SDK_LINK,
  urls.BLINK_RECEIPT_IOS_SDK_LINK
];
test("Open Documentation BlinkReceipt menu items, @regression", async ({ page }) => {
  // Go to the documentation link
  await page.goto(urls.DOCUMENTATION_LINK);
  // Click on the "Documentation" menu
  await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
  // Click on the "BlinkReceipt" submenu
  await page.getByRole("link", { name: pageNames.BLINKRECEIPT }).nth(1).click();
  // Open each link and verify that it leads to the expected URL
  await openPagesAndVerifyUrls(page, URL_LINKS, LINK_TEXTS);
});