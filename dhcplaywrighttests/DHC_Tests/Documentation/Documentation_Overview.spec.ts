import { test, expect } from "@playwright/test";
import * as pageNames from "./../../Util/UIElements/linkNames";
import * as urls from "./../../Util/UIElements/urls";
// An array of link texts to click on the Overview page
const LINK_TEXTS: string[] = [
    pageNames.BLINKID_DOC,
    pageNames.BLINKCARD_DOC,
    pageNames.BLINKRECEIPT_DOC,
    pageNames.BLINKINPUT_DOC,
    pageNames.IDENTITY_VER_DOC,
    pageNames.DOCUMENT_VER_DOC,
    pageNames.PDF417_DOC,
    pageNames.PHOTOPAY_DOC
];
// An array of expected URLs to verify against clicked links
const URL_LINKS: string[] = [
    urls.BLINK_ID_LINK,
    urls.BLINK_CARD_LINK,
    urls.BLINK_RECEIPT_LINK,
    urls.BLINK_INPUT_LINK,
    urls.IDENTITY_VER_LINK,
    urls.DOCUMENT_VER_LINK,
    urls.PDF417_LINK,
    urls.PHOTOPAY_LINK
];
test("Open Documentation Overview menu items, @regression", async ({ page }) => {
    // Visit the homepage
    await page.goto("/");
    // Click the Documentation link
    await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
    // Click the Overview link
    await page.getByRole("link", { name: pageNames.OVERVIEW }).click();
    // Check that the URL of the Overview page matches the expected urls
    await expect(page).toHaveURL(urls.DOCUMENTATION_LINK);
    // Loop through the LINK_TEXTS array and click on the links
    for (let i = 0; i < URL_LINKS.length; i++) {
        // Click the link
        await page.getByRole("link", { name: LINK_TEXTS[i] }).click();
        // Check that the URL of the page matches the expected pattern
        await expect(page).toHaveURL(URL_LINKS[i]);
        // Navigate back to the Overview page
        await page.goBack();
    }
});