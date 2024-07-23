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
    //Removed readonly from below locators as we are writing them during the function call
    firstNameCheck:Locator
    lasttNameCheck:Locator
    emailCheck:Locator
    ageCheck:Locator
    salaryCheck:Locator
    departmentCheck:Locator
    editButton: Locator
    



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
        this.locatorsForRegisterationValidation(4) //Here the default value is set to 4 as the new entry is added at 4th row
        this.editEntry
        

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

    async validatingRegisteredEntry(fname,lname,email,age,salary,department){
        await expect(await this.firstNameCheck).toHaveText(fname)
        await expect(await this.lasttNameCheck).toHaveText(lname)
        await expect(await this.emailCheck).toHaveText(email)
        await expect(await this.ageCheck).toHaveText(age)
        await expect(await this.salaryCheck).toHaveText(salary)
        await expect(await this.departmentCheck).toHaveText(department)

    }

    async editEntry(entry){
        this.editButton=this.page.locator("span#edit-record-"+entry)
        await this.editButton.click()
    }

    //Function for Locators for the validation of registered entries
    async locatorsForRegisterationValidation(index){        
        this.firstNameCheck=this.page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][1]`)
        this.lasttNameCheck=this.page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][2]`)
        this.ageCheck=this.page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][3]`)
        this.emailCheck=this.page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][4]`)
        this.salaryCheck=this.page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][5]`)
        this.departmentCheck=this.page.locator(`//div[@class="rt-tr-group"][${index}]//div[@class="rt-td"][6]`)
    }
}