import { Page, Locator, expect } from "@playwright/test";

export class FormWorkshopPage {
    readonly page: Page
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly emailInput: Locator
    readonly mobileNumberInput: Locator
    readonly dateOfBirthInput: Locator
    readonly monthSelector: Locator
    readonly yearSelector: Locator
    readonly subjectsInput: Locator
    readonly uploadPictureInput: Locator
    readonly addressInput: Locator
    readonly stateDropdown: Locator
    readonly cityDropdown: Locator
    readonly submitButton: Locator
    readonly formValues: Locator
    readonly genderLocator: Locator
    readonly hobbiesLocator: Locator
    readonly hobbyLabel: Locator
    readonly subjectsLocator: Locator
    readonly dropdowns: Locator

    constructor(page: Page) {
        this.page = page
        this.firstNameInput = page.locator("#firstName")
        this.lastNameInput = page.locator("#lastName")
        this.emailInput = page.locator("#userEmail")
        this.mobileNumberInput = page.locator("#userNumber")
        this.dateOfBirthInput = page.locator("#dateOfBirthInput")
        this.monthSelector = page.locator(".react-datepicker__month-select")
        this.yearSelector = page.locator(".react-datepicker__year-select")
        this.subjectsInput = page.locator("#subjectsInput")
        this.subjectsLocator = page.locator(".subjects-auto-complete__option")
        this.stateDropdown = page.locator("#state")
        this.cityDropdown = page.locator("#city")
        this.uploadPictureInput = page.locator('#uploadPicture')
        this.addressInput = page.locator("#currentAddress")
        this.submitButton = page.locator("#submit")
        this.formValues = page.locator(".table-responsive td")
        this.genderLocator = page.locator("#gender-radio-1")
        this.hobbiesLocator = page.locator("#hobbies-checkbox-1")
        this.hobbyLabel = page.locator(`//label[@class="custom-control-label"]`)
        this.dropdowns = page.locator(".css-11unzgr")
    }


    async fillAndvalidateFormField(fieldLocator: Locator, fieldValue: string, page: Page) {
        await fieldLocator.fill(fieldValue)
        await expect.soft(fieldLocator).toHaveValue(fieldValue)

    }

    generateRandomIndex(object: string[]) {
        const randomIndex = Math.floor(Math.random() * object.length)
        const randomObject = object[randomIndex]

        return randomObject
    }

    async selectAndValidateGenderRadioButton(gender: string, page: Page) {
        await this.subjectsInput.scrollIntoViewIfNeeded({ timeout: 3000 })
        await this.subjectsInput.waitFor({ state: 'visible', timeout: 3000 })

        await this.page.locator(`input[value="${gender}"]`).check({ force: true })

        await expect(await this.page.locator(`input[value="${gender}"]`)).toBeChecked()
    }

    async selectHobbyCheckbox(hobby: string, page: Page) {

        await this.hobbyLabel.getByText(hobby).check({ force: true })

        await expect(await this.hobbyLabel.getByText(hobby)).toBeChecked()

    }

    async selectDateOfBirth(day: string, month: string, year: string, page: Page) {

        // Interact with the date picker
        await this.dateOfBirthInput.click()
        await this.monthSelector.selectOption({ label: month })
        await this.yearSelector.selectOption({ label: year })

        // Locate and click the correct day, ensuring it's within the current month
        await this.page.locator(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`).click()

        // Validate that the selected date is correctly displayed
        expect(await this.dateOfBirthInput.inputValue()).toBe(`${day} ${month.slice(0, 3)} ${year}`)
    }



    async addSubjects(subjects: string[], page: Page) {
        for (const subject of subjects) {
            await this.subjectsInput.fill(subject)
            await this.subjectsLocator.getByText(subject).click()
        }
    }



    async selectStateOrCity(stateOrCityLocator: Locator, stateOrCity: string, page: Page) {
        //clicking and selecting state
        await stateOrCityLocator.click();
        await this.dropdowns.getByText(stateOrCity).click()
    }


    async formValidation(expectedValues: string[], page: Page) {
        for (let i = 0; i < 10; i++) {
            await expect.soft(this.page.locator(`//div[@class="table-responsive"]//tr[${i + 1}]/td[2]`)).toHaveText(expectedValues[i])
        }
    }

}
