import { test } from "@playwright/test";
import * as buttons from "../../Util/UIElements/buttonNames";
import * as pageNames from "../../Util/UIElements/linkNames";

test("Open Notification Settings menu item, @regression", async ({ page }) => {
  // Go to the homepage
  await page.goto("/");
  // Click on the 'Notification preference' link
  const notificationPreference = page.locator("a").filter({ hasText: pageNames.NOTIFICATION_SETTINGS_MENU });
  await notificationPreference.click();
  // Turn off the switch for "Your organization gets updated"
  const organizationSwitch = page.locator("div:nth-child(4) > .mb-flex__child-sm > .ant-switch").first();
  await organizationSwitch.click();
  // Turn on the switch for "New file in your File section"
  const fileSwitch = page.locator("div:nth-child(3) > .mb-margin-bottom-md > .mb-flex__child-sm > .ant-switch");
  await fileSwitch.click();
  // Click on the "Reset to default" button
  const resetButton = page.getByRole("button", { name: buttons.RESET_TO_DEFAULT_BUTTON });
  await resetButton.click();
  // Click on the "Manage subscription" button
  const manageSubButton = page.getByRole("button", { name: buttons.MANAGE_SUBSCRIPTION_BUTTON });
  await manageSubButton.click();
  // Click on the "Submit" button
  const submitButton = page.getByRole("button", { name: buttons.SUBMIT_BUTTON });
  await submitButton.click();
  // Click on the "Close" button
  const closeButton = page.getByRole("button", { name: buttons.CLOSE_BUTTON });
  await closeButton.click();
});
