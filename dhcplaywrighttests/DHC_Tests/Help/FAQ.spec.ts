import { test } from "@playwright/test";
import * as pageNames from "../../Util/UIElements/linkNames";
test("FAQ, @regression", async ({ page }) => {
    // Visit the homepage
    await page.goto("/");
    // Click on the 'Help' button
    await page.locator("a").filter({ hasText: pageNames.HELP_MENU }).first().click();
    await page.getByRole("link", { name: pageNames.FAQ_MENU }).click();
    // Click on the 'Why would I join an organization?' button
    await page.getByRole("button", { name: "Why would I join an organization?" }).click();
    // Click on the 'How to join an existing organization?' button
    await page.getByRole("button", { name: "How to join an existing organization?" }).click();
    // Click on the 'How to add members to an organization?' button
    await page.getByRole("button", { name: "How to add members to an organization?" }).click();
    // Click on the 'Files' button
    await page.getByRole("button", { name: "Files" }).click();
    // Click on the 'What is the difference between organization admin, member and guest?' button
    await page.getByRole("button", {name:"What is the difference between organization admin, member and guest?",}).click();
    // Click on the 'Project' button
    await page.getByRole("button", { name: "Project" }).click();
    // Click on the 'What is a project?' button
    await page.getByRole("button", { name: "What is a project?" }).click();
});