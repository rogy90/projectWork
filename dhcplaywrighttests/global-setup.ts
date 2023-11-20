import { chromium, FullConfig } from '@playwright/test';
import * as labels from "./Util/UIElements/labelNames";
import * as data from "./Util/testData";
import * as buttons from "./Util/UIElements/buttonNames";

// Global setup function
async function globalSetup(config: FullConfig) {
  // Extract the base URL and storage state from the config object
  const { baseURL, storageState } = config.projects[0].use;
  // Launch a new Chromium browser in headless mode
  const browser = await chromium.launch({ headless: true });
  // Create a new context for the browser
  const context = await browser.newContext();

  try {
    // Start tracing the browser activity
    await context.tracing.start({ screenshots: true, snapshots: true });
    // Go to the base URL
    const page = await context.newPage();
    await page.goto(baseURL!);
    // Click on the "Accept all cookies" button
    await page.getByRole('button', { name: buttons.COOKIES_ACCEPT_BUTTON }).click();
    // Click on the "Sign in" button
    await page.getByRole('button', { name: buttons.SIGN_IN_BUTTON }).click();
    // Type in the email address
    await page.getByLabel(labels.EMAIL_LABEL).fill(data.USERNAME);
    // Type in the password
    await page.getByLabel(labels.PASSWORD_LABEL).fill(data.PASSWORD);
    // Click on the "Sign in" button
    await page.locator('form').filter({ hasText: 'Email Password Forgot password? Remember me Sign in' }).getByRole('button', { name: buttons.SIGN_IN_BUTTON }).click();
    // Save the current storage state to the specified path
    await context.storageState({ path: storageState as string });
    // Stop tracing and save the trace to a file
    await context.tracing.stop({
      path: './test-results/setup-trace.zip',
    });
    // Close the browser
    await browser.close();
  } catch (error) {
    // If an error occurs, stop tracing and save the trace to a file
    await context.tracing.stop({
      path: './test-results/failed-setup-trace.zip',
    });
    // Close the browser
    await browser.close();
    // Rethrow the error
    throw error;
  }
}
// Export the global setup function
export default globalSetup;