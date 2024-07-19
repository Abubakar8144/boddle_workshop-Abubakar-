import { Locator, Page } from "@playwright/test";

export class HomePage{

    readonly page: Page
    readonly cardBodyElement: Locator
    readonly textBoxButton:Locator

    constructor(page:Page){
        this.page=page
        this.cardBodyElement=page.locator(".card-body").getByText("Elements")
        this.textBoxButton=page.locator(".text").getByText("Radio Button")
    }
    async naviagteToTextBoxPage(){
        this.cardBodyElement.click()
        this.textBoxButton.click()

    }
}