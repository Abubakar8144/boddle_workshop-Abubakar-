import { Locator, Page } from "@playwright/test";

export class FormsPage{

    readonly page: Page
    readonly username:Locator
    readonly userEmail: Locator
    readonly currentAddress: Locator
    readonly permanentAddress: Locator
    readonly submitBtn: Locator
    readonly nameResult: Locator
    readonly emailResult: Locator
    readonly currentAddressResult: Locator
    readonly permanentAddressResult:Locator

    constructor(page:Page){

        this.page=page
        this.username=page.locator("#userName")
        this.userEmail=page.locator("#userEmail")
        this.currentAddress=page.locator("#currentAddress")
        this.permanentAddress=page.locator("#permanentAddress")
        this.submitBtn=page.locator("#submit")
        this.nameResult=page.locator("#name")
        this.emailResult=page.locator("#email")
        this.currentAddressResult=page.locator("p#currentAddress")
        this.permanentAddressResult=page.locator("p#permanentAddress")
    }

}