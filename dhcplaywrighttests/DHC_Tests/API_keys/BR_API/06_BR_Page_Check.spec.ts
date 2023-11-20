import { test } from "@playwright/test";
import { openPagesAndVerifyUrls } from "../../../Util/functions";
import * as urls from "../../../Util/UIElements/urls";
import * as buttons from "../../../Util/UIElements/buttonNames";
import * as pageNames from "../../../Util/UIElements/linkNames";
import * as data from "../../../Util/testData";
// Define an array of link texts to be clicked on the page
const LINK_TEXTS: string[] = [
  pageNames.DOCUMENTATION_READ,
  pageNames.TERMS_OF_SERVICE,
  buttons.VISIT_HELP_CENTER_BUTTON
];
// Define an array of URLs to verify on the page
const URL_LINKS: string[] = [
  urls.BLINK_RECEIPT_DOC_READ,
  urls.TERMS_OF_SERVICE_LINK,
  urls.HELP_CENTER_LINK
];
test.skip("Check BR Cloud Api links, @regression", async ({ page }) => {
  // Visit the specific API key page
  await page.goto(urls.BR_CLOUD_API_LINK + data.BR_API_PAGE_CHECK_ID);
  // Wait for a 'popup' event to occur, and click on the defined link texts
  await openPagesAndVerifyUrls(page, URL_LINKS, LINK_TEXTS);
});