import { Locator, Page } from "@playwright/test";

export class DragAndDropPage {

    readonly page:Page
    readonly dragLocator:Locator
    readonly dropLocator: Locator
    readonly dropContainerColor: Locator

    constructor(page:Page) {
        this.page = page
        this.dragLocator = page.locator("#draggable")
        this.dropLocator = page.locator(`//div[@id="simpleDropContainer"]//div[@id="droppable"]`)
        this.dropContainerColor = page.locator(".drop-box.ui-droppable.ui-state-highlight")
        
    }
}