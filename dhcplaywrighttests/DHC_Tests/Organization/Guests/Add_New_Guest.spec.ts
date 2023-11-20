import { test, expect } from "@playwright/test";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as urls from "../../../Util/UIElements/urls";
import * as labels from "../../../Util/UIElements/labelNames";
import * as data from "../../../Util/testData";
import * as message from "../../../Util/assertions";
import * as dialogs from "../../../Util/UIElements/dialogNames";
test("Add a new guest to the Organization, @regression @smoke", async ({ page }) => {
    // Navigate to the organization guests page
    await page.goto(urls.ORG_GUEST_LINK);
    // Click on the 'Add guests' button
    await page.getByRole("button", { name: buttons.ADD_GUESTS_BUTTON }).click();
    // Click on the email input field
    // Enter the email of the new guest
    await page.getByLabel(labels.EMAIL_INPUT_LABEL).click();
    await page.getByLabel(labels.EMAIL_INPUT_LABEL).fill(data.GUEST_ADD_MAIL);
    // Select the 'Default project' from the 'Select which projects they're allowed to access:' dropdown
    await page.getByLabel(labels.PROJECT_ACCESS_INPUT_LABEL).click();
    await page.getByText(data.PROJECT).click();
    //Click outside the project field
    await page.getByText("Add new guests to your projects").click();
    // Check the 'Allow full access for selected projects' checkbox
    await page.getByLabel(labels.PROJECT_ACCESS_CHKBOX_LABEL).check();
    // Click on the 'Add guests' button in the dialog
    await page.getByRole('dialog', { name: dialogs.ADD_NEW_GUEST_DIALOG  }).getByRole('button', { name: buttons.ADD_GUESTS_BUTTON }).nth(1).click();
    // Check that the confirmation message is displayed
    expect(await page.getByText(message.NEW_GUEST_ADDED)).toBeTruthy();
});