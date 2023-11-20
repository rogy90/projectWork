import { test } from "@playwright/test";
import * as pageName from "../../Util/UIElements/linkNames";
test("Navigate through Organization menu, @regression", async ({ page }) => {
    // Visit the homepage
    await page.goto("/");
    // Click the Organization link
    await page.locator("a").filter({ hasText: pageName.ORGANIZAION }).click();
    // Click on the "Guests" menu item
    await page.locator("[data-menu-id*='/guests']").click();
    // Click on the "Details" menu item
    await page.locator("li[class='ant-menu-overflow-item ant-menu-item']:has-text('Details')").click();
    // Click on the "Projects" menu item
    await page.locator("[data-menu-id*='/projects']").click();
    // Click on the "Members" menu item
    await page.locator("[data-menu-id*='/members']").click();
});