import { test, expect } from "@playwright/test";
import * as urls from "../../../Util/UIElements/urls";
import * as data from "../../../Util/testData";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as message from "../../../Util/assertions";
import * as dialogs from "../../../Util/UIElements/dialogNames";
test("Remove a member from the Organization, @regression", async ({ page }) => {
    // Go to the organization's members page
    await page.goto(urls.ORG_MEMBER_LINK);
    // Click on the member's name, which also serves as a link
    await page.getByRole("link", {name: data.MEMBER_REMOVE_MAIL}).click();
    // Click on the "Remove member" button
    await page.getByRole("button", { name: buttons.REMOVE_MEMBER_BUTTON }).click();
    // Click on the "Remove" button in the dialog
    await page.getByRole("dialog", { name: dialogs.REMOVE_MEMBER_DIALOG }).getByRole("button", { name: buttons.REMOVE_BUTTON }).click();
    // Check for a message indicating that the member was removed
    expect(await page.getByText(message.MEMBER_REMOVE)).toBeTruthy;
});