import test from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { faker } from "@faker-js/faker";
import { PracticeFormPage } from "../pages/PracticeFormPage";

const formData = require("../fixtures/formData.json")

test("practice form exercise", async ({ page }) => {
  const homePage = new HomePage(page)
  const formPage = new PracticeFormPage(page)

  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const fullName = firstName + " " + lastName
  const email = faker.internet.email()
  const mobileNumber = faker.string.numeric(10)
  const currentAddress = faker.location.streetAddress()

  // Generate random selections
  const gender: string = await formPage.generateRandomIndex(formData.genders)
  const hobby1: string = await formPage.generateRandomIndex(formData.hobbies)
  const state: string = await formPage.generateRandomIndex(formData.states)
  const city: string = await formPage.generateRandomIndex(formData.cities[0][state])

  // Generate date of birth
  const dayOfBirth: string = faker.number.int({ min: 1, max: 31 }).toString().padStart(2, '0'); // Format day as '01'
  const monthOfBirth: string = faker.date.month()
  const yearOfBirth: string = faker.number.int({ min: 1950, max: 2024 }).toString()
  const dateOfBirth: string = dayOfBirth + " " + monthOfBirth + "," + yearOfBirth

  // Generate subjects
  const subject1: string = formPage.generateRandomIndex(formData.subjects)
  let subject2: string = formPage.generateRandomIndex(formData.subjects)
  // Check if subject2 is the same as subject1 and regenerate until they are different
  while (subject2 === subject1) {
    subject2 = formPage.generateRandomIndex(formData.subjects);
  }
  const subjects: string[] = [subject1, subject2]
  const subjectsvalue: string = subject1 + ", " + subject2

  const filePath: string[] = (formData.picturePath).split("/")


  //Navigating to Practice-Form Page
  await page.goto('/')
  await homePage.naviagteToPage("Forms", "Practice Form")

  //Filling and validating the form fields
  await formPage.fillAndvalidateFormField(formPage.firstNameInput, firstName)
  await formPage.fillAndvalidateFormField(formPage.lastNameInput, lastName)
  await formPage.fillAndvalidateFormField(formPage.emailInput, email)
  await formPage.fillAndvalidateFormField(formPage.mobileNumberInput, mobileNumber)

  //Selecting gender
  await formPage.selectAndValidateGenderRadioButton(gender)

  //Selecting Hobbies
  await formPage.selectHobbyCheckbox(hobby1)

  //Selecting Date Of Birth from the calendar picker
  await formPage.selectDateOfBirth(dayOfBirth, monthOfBirth, yearOfBirth)

  //Selecting a State and one of its relative city 
  await formPage.selectStateOrCity(formPage.stateDropdown, state)
  await formPage.selectStateOrCity(formPage.cityDropdown, city)


  //Filling and Validating the current address field
  await formPage.fillAndvalidateFormField(formPage.addressInput, currentAddress)

  //Adding subjects
  await formPage.addSubjects(subjects)

  //uploading photo
  await formPage.uploadPicture(formData.picturePath)

  //Clicking on submit button
  await formPage.submitButton.click()

  //Form Validation
  await formPage.formValidation([
    fullName,
    email,
    gender,
    mobileNumber,
    dateOfBirth,
    subjectsvalue,
    hobby1,
    filePath[filePath.length - 1],
    currentAddress,
    `${state} ${city}`
  ]);


})