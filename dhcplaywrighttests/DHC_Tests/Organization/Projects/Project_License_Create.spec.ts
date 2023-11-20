import { test, expect } from "@playwright/test";
import * as labels from "../../../Util/UIElements/labelNames";
import * as data from "../../../Util/testData";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as message from "../../../Util/assertions";
import * as urls from "../../../Util/UIElements/urls";
test("Add new license to the organization's project, @regression @smoke", async ({ page }) => {
    // Navigate to the organization's projects page
    await page.goto(urls.ORG_PROJECT_LINK);
    // Click on a specific project
    await page.getByRole("link", { name: data.PROJECT }).click();
    // Click on the license menu
    await page.locator("[data-menu-id*='/license']").click();
    // Click on the New free trial button
    await page.getByRole("button", { name: buttons.NEW_FREE_TRIAL_BUTTON }).click();
    // Select the product
    await page.getByLabel(labels.PRODUCT_LABEL).fill(data.PRODUCT_PDF417);
    await page.getByLabel(labels.PRODUCT_LABEL).click();
    await page.getByText(data.PRODUCT_PDF417).nth(1).click();
    // Select the platform
    await page.getByLabel(labels.PLATFORM_LABEL).click();
    await page.getByText(data.PLATFORM_ANDROID).click();
    // Enter package name
    await page.getByLabel(labels.PACKAGE_NAME).nth(1).click();
    await page.getByLabel(labels.PACKAGE_NAME).nth(1).fill("test");
    // Click on Create button and assert if the license is created
    await page.getByRole("button", { name: buttons.CREATE_BUTTON }).click();
    expect(await page.getByText(message.LICENSE_CREATE)).toBeTruthy();
});