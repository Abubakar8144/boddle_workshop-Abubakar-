import { Page, Locator, expect } from "@playwright/test";
const formData = require("../fixtures/formData.json")
export class PracticeFormPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly uploadPictureInput: Locator;
  readonly addressInput: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;
  readonly formValues: Locator;
  readonly genderLocator:Locator
  readonly hobbiesLocator:Locator
  readonly dropdowns: Locator

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.emailInput = page.locator("#userEmail");
    this.mobileNumberInput = page.locator("#userNumber");
    this.dateOfBirthInput = page.locator("#dateOfBirthInput");
    this.subjectsInput = page.locator("#subjectsInput");
    this.uploadPictureInput = page.locator("#uploadPicture");
    this.addressInput = page.locator("#currentAddress");
    this.stateDropdown = page.locator("#state");
    this.cityDropdown = page.locator("#city");
    this.submitButton = page.locator("#submit");
    this.formValues = page.locator(".table-responsive td");
    this.genderLocator=page.locator("#gender-radio-1")
    this.hobbiesLocator = page.locator("#hobbies-checkbox-1")
    this.dropdowns = page.locator(".css-11unzgr")
  }


  async fillFormFields(firstName, lastName, email, mobileNumber, currentAddress){
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.emailInput.fill(email)
    await this.mobileNumberInput.fill(mobileNumber)
    await this.addressInput.fill(currentAddress)
  }


  async selectAndValidateGenderRadioButton(gender){
    await this.genderLocator.scrollIntoViewIfNeeded()
    await this.page.locator(`input[value="${gender}"]`).check({force:true})
    const isChecked = await this.page.locator(`input[value="${gender}"]`).isChecked()
    await expect(isChecked).toBeTruthy()
  }

  async selectAndValidateHobbyCheckbox(hobby){
    await this.page.locator(`input[type="checkbox"][value="${hobby}"]`).check({force:true})
    const isChecked = await this.page.locator(`input[type="checkbox"][value="${hobby}"]`).isChecked()
    await expect(isChecked).toBeTruthy()
  }


  async setDateOfBirth(date: string) {
    await this.dateOfBirthInput.click();
    await this.page.locator(`.react-datepicker__day--0${date}`).click(); // Simplified date selection
  }



  async uploadPicture(filePath: string) {
    await this.uploadPictureInput.setInputFiles(filePath);
  }




  async selectStateAndCity(){
    const stateRandomIndex = Math.floor(Math.random() * formData.states.length)
    const stateName = formData.states[stateRandomIndex]
    const citiesForSelectedState = formData.cities[0][stateName];
    const cityRandomIndex = Math.floor(Math.random() * citiesForSelectedState.length)

    //clicking and selecting state
    await this.stateDropdown.click();
    await this.dropdowns.getByText(formData.states[stateRandomIndex]).click();

    //clicking and selecting city
    await this.cityDropdown.click();
    await this.dropdowns.getByText(formData.cities[0][stateName][cityRandomIndex]).click();
    
  }

 

  // Method to validate form values after submission
  async validateFormSubmission(expectedValues: string[]) {
    for (const value of expectedValues) {
      await expect(await this.formValues).toContainText(value);
    }
  }
}
