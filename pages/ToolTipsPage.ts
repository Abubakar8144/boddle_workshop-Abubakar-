import { expect, Locator, Page } from "@playwright/test";

export class ToolTipsPage {
    readonly page: Page
    readonly hoverButton: Locator
    readonly hoverTextField: Locator
    readonly hoverContraryText: Locator
    readonly hoverNumberText: Locator
    readonly toolTip: Locator


    constructor(page: Page) {
        this.page = page
        this.hoverButton = page.locator("button#toolTipButton")
        this.hoverTextField = page.locator("input#toolTipTextField")
        this.hoverContraryText = page.locator("a").getByText("Contrary")
        this.hoverNumberText = page.locator("a").getByText("1.10.32")
        this.toolTip = page.locator(".tooltip-inner")

    }


    async hoverAndValidateToolTip(locator:Locator, tooltipText:string, page: Page) {
        await locator.scrollIntoViewIfNeeded()
        await page.waitForTimeout(1000)
        await locator.hover()

        let isToolTipVisible = await this.toolTip.isVisible()
        
        if(isToolTipVisible == true)
        {
            await expect(await this.toolTip).toHaveText(`You hovered over the `+ tooltipText)
        }
        else
        {
            await locator.hover()
            await expect(await this.toolTip).toHaveText(`You hovered over the `+ tooltipText)
        }
    }

}