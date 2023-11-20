import { test, expect } from "@playwright/test";
import * as urls from "../../../Util/UIElements/urls";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as dialogs from "../../../Util/UIElements/dialogNames";
import * as data from "../../../Util/testData";
import * as message from "../../../Util/assertions";
test("Remove a guest from the Organization, @regression", async ({ page }) => {
    // Navigate to the organization guests page
    await page.goto(urls.ORG_GUEST_LINK);
    // Click on the guest's name
    await page.getByRole("link", {name: data.GUEST_REMOVE_MAIL}).click();
    // Click on the 'Remove guest' button
    await page.getByRole("button", { name: buttons.REMOVE_GUEST_BUTTON }).first().click();
    // Click on the 'Remove' button in the dialog
    await page.getByRole("dialog", { name: dialogs.REMOVE_GUEST_DIALOG }).getByRole("button", { name: buttons.REMOVE_BUTTON }).click();
    // Check that the confirmation message is displayed
    expect(await page.getByText(message.GUEST_REMOVE)).toBeTruthy();
});