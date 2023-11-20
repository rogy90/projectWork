import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "./../../Util/UIElements/linkNames";
import * as urls from "./../../Util/UIElements/urls";
test("Open Documentation Document Verification menu items, @regression", async ({page,}) => {
    // Navigate to the documentation page
    await page.goto(urls.DOCUMENTATION_LINK);
    // Click on the "Documentation" menu item
    await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
    // Click on the "Document Verification" menu item
    await page.getByRole("link", { name: pageNames.DOCUMENT_VER }).nth(1).click();
    // Call the openPagesAndVerifyUrls function to open and verify the URLs of the BlinkCard menu items
    await openPagesAndVerifyUrls(page, [urls.DOC_VER_LEARN_LINK.toString()], pageNames.DOC_VER_LEARN);
});