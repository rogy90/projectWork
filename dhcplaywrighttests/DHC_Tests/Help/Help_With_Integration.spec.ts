import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "../../Util/UIElements/linkNames";
import * as urls from "../../Util/UIElements/urls";
test("Help with integration, @regression", async ({ page }) => {
    // Visit the homepage
    await page.goto("/");
    // Click on the 'Help' button
    await page.locator("a").filter({ hasText: pageNames.HELP_MENU }).first().click();
    // Wait for a popup to appear and click on the 'Help with integration' link
    await openPagesAndVerifyUrls(page, [urls.HELP_CENTER_LINK.toString()], pageNames.HELP_WITH_INTEGRATION);
});