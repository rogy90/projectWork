import { test, expect } from "@playwright/test";
import * as urls from "../../../Util/UIElements/urls";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as data from "../../../Util/testData";
import * as message from "../../../Util/assertions";
test.skip("Create new free trial Cloud api, @regression @smoke", async ({ page }) => {
  // Visit the Cloud API
  await page.goto(urls.CLOUD_API_LINK);
  // Click the "Try for free" button
  await page.getByRole("button", { name: buttons.TRY_FOR_FREE_BUTTON }).click();
  // Fill the input field with "test.com"
  await page.getByPlaceholder("example: microblink.com").fill(data.CLOUD_API_DOMAIN);
  // Click on confirmation checkbox"
  await page.locator("app-mb-api-tos-confirmation div").nth(2).click();
  // Click the "CREATE" button
  await page.getByRole("button", { name: buttons.CREATE_BUTTON }).click();
  expect(await page.waitForSelector(`text=${message.CLOUD_API_CREATED}`)).toBeTruthy();
  // Click the "CONTINUE" button
  await page.getByRole("button", { name: buttons.CONTINUE_BUTTON }).click();
  // Click the "Close" button
  await page.getByRole('button', { name: buttons.CLOSE_BUTTON }).filter({ hasText: buttons.CLOSE_BUTTON}).click();
});