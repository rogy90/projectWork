import { test, expect } from "@playwright/test";
import * as urls from "../../../Util/UIElements/urls";
import * as data from "../../../Util/testData";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as message from "../../../Util/assertions";
import * as labels from "../../../Util/UIElements/labelNames";
test("Add a new member to the Organization, @regression @smoke", async ({ page }) => {
    // Go to the organization's members page
    await page.goto(urls.ORG_MEMBER_LINK);
    // Click on the "Add members" button
    await page.getByRole("button", { name: buttons.ADD_MEMBERS_BUTTON }).first().click();
    // Type in the email address of the new member
    await page.getByLabel(labels.EMAIL_INPUT_LABEL).fill(data.MEMBER_ADD_MAIL);
    // Press the Enter key to submit the email address
    await page.getByLabel(labels.EMAIL_INPUT_LABEL).press("Enter");
    // Check the "Admin" checkbox
    await page.getByLabel(labels.ADMIN_ACCESS_CHKBOX_LABEL).check();
    // Click on the "Add members" button in the dialog
    await page.getByRole("button", { name: buttons.ADD_MEMBERS_BUTTON }).nth(1).click();
    // Check for a message indicating that the new members were added
    expect(await page.getByText(message.NEW_MEMBER_ADDED)).toBeTruthy;
});