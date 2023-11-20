import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as urls from "../../Util/UIElements/urls";
import * as pageNames from "../../Util/UIElements/linkNames";
test("Terms of use, @regression", async ({ page }) => {
    // Visit the homepage
    await page.goto("/");
    // Click on the 'Privacy & Terms' link
    await page.locator("a").filter({ hasText: pageNames.PRIVACY_AND_TERMS_MENU }).click();
    // Wait for the terms of use page to open in a new tab
    await openPagesAndVerifyUrls(page, [urls.TERMS_OF_USE_LINK.toString()], pageNames.TERMS_OF_USE);
});