import { test, expect } from "@playwright/test";
import { changeForFirstProjectUserAccessLevel } from "../../../Util/functions";
import * as urls from "../../../Util/UIElements/urls";
import * as data from "../../../Util/testData";
import * as message from "../../../Util/assertions";
test("Change project access for an Organization member, @regression", async ({ page }) => {
    // Go to the organization members page
    await page.goto(urls.ORG_MEMBER_LINK);
    // Click on the member's name
    await page.getByRole("link", {name: data.MEMBER_PROJECT_ACCESS_CHANGE_MAIL}).click();
    // Change member access level for first project
    await changeForFirstProjectUserAccessLevel(page);
    // Check that the confirmation message is displayed
    expect(await page.getByText(message.MEMBER_PROJECT_ACCESS_CHANGE)).toBeTruthy();
});