import { test, expect } from '@playwright/test';
import { getRandomFile } from "../../Util/functions";
import * as urls from "../../Util/UIElements/urls";
import * as buttons from "../../Util/UIElements/buttonNames";
import * as message from "../../Util/assertions";

test("Upload an image to Secure image upload section, @regression @smoke", async ({ page }) => {
  // This line navigates the page to the specified URL
  await page.goto(urls.SECURE_IMAGE_UPLOAD);
  // Get the random file
  const randomFile = await getRandomFile();
  // Wait for event filechooser
  const fileChooserPromise = page.waitForEvent("filechooser");
  // This line clicks on the button with the text 'Upload images'
  await page.getByRole("button", { name: buttons.UPLOAD_IMG_BUTTON }).nth(1).click();
  // This line waits for the file chooser dialog to appear
  const fileChooser = await fileChooserPromise;
   // This line sets the selected random file to the file chooser
  await fileChooser.setFiles([randomFile]);
  // Assert the text
  expect(await page.getByText(message.IMAGE_UPLOAD)).toBeTruthy();
});