import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../Util/functions";
import * as pageNames from "./../../Util/UIElements/linkNames";
import * as urls from "./../../Util/UIElements/urls";
test("Open Documentation Identity Verification menu items, @regression", async ({ page }) => {
  // Navigate to the documentation link
  await page.goto(urls.DOCUMENTATION_LINK);
  // Click on the "Documentation" link in the page
  await page.locator("a").filter({ hasText: pageNames.DOCUMENTATION_MENU }).click();
  // Click on the "Identity Verification" link
  await page.getByRole("link", { name: pageNames.IDENTITY_VER }).nth(1).click();
  // Open the pages and verify the URLs of the links
  await openPagesAndVerifyUrls(page, [urls.IDENTITY_VER_LEARN_LINK.toString()], pageNames.IDENTITY_VER_LEARN);
});