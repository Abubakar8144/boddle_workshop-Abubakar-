import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    static super() {
        throw new Error("Method not implemented.");
    }

    readonly page: Page
    readonly cardBodyElement: Locator
    readonly tablesButton: Locator
    readonly header: Locator

    constructor(page: Page) {
        this.page = page
        this.cardBodyElement = page.locator(".card-body")
        this.tablesButton = page.locator(".text")
        this.header = page.locator(".text-center")

    }
    async naviagteToPage(element: string, tableButton: string) {
        
        await this.cardBodyElement.getByText(element).click()
        await this.tablesButton.getByText(tableButton).click()
        await expect(await this.header).toBeVisible()

    }
}