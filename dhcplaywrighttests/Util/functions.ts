import { expect, Page } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";
import * as mime from "mime";
import * as buttons from "../Util/UIElements/buttonNames";
import * as dialogs from "../Util/UIElements/dialogNames";

// Export an asynchronous function called "openPagesAndVerifyUrls" which takes a "page", "urls", and "linkTexts" argument, and which opens a page for each URL in urls, clicks on the link element with the given text in linkTexts,
// waits for the new page to load, verifies that the URL of the new page matches the expected URL, and then closes the new page.
export const openPagesAndVerifyUrls = async ( page: Page, urls: string | string[],
  linkTexts: string | string[] | { click: () => Promise<void> }) => {
  // Check if linkTexts is an array
  if (Array.isArray(linkTexts)) {
    // Loop through the urls and linkTexts arrays
    for (let i = 0; i < urls.length; i++) {
      // Wait for a "popup" event and click on the link element with the given text
      const [pageNew] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("link", { name: linkTexts[i] }).click(),
      ]);
      // Wait for the new page to load
      await pageNew.waitForLoadState();
      // Verify that the URL of the new page matches the expected URL
      await expect(pageNew).toHaveURL(urls[i]);
      // Close the new page
      await pageNew.close();
    }
  }
  // Check if linkTexts is an object
  else if (typeof linkTexts === "object") {
    // Wait for a "popup" event and click on the link element with the given text
    const [pageNew] = await Promise.all([
      page.waitForEvent("popup"),
      linkTexts.click(),
    ]);
    // Wait for the new page to load
    await pageNew.waitForLoadState();
    // Verify that the URL of the new page matches the expected URL
    await expect(pageNew).toHaveURL(urls[0]);
    // Close the new page
    await pageNew.close();
  }
  // Check if linkTexts is a string
  else if (typeof linkTexts === "string") {
    // Wait for a "popup" event and click on the link element with the given text
    const [pageNew] = await Promise.all([
      page.waitForEvent("popup"),
      page.getByRole("link", { name: linkTexts }).click(),
    ]);
    // Wait for the new page to load
    await pageNew.waitForLoadState();
    // Verify that the URL of the new page matches the expected URL
    await expect(pageNew).toHaveURL(urls[0]);
    // Close the new page
    await pageNew.close();
  }
};

//Clicks on a link or button element with the given text and verifies that there is no error in the download event
export const handleDownloadEvent = async ( page: Page, downloadButton: string | string[] | { click: () => Promise<void> }) => {
  // Wait for a "download" event and click on the link or button element with the given text or locator
  const [downloadEvent] = await Promise.all([
    page.waitForEvent("download"),
    typeof downloadButton === "string"
      ? page.getByRole("link", { name: downloadButton }).click()
      : Array.isArray(downloadButton)
      ? Promise.all(downloadButton.map((text) => page.getByRole("link", { name: text }).click()))
      : downloadButton.click(),
  ]);
  // Check if there was an error during the download
  const failureReason = await downloadEvent.failure();
  // Verify that there is no error during the download
  expect(failureReason).toBe(null);
};

// This function changes the access level of the first project user
export const changeForFirstProjectUserAccessLevel = async (page: Page): Promise<void> => {
  // Click on the switch to show the access level options
  await page.getByRole("switch").click();
  // Get the current access level of the user
  var accessLevel = await page.locator("a[role='button'].ant-dropdown-trigger >> nth=0").innerText();
  // Check the current access level and change it to the next level as per the test requirements
  if (accessLevel === "Editor") {
    // Click on the "Editor" button to change to "View-only"
    await page.getByRole("button", { name: "Editor" }).first().click();
    // Click on the "View-only" option in the dropdown
    await page.getByRole("menuitem", { name: "View-only" }).getByRole("button", { name: "View-only" }).click();
    } 
  else if (accessLevel === "View-only") {
    // Click on the "View-only" button to change to "No access"
    await page.getByRole("button", { name: "View-only" }).first().click();
    // Click on the "No access" option in the dropdown
    await page.getByRole("menuitem", { name: "No access" }).getByRole("button", { name: "No access" }).click();
    } 
  else if (accessLevel === "No access") {
    // Click on the "No access" button to change to "Editor"
    await page.getByRole("button", { name: "No access" }).first().click();
    // Click on the "Editor" option in the dropdown
    await page.getByRole("menuitem", { name: "Editor" }).getByRole("button", { name: "Editor" }).click();
  }
};

