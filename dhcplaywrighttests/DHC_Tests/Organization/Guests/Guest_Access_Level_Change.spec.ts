import { test, expect } from "@playwright/test";
import { changeForFirstProjectUserAccessLevel } from "../../../Util/functions";
import * as urls from "../../../Util/UIElements/urls";
import * as data from "../../../Util/testData";
import * as message from "../../../Util/assertions";
test("Change guest's access level, @regression @smoke", async ({ page }) => {
  // Navigate to the organization guests page
  await page.goto(urls.ORG_GUEST_LINK);
  // Click on the guest's name
  await page.getByRole("link", {name: data.GUEST_ACCESS_CHANGE_MAIL}).first().click();
  // Change the access level for the first project
  await changeForFirstProjectUserAccessLevel(page);
  // Check if the access level change message is displayed
  expect(await page.getByText(message.GUEST_PROJECT_ACCESS_CHANGE)).toBeTruthy();
});