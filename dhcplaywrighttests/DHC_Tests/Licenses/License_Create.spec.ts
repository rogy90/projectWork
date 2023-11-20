import { test, expect } from "@playwright/test";
import * as labels from "../../Util/UIElements/labelNames";
import * as data from "../../Util/testData";
import * as buttons from "../../Util/UIElements/buttonNames";
import * as message from "../../Util/assertions";
test("Create a new license, @regression @smoke", async ({ page }) => {
    // Go to Home page
    await page.goto("/");
    // Click on New free trial button
    await page.getByRole("button", { name: buttons.NEW_FREE_TRIAL_BUTTON }).click();
    // Set the license owner, product, platform, and identifier
    await page.getByLabel(labels.LICENSE_OWNER_LABEL).click();
    await page.getByText(data.LICENSE_OWNER).nth(4).click();
    await page.getByLabel(labels.PRODUCT_LABEL).fill(data.PRODUCT_PDF417);
    await page.getByLabel(labels.PRODUCT_LABEL).click();
    await page.getByText(data.PRODUCT_PDF417).nth(1).click();
    await page.getByLabel(labels.PLATFORM_LABEL).click();
    await page.getByText(data.PLATFORM_ANDROID).click();
    await page.getByLabel(labels.PACKAGE_NAME).nth(1).click();
    await page.getByLabel(labels.PACKAGE_NAME).nth(1).fill("test");
    // Click on Create button and assert if the license is created
    await page.getByRole("button", { name: buttons.CREATE_BUTTON }).click();
    expect(await page.getByText(message.LICENSE_CREATE)).toBeTruthy();
});