import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as urls from "../../Util/UIElements/urls";
import * as pageNames from "../../Util/UIElements/linkNames";
test("Privacy policy, @regression", async ({ page }) => {
    // Visit the homepage
    await page.goto("/");
    // Click on the 'Privacy & Terms' link
    await page.locator("a").filter({ hasText: pageNames.PRIVACY_AND_TERMS_MENU }).click();
    // Wait for a popup and click on the 'Privacy policy' link
   await openPagesAndVerifyUrls(page, [urls.PRIVACY_POLICY_LINK.toString()], pageNames.PRIVACY_POLICY);
});