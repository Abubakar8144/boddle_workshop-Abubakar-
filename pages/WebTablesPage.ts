import { expect, Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class WebTables extends HomePage{

    readonly page:Page
    readonly header:Locator
    readonly addButton: Locator
    readonly firstNameField:Locator
    readonly lastNameField:Locator
    readonly emailField:Locator
    readonly ageField:Locator
    readonly salaryField:Locator
    readonly departmentField:Locator
    readonly submitButton:Locator


     constructor(page:Page){

        super(page)
        this.page=page
        this.header=page.locator(".text-center")
        this.addButton=page.locator("#addNewRecordButton")
        this.firstNameField=page.locator("input#firstName")
        this.lastNameField=page.locator("input#lastName")
        this.emailField=page.locator("input#userEmail")
        this.ageField=page.locator("input#age")
        this.salaryField=page.locator("input#salary")
        this.departmentField=page.locator("input#department")
        this.submitButton=page.locator("button#submit")
             

    }

    async validateNavigationToWebTablesPage(){
        await this.page.waitForLoadState("domcontentloaded")
        await expect(await this.header).toBeVisible()
        await expect(this.page.url()).toContain('https://demoqa.com/webtables')
    }
    async clickAddButton(){
        await this.addButton.click()
    }

    async fillRegisterEntries(fname,lname,email,age,salary,department){
        await this.firstNameField.fill(fname)
        await this.lastNameField.fill(lname)
        await this.emailField.fill(email)
        await this.ageField.fill(age)
        await this.salaryField.fill(salary)
        await this.departmentField.fill(department)
        await this.submitButton.click()

    }

    async validatingRegisteredEntry(fname,lname,email,age,salary,department,index, page:Page){
        await expect(await page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][1]`)).toHaveText(fname)
        await expect(await page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][2]`)).toHaveText(lname)
        await expect(await page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][4]`)).toHaveText(email)
        await expect(await page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][3]`)).toHaveText(age)
        await expect(await page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][5]`)).toHaveText(salary)
        await expect(await page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][6]`)).toHaveText(department)

    }

    async editEntry(entry,page:Page){
       await page.locator("span#edit-record-"+entry).click()
     }

    //Function for Locators for the validation of registered entries
    async locatorsForRegisterationValidation(index, page:Page){        
        page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][1]`)
        page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][2]`)
        page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][3]`)
        page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][4]`)
        page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][5]`)
        page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][6]`)
    }
}