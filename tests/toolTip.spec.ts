import test, { expect } from "@playwright/test";
import { ToolTipsPage } from "../pages/ToolTipsPage";
import { Fixtures } from "@playwright/test";
const fixturesData = require("../fixtures/fixtures.json")

test.beforeEach(async ({ page }) => {
    //--------------------Navigation---------------------//

    //navigating to 'demoqa.com' using base url
    await page.goto("/")

    //navigating to Widgets
    await page.locator(".card-body").getByText("Widgets").click();

    //Clicking tool-tips section
    await page.locator(".text").getByText("Tool tips").click()

    //Validating the url and Tool Tips page
    await expect(await page.locator(".text-center")).toBeVisible()
    await expect(page.url()).toContain('https://demoqa.com/tool-tips')

})

test("Tool Tips Button", async ({ page }) => {

    const toolTipsPage = new ToolTipsPage(page)

    //hovering over button and validating the action 
    await toolTipsPage.hoverAndValidateToolTip(toolTipsPage.hoverButton, fixturesData.validateToolTipButton, page)
})

test("Tool Tips Text Field", async ({ page }) => {

    const toolTipsPage = new ToolTipsPage(page)

    //hovering over text-field and validating the action
    await toolTipsPage.hoverAndValidateToolTip(toolTipsPage.hoverTextField, fixturesData.validateToolTipTextField, page)

})

test("Tool Tips Contrary Text", async ({ page }) => {

    const toolTipsPage = new ToolTipsPage(page)

    //hovering over Contrary Text and validating the action
    await toolTipsPage.hoverAndValidateToolTip(toolTipsPage.hoverContraryText, fixturesData.validateToolTipContraryText, page)

})

test("Tool Tips Number", async ({ page }) => {

    const toolTipsPage = new ToolTipsPage(page)

    //hovering over Number(1.10.32) and validating the action
    await toolTipsPage.hoverAndValidateToolTip(toolTipsPage.hoverNumberText, fixturesData.validateToolTipNumber, page)

})