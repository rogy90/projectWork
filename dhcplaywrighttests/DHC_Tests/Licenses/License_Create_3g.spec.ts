import { test, expect } from "@playwright/test";
import { withSlowNetwork, restoreStorageState } from "../../Util/functions";
import * as labels from "../../Util/UIElements/labelNames";
import * as data from "../../Util/testData";
import * as buttons from "../../Util/UIElements/buttonNames";
import * as urls from "../../Util/UIElements/urls";
import * as message from "../../Util/assertions";

test.skip("Create a new license 3g, @regression @smoke", async ({ page }) => {
    // Mark this test as slow
    test.slow(); 
    // Set the network conditions to simulate a slow 3G connection
    await withSlowNetwork(page);
    // Go to the create new license page
    await page.goto(urls.CREATE_NEW_LICENSE_LINK);
    // Set the license owner, product, platform, and identifier
    await page.getByLabel(labels.LICENSE_OWNER_LABEL).click();
    await page.getByText(data.LICENSE_OWNER).nth(4).click();
    // Wait for the package name input to appear and be editable
    await page.waitForSelector('.ant-skeleton-input', { state: 'hidden', timeout: 5000 });
    await page.getByLabel(labels.PRODUCT_LABEL).fill(data.PRODUCT_PDF417);
    await page.keyboard.press("Enter");
    // Wait for the page to load and the platform label to appear, then click on it and select the "Android" platform
    await page.waitForLoadState("networkidle");
    await page.getByRole('combobox', { name: 'Platform :' }).waitFor();
    await page.getByLabel(labels.PLATFORM_LABEL).click();
    await page.getByText(data.PLATFORM_ANDROID).click();
    await page.getByLabel(labels.PACKAGE_NAME).nth(1).click();
    await page.getByLabel(labels.PACKAGE_NAME).nth(1).fill("test");
    await page.locator(".ant-form-item-feedback-icon.ant-form-item-feedback-icon-success").waitFor();
    // Wait for the create button to appear and be clickable, then click it
    await page.waitForLoadState("networkidle");
    const createButton = await page.getByRole("button", { name: buttons.CREATE_BUTTON });
    await createButton.waitFor({ state: "attached" });
    await createButton.click();
    // Assert if the license is created
    expect(await page.getByText(message.LICENSE_CREATE)).toBeTruthy();
    // Restore the storage state of the page and close the page
    await restoreStorageState(page);
    await page.close();
}); 