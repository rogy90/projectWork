import { test } from "@playwright/test";
import * as pageNames from "../../Util/UIElements/linkNames";
import { handleContactUsForm } from "../../Util/functions";
test("Open Contact Us menu item, @regression @smoke", async ({ page }) => {
  // Navigate to the homepage
  await page.goto("/");
  // Locate and click on the 'Contact Us' link
  const contactUsLink = page.locator("a").filter({ hasText: pageNames.CONTACT_US_MENU });
  await handleContactUsForm(page, contactUsLink);
});