// Export an asynchronous function called "memberRoleChange" which takes a "page" argument and which changes a member's access level
export const memberRoleChange = async (page: Page): Promise<void> => {
  // Click on the switch to change the member's access level
  await page.getByRole("switch").click();
  // Get the inner text of the access level dropdown menu
  var memberRole = await page.locator(".ant-select-selector").innerText();
  // Check if the current access level is "Admin"
  if (memberRole === "Admin") {
    // Click on the dropdown menu to select a new access level
    await page.locator(".ant-select-selector").click();
    // Click on the "Member" option in the dropdown menu
    await page.getByText("Member", { exact: true }).click();
  } else {
    // Click on the dropdown menu to select a new access level
    await page.locator(".ant-select-selector").click();
    // Click on the "Admin" option in the dropdown menu
    await page.getByText("Admin", { exact: true }).click();
  }
};

// Export an asynchronous function called "handleContactUsForm" which takes a "page" and "button" argument, and which handles the contact us form
export const handleContactUsForm = async ( page: Page, button: any): Promise<void> => {
  // Click on the button to open the contact sales form
  await button.click();
  // Click on the "submit" button to submit the form
  await page.getByRole("button", { name: buttons.SUBMIT_BUTTON }).click();
  // Click on the "close" button to close the contact sales dialog
  await page.getByRole("dialog", { name: dialogs.CONTACT_SALES_DIALOG }).getByRole("button", { name: buttons.CLOSE_BUTTON }).click();
};

// Define the function that returns a Promise of a random image file
export const getRandomFile = async (): Promise<{ name: string; mimeType: string; buffer: Buffer; }> => {
  // Define the path to the directory containing the image files
  const directory: string = "C:\\downloadAll";
  // Read the directory and filter out any non-image files based on the file extension
  const files: string[] = fs
    .readdirSync(directory)
    .filter((file: string) => /\.(jpe?g)$/i.test(file));
  // Throw an error if no image files are found in the directory
  if (files.length === 0) {
    throw new Error("No image files found in directory");
  }
  // Select a random index from the array of image files
  const randomIndex: number = Math.floor(Math.random() * files.length);
  // Construct the file path for the randomly selected image file
  const filePath: string = path.join(directory, files[randomIndex]);
  // Read the contents of the randomly selected image file into a buffer
  const fileContent: Buffer = fs.readFileSync(filePath);
  // Get the MIME type of the randomly selected image file using the `mime` module
  const mimeType: string = mime.getType(filePath) || "application/octet-stream";
  // Return an object representing the randomly selected image file, including the file name, MIME type, and buffer of file contents
  return { name: files[randomIndex], mimeType, buffer: fileContent };
};

// Define an object with two network conditions, 'Slow 3G' and 'Fast 3G', which contains download, upload, and latency values to simulate network conditions
const networkConditions: Record<string,{ download: number; upload: number; latency: number } > = {
  "Slow 3G": {
    // Set download speed to 500 kbps and multiply by 0.8 to simulate a slower connection
    download: ((500 * 1000) / 8) * 0.8, 
    // Set upload speed to 500 kbps and multiply by 0.8 to simulate a slower connection
    upload: ((500 * 1000) / 8) * 0.8, 
     // Set latency to 400ms multiplied by 5 to simulate a slower connection
    latency: 400 * 5
    },
  "Fast 3G": {
    // Set download speed to 1.6 Mbps and multiply by 0.9 to simulate a faster connection
    download: ((1.6 * 1000 * 1000) / 8) * 0.9, 
    // Set upload speed to 750 kbps and multiply by 0.9 to simulate a faster connection
    upload: ((750 * 1000) / 8) * 0.9,
     // Set latency to 150ms multiplied by 3.75 to simulate a faster connection
    latency: 150 * 3.75
  },
};

// Export an asynchronous function called "withSlowNetwork" which takes a "page" argument,
// and which sets network conditions to a slow 3G connection.
export const withSlowNetwork = async (page: Page): Promise<void> => {
  // Create a new CDP session using the page context
  const cdpSession = await page.context().newCDPSession(page);
  // Set network conditions using the CDP session
  await cdpSession.send("Network.emulateNetworkConditions", {
    // Set download throughput to the "Fast 3G" download speed from the "networkConditions" object
    downloadThroughput: networkConditions["Fast 3G"].download,
    // Set upload throughput to the "Fast 3G" upload speed from the "networkConditions" object
    uploadThroughput: networkConditions["Fast 3G"].upload,
    // Set latency to the "Slow 3G" latency from the "networkConditions" object
    latency: networkConditions["Slow 3G"].latency,
    // Set "offline" flag to false, meaning the connection is online
    offline: false,
  });
};

// Export an asynchronous function called "restoreStorageState"
// which takes a "page" argument, and which restores the storage state of the page
export const restoreStorageState = async (page: Page): Promise<void> => {
  // Add an initialization script to the page context
  await page.context().addInitScript(() => {
    // Get the storage state from localStorage and parse it into a JavaScript object
    const state = JSON.parse(localStorage.getItem("storageState")!);
    // Loop through each key in the storage state object
    for (const key in state) {
      // Set the value of each key in localStorage to the corresponding value in the storage state object
      localStorage.setItem(key, state[key]);
    }
  });
};