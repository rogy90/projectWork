import { test } from "@playwright/test";
import * as labels from "../../Util/UIElements/labelNames";
import * as data from "../../Util/testData";
import * as buttons from "../../Util/UIElements/buttonNames";
test("License filter, @regression", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");
    // Click on the license filter button
    await page.locator(".mbi-filter").click();
    // Fill in the filter inputs with specific values
    await page.getByLabel(labels.NUMBER_LABEL).fill('1');
    await page.getByLabel(labels.KEY_LABEL).fill('2');
    await page.getByLabel(labels.APP_IDENTIFIER_LABEL).fill('3');
    // Click on the "apply" button to apply the filter
    await page.getByRole('button', { name:  buttons.APPLY_BUTTON }).click();
    // Click on the "clear all" button to clear the filter
    await page.getByRole('button', { name: buttons.CLEAR_ALL_BUTTON }).click();
    // Wait for the product combobox to appear, then click on it and select the "PDF417" product
    await page.getByRole('combobox', { name: labels.PRODUCT_LABEL }).waitFor();
    await page.getByRole('combobox', { name: labels.PRODUCT_LABEL }).click();
    await page.getByText(data.PRODUCT_PDF417).nth(1).click();
    // Wait for the platform label to appear, then click on it and select the "Android" platform
    await page.getByLabel(labels.PLATFORM_LABEL).waitFor();
    await page.getByLabel(labels.PLATFORM_LABEL).click();
    await page.getByText(data.PLATFORM_ANDROID).click();
    // Wait for the owner label to appear, then click on it and select the "License Owner" owner
    await page.getByLabel(labels.OWNER_LABEL).waitFor();
    await page.getByLabel(labels.OWNER_LABEL).click();
    await page.getByText(data.LICENSE_OWNER).nth(4).click();
    // Wait for the project label to appear, then click on it and select the "Private" project
    await page.getByLabel(labels.PROJECT_LABEL).waitFor();
    await page.getByLabel(labels.PROJECT_LABEL).click();
    await page.getByText(data.PROJECT_PRIVATE).click();
    // Click on the "from" date field and select "10" from the calendar that appears
    await page.getByPlaceholder('From').click();
    await page.getByText('10').first().click();
    // Click on the "to" date field and select "10" from the calendar that appears
    await page.getByPlaceholder('To').click();
    await page.getByRole('cell', { name: '10' }).getByText('10').first().click();
    // Check the checkboxes for various license types
    await page.getByLabel(labels.ACTIVE_CHKBOX).check();
    await page.getByLabel(labels.EXPIRED_CHKBOX).check();
    await page.getByLabel(labels.ARCHIVED_CHKBOX).check();
    await page.getByLabel(labels.TRIAL_CHKBOX).check();
    await page.getByLabel(labels.PILOT_CHKBOX).check();
    await page.getByLabel(labels.PROUDCTION_CHKBOX).check();
    // Click on the "apply" button to apply the filter
    await page.getByRole('button', { name:  buttons.APPLY_BUTTON }).click();
    // Click on the "clear all" button to clear the filter
    await page.getByRole('button', { name: buttons.CLEAR_ALL_BUTTON }).click();
});