import test from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { faker } from "@faker-js/faker";
import { FormWorkshopPage } from "../pages/FormWorkshopPage";

const formData = require("../fixtures/formData.json")

test("form page exercise", async ({ page }) => {
  const homePage = new HomePage(page)
  const formPage = new FormWorkshopPage(page)

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
  const dayOfBirth: string = faker.number.int({ min: 1, max: 28 }).toString().padStart(2, '0'); // Format day as '01'
  const monthOfBirth: string = faker.date.month()
  const yearOfBirth: string = faker.number.int({ min: 1950, max: 2024 }).toString()
  const dateOfBirth: string = dayOfBirth + " " + monthOfBirth + "," + yearOfBirth

  // Generate subjects
  const subject1: string = formData.subjects.pop()
  const subject2: string = formData.subjects.pop()

  const subjects: string[] = [subject1, subject2]
  const subjectsvalue: string = subjects.join(", ")

  const filePath: string[] = (formData.picturePath).split("/")


  //Navigating to Practice-Form Page
  await page.goto('/')
  await homePage.naviagteToPage("Forms", "Practice Form")

  //Filling the form fields
  await formPage.firstNameInput.fill(firstName)
  await formPage.lastNameInput.fill(lastName)
  await formPage.emailInput.fill(email)
  await formPage.mobileNumberInput.fill(mobileNumber)

  //Selecting gender
  await formPage.selectAndValidateGenderRadioButton(gender, page)

  //Selecting Hobbies
  await formPage.selectHobbyCheckbox(hobby1, page)

  //Selecting Date Of Birth from the calendar picker
  await formPage.selectDateOfBirth(dayOfBirth, monthOfBirth, yearOfBirth, page)

  //Selecting a State and one of its relative city 
  await formPage.selectStateOrCity(formPage.stateDropdown, state, page)
  await formPage.selectStateOrCity(formPage.cityDropdown, city, page)


  //Filling and Validating the current address field
  await formPage.addressInput.fill(currentAddress)

  //Adding subjects
  await formPage.addSubjects(subjects, page)

  //uploading photo
  await formPage.uploadPictureInput.setInputFiles(formData.picturePath)

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
  ], page);


})