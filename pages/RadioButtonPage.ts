import { expect, Locator, Page } from "@playwright/test";


export class RadioButtonClass{
    readonly page: Page
    readonly yesRadio: Locator
    readonly resultLabel: Locator
    readonly impressiveRadio: Locator

    constructor(page:Page){
        this.page= page
        this.yesRadio=page.locator("#yesRadio")
        this.resultLabel=page.locator(".mt-3")
        this.impressiveRadio=page.locator("#impressiveRadio")
    }

    async selectRadioButtonDynamically(page,index) {
        //Defining an xpath to identify the radio buttons using their indexes
        const locator = `//div[@class="custom-control custom-radio custom-control-inline"][${index}]`
        const mainLabel = await page.locator(`${locator}/label`).innerText()

        //Selecting the radio button
        await page.locator(`${locator}/input`).check({force:true})

        //Validating the results
        const isChecked = await page.locator(`${locator}/input`).isChecked()
        expect(isChecked).toBeTruthy()

        return mainLabel
   }
}