import { test, expect } from '@playwright/test';
import * as dialogs from '../../../Util/UIElements/dialogNames';
import * as urls from '../../../Util/UIElements/urls';
import * as buttons from '../../../Util/UIElements/buttonNames';
import * as message from '../../../Util/assertions';
import * as data from '../../../Util/testData';
test.skip('Deactivate BR Cloud api, @regression', async ({ page }) => {
  // Visit the specific API key page
  await page.goto(urls.BR_CLOUD_API_LINK + data.BR_API_ACTIVE_ID);
  // Click on "Deactivate" button
  await page.getByRole('button', { name: buttons.DEACTIVATE_BUTTON }).click();
  // Confirm the deactivation by clicking on the "Deactivate" button in the dialog
  await page.getByRole('dialog', { name: dialogs.DEACTIVATE_BR_API }).getByRole('button', { name: buttons.DEACTIVATE_BUTTON }).click();
  // Assert that the API key has been deactivated successfully by checking the success message
  expect(await page.getByText(message.API_KEY_DEACTIVATED)).toBeTruthy();
  // Click on the "Close" button to close the dialog
  await page.getByRole('button', { name: buttons.CLOSE_BUTTON }).filter({ hasText: buttons.CLOSE_BUTTON }).click();
});