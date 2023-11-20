import { test } from "@playwright/test";
import * as labels from "../../Util/UIElements/labelNames";
import * as data from "../../Util/testData";
import * as buttons from "../../Util/UIElements/buttonNames";
test("Files filter, @regression", async ({ page }) => {
    // Visit the homepage
    await page.goto("/file");
    //Click on Filter
    await page.locator(".mbi-filter").click();
    // Fill in the "Name" input field with "1"
    await page.getByLabel(labels.NAME_LABEL).fill('1');
    // Check all checkboxes
    await page.getByLabel(labels.SDK_CHKBOX).check();
    await page.getByLabel(labels.TEHNICAL_DOC_CHKBOX).check();
    await page.getByLabel(labels.SAMPLES_CHKBOX).check();
    await page.getByLabel(labels.OTHER_CHKBOX).check();
    // Wait for the product combobox to appear, then click on it and select the "PDF417" product
    await page.getByRole('combobox', { name: labels.PRODUCT_LABEL }).waitFor();
    await page.getByRole('combobox', { name: labels.PRODUCT_LABEL }).click();
    await page.getByText(data.PRODUCT_PDF417).nth(1).click();
    // Wait for the platform label to appear, then click on it and select the "Android" platform
    await page.getByLabel(labels.PLATFORM_LABEL).waitFor();
    await page.getByLabel(labels.PLATFORM_LABEL).click();
    await page.getByText(data.PLATFORM_ANDROID).click();
    // Click on the "apply" button to apply the filter
    await page.getByRole('button', { name: buttons.APPLY_BUTTON }).click();
    // Click on the "clear all" button to clear the filter
    await page.getByRole('button', { name: buttons.CLEAR_ALL_BUTTON }).click();
});