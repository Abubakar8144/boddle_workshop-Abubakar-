import { expect, Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class ProgressBarPage extends HomePage{
    readonly page: Page
    readonly startStopButton: Locator
    readonly progressBar: Locator
    readonly progressBarText: Locator
    readonly resetButton: Locator


    constructor(page: Page) {
        super(page)
        this.page = page
        this.startStopButton = page.locator("button#startStopButton")
        this.progressBar = page.locator("#progressBar")
        this.progressBarText = page.locator(`//div[@id="progressBar"]//div`)
        this.resetButton = page.locator("button#resetButton")
    }

}