import { test, expect } from "@playwright/test";
import * as urls from "../../../Util/UIElements/urls";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as message from "../../../Util/assertions";

test.skip("Regenerate credentials, @regression", async ({ page }) => {
  // Visit the Cloud API
  await page.goto(urls.CLOUD_API_LINK);
  // Click on the existing API license
  await page.locator("app-mb-api-my-licenses >> text = BlinkID").click();
  // Click on the button "REGENERATE CREDENTIALS"
  await page.getByRole("button", { name: buttons.REGENERATE_CRED_BUTTON }).click();
  // Click on the button "REGENERATE"
  await page.locator("buttons").getByRole("button", { name: buttons.REGENERATE_BUTTON }).click();
  // Assert if the new credentials are regenerated
  expect(await page.getByText(message.CLOUD_API_NEW_CREDENTIALS)).toBeTruthy();
  await page.getByRole('button', { name: buttons.CLOSE_BUTTON }).filter({ hasText: buttons.CLOSE_BUTTON}).click();
});