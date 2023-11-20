import { test, expect } from "@playwright/test";
import { memberRoleChange } from "../../../Util/functions";
import * as urls from "../../../Util/UIElements/urls";
import * as data from "../../../Util/testData";
import * as message from "../../../Util/assertions";
// Define a test that changes a member's access level inside the Organization
test("Change member access level inside the Organization, @regression @smoke", async ({ page }) => {
  // Go to the organization's members page
  await page.goto(urls.ORG_MEMBER_LINK);
  // Click on the member's name, which also serves as a link
  await page.getByRole("link", { name: data.MEMBER_ACCESS_CHANGE_MAIL }).click();
  // Change member's role in the Organization
  await memberRoleChange(page);
  // Assert the message if the member's role is changed
  expect(await page.getByText(message.MEMBER_ROLE_CHANGE)).toBeTruthy();
});