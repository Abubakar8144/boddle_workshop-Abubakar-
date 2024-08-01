import { Locator, Page } from "@playwright/test";

export class ClickButtonClass{

    readonly page: Page
    readonly doubleClickBtn: Locator
    readonly doubleClickMsg: Locator
    readonly rightBtn:Locator
    readonly rightClickMsg: Locator
    readonly dynamicClickBtn:Locator
    readonly dynamicClickMsg: Locator

    constructor(page:Page){
        this.page=page
        this.doubleClickBtn=page.locator("button#doubleClickBtn")
        this.doubleClickMsg=page.locator("p#doubleClickMessage")
        this.rightBtn=page.locator("button#rightClickBtn")
        this.rightClickMsg=page.locator("p#rightClickMessage")
        this.dynamicClickBtn=page.locator('xpath=//button[text()="Click Me"]')
        this.dynamicClickMsg=page.locator("p#dynamicClickMessage")
    }
}