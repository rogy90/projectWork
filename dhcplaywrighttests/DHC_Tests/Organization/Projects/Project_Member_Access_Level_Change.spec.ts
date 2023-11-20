import { test, expect } from "@playwright/test";
import { changeForFirstProjectUserAccessLevel } from "../../../Util/functions";
import * as urls from "../../../Util/UIElements/urls";
import * as data from "../../../Util/testData";
import * as message from "../../../Util/assertions";
test("Change the access level of project's member, @regression", async ({page}) => {
    // Navigate to the organization projects page
    await page.goto(urls.ORG_PROJECT_LINK);
    // Click on the default project
    await page.getByRole('link', {name: data.PROJECT}).click();
    // Change the access level for the first project
    await changeForFirstProjectUserAccessLevel(page);
    // Check that the confirmation message is displayed
    expect(await page.getByText(message.MEMBER_PROJECT_ACCESS_CHANGE)).toBeTruthy();
});