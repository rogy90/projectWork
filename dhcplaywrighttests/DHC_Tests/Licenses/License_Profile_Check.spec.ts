import { test } from "@playwright/test";
import { openPagesAndVerifyUrls, handleDownloadEvent, handleContactUsForm } from "../../Util/functions";
import * as pageName from "../../Util/UIElements/linkNames";
import * as buttons from "../../Util/UIElements/buttonNames";
import * as urls from "../../Util/UIElements/urls";

const URLS: string[] = [
  urls.PDF417_ANDROID_SDK_LINK,
  urls.HELP_CENTER_LINK,
  urls.CONTACT_SUPPORT_LINK,
  urls.TERMS_OF_USE_LINK
];

const LINK_TEXTS: string[] = [
  pageName.DOCUMENTATION_READ,
  pageName.HELP_CENTER,
  pageName.CONTACT_SUPPORT,
  pageName.TERMS_OF_USE
];

test("Check license profile, @regression @smoke", async ({ page }) => {
  // Go to the Home page
  await page.goto(urls.PDF417_LICENSE_TRIAL);
  
  // Check Contact Us form if buttonContactSales exists
  const buttonContactSales = await page.$(`button:has-text("${buttons.CONTACT_SALES_BUTTON}")`);
  if (buttonContactSales) {
    await handleContactUsForm(page, buttonContactSales);
  }
  // Open the documentation link
  // Open the Help center link
  // Open the Contact support link
  // Open the Terms of use link
  await openPagesAndVerifyUrls(page, URLS, LINK_TEXTS);
  // Handle download events for Docker
  await handleDownloadEvent(page, buttons.DOWNLOAD_DOCKER_BUTTON);
  // Click on Get license key button
  await page.getByRole("button", { name: buttons.GET_LICENSE_KEY }).click();
  // Handle download events for Key
  await handleDownloadEvent(page, buttons.DOWNLOAD_KEY_BUTTON);
  // Check the copy of the license key
  await page.getByRole("button", { name: buttons.GET_LICENSE_KEY }).click();
  await page.getByText("Copy key").click();
  // Handle download events for Package
  await handleDownloadEvent(page, buttons.DOWNLOAD_PACKAGE_BUTTON);
  // Switch to History tab
  await page.locator("[data-menu-id*='/history']").click();
  // Show full list of features
  await page.getByRole("link", { name: "full list here" }).click();
  await page.getByRole("heading", { name: "License details" }).click();
  await page.getByRole('button', { name: buttons.CLOSE_BUTTON }).click();
  // Check download of license platform key
  await handleDownloadEvent(page, '𐋴');
});
