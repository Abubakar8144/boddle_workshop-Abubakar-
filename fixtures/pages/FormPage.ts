import { expect, Locator, Page } from "@playwright/test";

export class FormsPage{

    readonly page: Page
    readonly username:Locator
    readonly userEmail: Locator
    readonly currentAddressField: Locator
    readonly permanentAddressField: Locator
    readonly submitBtn: Locator
    readonly nameResult: Locator
    readonly emailResult: Locator
    readonly currentAddressResultField: Locator
    readonly permanentAddressResultField:Locator

    constructor(page:Page){

        this.page=page
        this.username=page.locator("#userName")
        this.userEmail=page.locator("#userEmail")
        this.currentAddressField=page.locator("textarea#currentAddress")
        this.permanentAddressField=page.locator("textarea#permanentAddress")
        this.submitBtn=page.locator("button#submit")
        this.nameResult=page.locator("p#name")
        this.emailResult=page.locator("p#email")
        this.currentAddressResultField=page.locator("p#currentAddress")
        this.permanentAddressResultField=page.locator("p#permanentAddress")
    }

    async fillFormRegistration(name,email,currentAddress,permanentAddress){
        await this.username.fill(name)
        await this.userEmail.fill(email)
        await this.currentAddressField.fill(currentAddress)
        await this.permanentAddressField.fill(permanentAddress)
        await this.submitBtn.click()
    }

    async validateInputedValues(name, email, currentAddress, permanentAddress){
        await expect(await this.nameResult).toHaveText(`Name:${name}`)
        await expect(await this.emailResult).toHaveText(`Email:${email}`)
        await expect(await this.currentAddressResultField).toHaveText(`Current Address :${currentAddress}`)
        await expect(await this.permanentAddressResultField).toHaveText(`Permananet Address :${permanentAddress}`)
    }

}