import { expect, Locator, Page } from "@playwright/test";

export class HomePage{
    static super() {
        throw new Error("Method not implemented.");
    }

    readonly page: Page
    readonly cardBodyElement: Locator
    readonly webTablesButton:Locator

    constructor(page:Page){
        this.page=page
        this.cardBodyElement=page.locator(".card-body").getByText("Elements")
        this.webTablesButton=page.locator(".text").getByText("Web Tables")
    }
    async naviagteToWebTablesPage(){
        await this.page.goto("/")
        await this.cardBodyElement.click()
        await this.webTablesButton.click()
    }
}