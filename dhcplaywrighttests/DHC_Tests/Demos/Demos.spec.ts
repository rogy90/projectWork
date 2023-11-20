import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "../../Util/UIElements/linkNames";
import * as urls from "../../Util/UIElements/urls";
test("Demos section check, @regression", async ({ page }) => {
    // Visit the homepage
    await page.goto("/");
    // Click the Demos link
    await page.locator("a").filter({ hasText: pageNames.DEMO_MENU }).click();
    // Locate the iOS App Store button
    const selectorApple = page.locator(".mb-image.mb-image--demos.mb-image--demos-ios-appstore");
    // Click on iOS App Store button and wait for new tab to open
    await openPagesAndVerifyUrls(page, [urls.APPLE_DEMO_LINK.toString()], selectorApple);
    // Click on Google Play button and wait for new tab to open
    const selectorAndroid = page.locator(".mb-image.mb-image--demos.mb-image--demos-google-play");
    await openPagesAndVerifyUrls(page, [urls.ANDROID_DEMO_LINK.toString()], selectorAndroid);
    // Click on Huawei AppGallery button and wait for new tab to open
    const selectorHuawei = page.locator("a[role='button'] > .mb-image.mb-image--demos.mb-image--demos-huawei-appgallery").first();
    await openPagesAndVerifyUrls(page, [urls.HUAWEI_DEMO_LINK.toString()], selectorHuawei);
    // Click on Try web demos button and wait for new tab to open
    const selectorWeb = page.locator("a[role='button'] > .mb-display-flex.mb-flex--align-items-center");
    await openPagesAndVerifyUrls(page, [urls.WEB_DEMO_LINK.toString()], selectorWeb);
});