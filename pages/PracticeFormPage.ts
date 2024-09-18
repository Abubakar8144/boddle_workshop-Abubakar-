import { Page, Locator, expect } from "@playwright/test";

export class PracticeFormPage {
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
    this.stateDropdown = page.locator("#state")
    this.cityDropdown = page.locator("#city")
    this.uploadPictureInput = page.locator('#uploadPicture')
    this.addressInput = page.locator("#currentAddress")
    this.submitButton = page.locator("#submit")
    this.formValues = page.locator(".table-responsive td")
    this.genderLocator = page.locator("#gender-radio-1")
    this.hobbiesLocator = page.locator("#hobbies-checkbox-1")
    this.dropdowns = page.locator(".css-11unzgr")
  }


  async fillAndvalidateFormField(fieldLocator: Locator, fieldValue: string) {
    await fieldLocator.fill(fieldValue)
    await expect.soft(fieldLocator).toHaveValue(fieldValue)

  }

  generateRandomIndex(object: string[]) {
    const randomIndex = Math.floor(Math.random() * object.length)
    const randomObject = object[randomIndex]
    return randomObject
  }

  async selectAndValidateGenderRadioButton(gender: string) {
    await this.subjectsInput.scrollIntoViewIfNeeded({ timeout: 3000 })
    await this.subjectsInput.waitFor({ state: 'visible', timeout: 3000 })
    await this.page.locator(`input[value="${gender}"]`).check({ force: true })
    const isChecked = await this.page.locator(`input[value="${gender}"]`).isChecked()
    await expect(isChecked).toBeTruthy()
  }

  async selectHobbyCheckbox(hobby: string) {
    await this.page.locator(`//label[@class="custom-control-label"]`).getByText(hobby).check({ force: true })
    const isChecked = await this.page.locator(`//label[@class="custom-control-label"]`).getByText(hobby).isChecked()
    await expect(isChecked).toBeTruthy()
  }

  async selectDateOfBirth(day: string, month: string, year: string) {
    // Convert day and year to numbers for validation purposes
    let dayNumber = parseInt(day)
    const yearNumber = parseInt(year)

    // Get the number of days in the selected month and year
    const daysInMonth = this.getDaysInMonth(month, yearNumber)

    // Adjust the day if it exceeds the number of days in the selected month
    if (dayNumber > daysInMonth) {
      dayNumber = daysInMonth
    }

    // Format the adjusted day as a two-digit string (e.g., '01')
    const formattedDay = dayNumber.toString().padStart(2, '0')

    // Interact with the date picker
    await this.dateOfBirthInput.click()
    await this.monthSelector.selectOption({ label: month })
    await this.yearSelector.selectOption({ label: year })

    // Locate and click the correct day, ensuring it's within the current month
    await this.page.locator(`.react-datepicker__day--0${formattedDay}:not(.react-datepicker__day--outside-month)`).click()

    // Validate that the selected date is correctly displayed
    const selectedDate = await this.page.locator('#dateOfBirthInput').inputValue()
    expect(selectedDate).toBe(`${formattedDay} ${month.slice(0, 3)} ${year}`)
  }

  // Helper function to calculate the number of days in the given month and year
  getDaysInMonth(month: string, year: number): number {
    const monthMap = {
      "January": 31,
      "February": (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28, // Leap year check
      "March": 31,
      "April": 30,
      "May": 31,
      "June": 30,
      "July": 31,
      "August": 31,
      "September": 30,
      "October": 31,
      "November": 30,
      "December": 31
    };

    return monthMap[month]
  }


  //   //Another way of picking date
  // async getRandomDate(pastYears: number) {
  //   const currentDate = new Date();
  //   const endYear = currentDate.getFullYear();
  //   const startYear = endYear - pastYears;

  //   const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  //   const randomMonth = Math.floor(Math.random() * 12); // 0 = January, 11 = December
  //   const randomDay = Math.floor(Math.random() * new Date(randomYear, randomMonth + 1, 0).getDate()) + 1; // Get valid days in that month

  //   return new Date(randomYear, randomMonth, randomDay);
  // }

  // async selectDateOfBirth(date: Date) {
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = date.toLocaleString('default', { month: 'long' });
  //   const year = date.getFullYear().toString();

  //   // Click and select the date using the picker
  //   await this.dateOfBirthInput.click();
  //   await this.monthSelector.selectOption({ label: month });
  //   await this.yearSelector.selectOption({ label: year });

  //   // Handle selecting the correct day
  //   await this.page.locator(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`).click();

  //   // Validate the selected date
  //   const selectedDate = await this.page.locator('#dateOfBirthInput').inputValue();
  //   expect(selectedDate).toBe(`${day} ${month.slice(0, 3)} ${year}`); // Expected format: '30 Mar 1990'
  // }



  async uploadPicture(filePath) {
    await this.uploadPictureInput.setInputFiles(filePath)
  }


  async addSubjects(subjects: string[]) {
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject)
      // Wait for the dropdown and select the subject
      // await this.page.locator(`.subjects-auto-complete__option >> text=${subject}`).click()
      await this.page.locator(".subjects-auto-complete__option").getByText(subject).click()
    }
  }



  async selectStateOrCity(stateOrCityLocator: Locator, stateOrCity: string) {
    //clicking and selecting state
    await stateOrCityLocator.click();
    await this.dropdowns.getByText(stateOrCity).click()
  }


  async formValidation(expectedValues: string[]) {
    for (let i = 0; i < 10; i++) {
      await expect.soft(this.page.locator(`//div[@class="table-responsive"]//tr[${i + 1}]/td[2]`)).toHaveText(expectedValues[i])
    }
  }

}
