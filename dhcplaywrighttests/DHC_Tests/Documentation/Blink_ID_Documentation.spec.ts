import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "./../../Util/UIElements/linkNames";
import * as urls from "./../../Util/UIElements/urls";
// An array of link texts for the BlinkID menu items
const LINK_TEXTS: string[] = [
  pageNames.BLINK_ID_LEARN,
  pageNames.ANDROID_SDK,
  pageNames.IOS_SDK,
  pageNames.CAPACITATOR_SDK,
  pageNames.CORDOVA_SDK,
  pageNames.FLUTTER_SDK,
  pageNames.REACT_NATIVE_SDK,
  pageNames.XAMARIN_SDK
];
// An array of URLs for the BlinkID menu items
const URL_LINKS: string[] = [
  urls.BLINK_ID_LEARN_LINK,
  urls.BLINK_ID_ANDROID_SDK_LINK,
  urls.BLINK_ID_IOS_SDK_LINK,
  urls.BLINK_ID_CAPACITATOR_SDK_LINK,
  urls.BLINK_ID_CORDOVA_SDK_LINK,
  urls.BLINK_ID_FLUTTER_SDK_LINK,
  urls.BLINK_ID_REACT_NATIVE_SDK_LINK,
  urls.BLINK_ID_XAMARIN_SDK_LINK
];
test("Open Documentation BlinkID menu items, @regression", async ({ page }) => {
    // Go to the Documentation page
    await page.goto(urls.DOCUMENTATION_LINK);
    // Click on the "Documentation" menu
    await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
    // Click on the "BlinkID" menu item
    await page.getByRole("link", { name: pageNames.BLINKID }).nth(1).click();
    // Open the pages for the BlinkID menu items and verify the URLs
    await openPagesAndVerifyUrls(page, URL_LINKS, LINK_TEXTS);
});