import test, { expect } from "@playwright/test";
import { ToolTipsPage } from "../pages/ToolTipsPage";
import { Fixtures } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
const fixturesData = require("../fixtures/fixtures.json")

test.beforeEach(async ({ page }) => {
    //--------------------Navigation---------------------//

    const homePage = new HomePage(page)

    await page.goto("/")
    await homePage.naviagteToPage("Widgets","Tool Tips")

})

test("Tool Tips Button", async ({ page }) => {

    //page.setViewportSize({width: 2560, height:1080})
    const toolTipsPage = new ToolTipsPage(page)

    //hovering over button and validating the action 
    await toolTipsPage.hoverAndValidateToolTip(toolTipsPage.hoverButton, fixturesData.validateToolTipButton, page)
})

test("Tool Tips Text Field", async ({ page }) => {

    //page.setViewportSize({width: 2560, height:1080})
    const toolTipsPage = new ToolTipsPage(page)

    //hovering over text-field and validating the action
    await toolTipsPage.hoverAndValidateToolTip(toolTipsPage.hoverTextField, fixturesData.validateToolTipTextField, page)

})

test("Tool Tips Contrary Text", async ({ page }) => {

    //page.setViewportSize({width: 2560, height:1080})
    const toolTipsPage = new ToolTipsPage(page)

    //hovering over Contrary Text and validating the action
    await toolTipsPage.hoverAndValidateToolTip(toolTipsPage.hoverContraryText, fixturesData.validateToolTipContraryText, page)

})

test("Tool Tips Number", async ({ page }) => {

   // page.setViewportSize({width: 2560, height:1080})
    const toolTipsPage = new ToolTipsPage(page)

    //hovering over Number(1.10.32) and validating the action
    await toolTipsPage.hoverAndValidateToolTip(toolTipsPage.hoverNumberText, fixturesData.validateToolTipNumber, page)

})