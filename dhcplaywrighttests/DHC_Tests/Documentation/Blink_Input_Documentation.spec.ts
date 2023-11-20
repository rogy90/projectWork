import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "./../../Util/UIElements/linkNames";
import * as urls from "./../../Util/UIElements/urls";
// The link texts and corresponding URLs to test
const LINK_TEXTS: string[] = [
  pageNames.ANDROID_SDK,
  pageNames.IOS_SDK,
  pageNames.CORDOVA_SDK,
  pageNames.XAMARIN_SDK,
  pageNames.REACT_NATIVE_SDK,
  pageNames.BLINK_INPUT_WEB_BROWSER_SDK
];
const URL_LINKS: string[] = [  
  urls.BLINK_INPUT_ANDROID_SDK_LINK,
  urls.BLINK_INPUT_IOS_SDK_LINK,
  urls.BLINK_INPUT_CORDOVA_SDK_LINK,
  urls.BLINK_INPUT_XAMARIN_SDK_LINK,
  urls.BLINK_INPUT_REACT_NATIVE_SDK_LINK,
  urls.BLINK_INPUT_WEB_SDK_LINK 
];

test("Open Documentation BlinkInput menu items, @regression", async ({ page }) => {
    // Go to the documentation link
    await page.goto(urls.DOCUMENTATION_LINK);
    // Click on the documentation menu
    await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
    // Click on the BlinkInput link
    await page.getByRole("link", { name: pageNames.BLINKINPUT }).nth(1).click();
    // Open pages for each URL and verify the URLs
    await openPagesAndVerifyUrls(page, URL_LINKS, LINK_TEXTS);
});