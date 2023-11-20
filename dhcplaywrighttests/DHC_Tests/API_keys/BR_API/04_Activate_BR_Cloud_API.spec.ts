import { test, expect } from '@playwright/test';
import * as dialogs from '../../../Util/UIElements/dialogNames';
import * as urls from '../../../Util/UIElements/urls';
import * as buttons from '../../../Util/UIElements/buttonNames';
import * as message from '../../../Util/assertions';
import * as data from '../../../Util/testData';

test.skip('Activate BR Cloud Api, @regression', async ({ page }) => {
  // Visit the specific API key page
  await page.goto(urls.BR_CLOUD_API_LINK + data.BR_API_INACTIVE_ID);
  // Click on the "Activate" button
  await page.getByRole('button', { name: buttons.ACTIVATE_BUTTON }).click();
  // Confirm the action by clicking on the "Activate" button in the dialog box
  await page.getByRole('dialog', { name: dialogs.ACTIVATE_BR_API }).getByRole('button', { name: buttons.ACTIVATE_BUTTON }).click();
  // Check that the API key is activated by checking for the text "API key is activated"
  expect(await page.getByText(message.API_KEY_ACTIVATED)).toBeTruthy();
  // Close the dialog box by clicking on the "Close" button
  await page.getByRole('button', { name: buttons.CLOSE_BUTTON }).filter({ hasText: buttons.CLOSE_BUTTON }).click();
});