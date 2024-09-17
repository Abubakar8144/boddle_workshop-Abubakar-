import test from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { faker } from "@faker-js/faker";
import { PracticeFormPage } from "../pages/PracticeFormPage";

const formData = require("../fixtures/formData.json")

test("practice form exercise", async ({ page }) => {
    const homePage = new HomePage(page)
    const formPage = new PracticeFormPage(page);

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email()
    const mobileNumber = faker.string.numeric(10)
    const currentAddress = faker.location.streetAddress()
    
    // Generate a random past date using Faker
    //const randomDate = faker.date.past({years:30}); // 30 years in the past

    // Extract day, month, and year from the random date
    const dayOfBirth = faker.number.int({ min: 1, max: 31 }).toString().padStart(2, '0'); // Format day as '01'
    const monthOfBirth =faker.date.month()
    const yearOfBirth = faker.number.int({ min: 1950, max: 2024 }).toString()
    // const monthOfBirth = randomDate.toLocaleString('default', { month: 'long' }); // Format month as 'March'
    // const yearOfBirth = randomDate.getFullYear().toString(); // Get the year as '1990'
    console.log(dayOfBirth)
    console.log(monthOfBirth)
    console.log(yearOfBirth)

    //Randomly generating indexes for states and city from json file
    const stateRandomIndex = Math.floor(Math.random() * formData.states.length)
    const stateName = formData.states[stateRandomIndex]
    const citiesForSelectedState = formData.cities[0][stateName];
    const cityRandomIndex = Math.floor(Math.random() * citiesForSelectedState.length)
    const cityName = formData.cities[0][stateName][cityRandomIndex]


    const subjects = ['Maths', 'Physics', 'Chemistry']

    //Navigating to Practice-Form Page
    await page.goto('/')
    await homePage.naviagteToPage("Forms", "Practice Form")

    //Filling and validating the form fields
    await formPage.fillAndvalidateFormField(formPage.firstNameInput,firstName)
    await formPage.fillAndvalidateFormField(formPage.lastNameInput,lastName)
    await formPage.fillAndvalidateFormField(formPage.emailInput,email)
    await formPage.fillAndvalidateFormField(formPage.mobileNumberInput,mobileNumber)

    //Selecting gender
    await formPage.selectAndValidateGenderRadioButton("Male")

    //Selecting Hobbies
    const hobby1 = await formPage.selectAndValidateHobbyCheckbox(1)
    const hobby2 = await formPage.selectAndValidateHobbyCheckbox(2)

    //Selecting Date Of Birth from the calendar picker
    await formPage.selectDateOfBirth(dayOfBirth, monthOfBirth, yearOfBirth)

    //Selecting a Random State and one of its relative city from json file
    await formPage.selectStateAndCity(formData.states[stateRandomIndex], formData.cities[0][stateName][cityRandomIndex])

    //Filling and Validating the current address field
    await formPage.fillAndvalidateFormField(formPage.addressInput,currentAddress)

    //Adding subjects
    await formPage.addSubjects(subjects)

    //Clicking on submit button
    await formPage.submitButton.click()

    //This method needs to be refactored
    await formPage.validateFormSubmission([
        firstName +" "+ lastName,
        email,
        "Male",
        mobileNumber,
        dayOfBirth+" "+monthOfBirth+","+yearOfBirth,
        subjects[0]+", "+subjects[1]+", "+subjects[2],
       "Sports, Reading",
       "",
        currentAddress,
        `${stateName} ${cityName}`
      ]);
    //await formPage.selectDateOfBirth(randomDate)


})