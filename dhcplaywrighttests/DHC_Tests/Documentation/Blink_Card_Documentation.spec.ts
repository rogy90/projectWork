import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "../../Util/UIElements/linkNames";
import * as urls from "../../Util/UIElements/urls";
// An array of link texts for the BlinkCard menu items
const LINK_TEXTS: string[] = [
  pageNames.BLINK_CARD_LEARN,
  pageNames.ANDROID_SDK,
  pageNames.IOS_SDK,
  pageNames.CAPACITATOR_SDK,
  pageNames.CORDOVA_SDK,
  pageNames.FLUTTER_SDK,
  pageNames.REACT_NATIVE_SDK,
  pageNames.XAMARIN_SDK,
  pageNames.BLINK_CARD_SELF_HOSTED_SDK,
  pageNames.BLINK_CARD_WEB_BROWSER_SDK
];
// An array of URLs for the BlinkCard menu items
const URL_LINKS: string[] = [
  urls.BLINK_CARD_LEARN_LINK,
  urls.BLINK_CARD_ANDROID_SDK_LINK,
  urls.BLINK_CARD_IOS_SDK_LINK,
  urls.BLINK_CARD_CAPACITATOR_SDK_LINK,
  urls.BLINK_CARD_CORDOVA_SDK_LINK,
  urls.BLINK_CARD_FLUTTER_SDK_LINK,
  urls.BLINK_CARD_REACT_NATIVE_SDK_LINK,
  urls.BLINK_CARD_XAMARIN_SDK_LINK,
  urls.SELF_HOSTED_SDK_LINK,
  urls.BLINK_CARD_WEB_SDK_LINK 
];
// A test to open BlinkCard menu items in Documentation and verify the URLs
test("Open BlinkCard menu items in Documentation, @regression", async ({ page }) => {
    // Go to the Documentation page
    await page.goto(urls.DOCUMENTATION_LINK);
    // Click on the "Documentation" menu
    await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
    // Click on the "BlinkCard" menu item
    await page.getByRole("link", { name: pageNames.BLINK_CARD }).nth(1).click();
    // Open the pages for the BlinkCard menu items and verify the URLs
    await openPagesAndVerifyUrls(page, URL_LINKS, LINK_TEXTS);
});