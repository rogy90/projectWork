import { test} from "@playwright/test";
import { handleDownloadEvent } from "../../Util/functions";
import * as buttons from "../../Util/UIElements/buttonNames";
import * as urls from "../../Util/UIElements//urls";
test("File download, @regression @smoke", async ({ page }) => {
    // Visit the download page
    await page.goto(urls.DOWNLOAD_FILES_LINK);
    // Click on the first file in the table
    await page.locator(".mb-res-table__row-inner-link").first().click();
    const downloadBUtton = await page.getByText(buttons.DOWNLOAD_BUTTON);
    // Wait for the download to start and click on the download button
    await handleDownloadEvent(page, downloadBUtton);
});