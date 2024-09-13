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
    const mobileNumber = faker.phone.number()
    const currentAddress = faker.location.streetAddress()


    await page.goto('/')
    await homePage.naviagteToPage("Forms", "Practice Form")

    //filling form fields
    await formPage.fillFormFields(firstName,lastName,email,mobileNumber,currentAddress)

    //await page.locator("#gender-radio-1").scrollIntoViewIfNeeded({timeout:5000})
    await formPage.selectAndValidateGenderRadioButton("Male")

    await formPage.selectAndValidateHobbyCheckbox(1)
    await formPage.selectAndValidateHobbyCheckbox(2)
    


    await formPage.selectStateAndCity()

    // test.describe("Automation Practice Form", () => {
    //     test("should fill and validate the practice form", async ({ page }) => {
    //         const formPage = new PracticeFormPage(page);

    //         // Navigate to the practice form
    //         await page.goto("https://demoqa.com/automation-practice-form");

    //         // Fill the form fields using data from the fixture
    //         await formPage.fillFirstName(formData.firstName);
    //         await formPage.fillLastName(formData.lastName);
    //         await formPage.fillEmail(formData.email);
    //         await formPage.selectGender(formData.gender);
    //         await formPage.fillMobileNumber(formData.mobileNumber);
    //         await formPage.setDateOfBirth(formData.dateOfBirth); // Set birth date
    //         await formPage.fillSubject(formData.subject);
    //         await formPage.selectHobby(formData.hobby);
    //         //await formPage.uploadPicture(formData.picturePath); // Ensure the correct path
    //         await formPage.fillAddress(formData.address);
    //         //await formPage.selectState(formData.state);
    //         //await formPage.selectCity(formData.city);

    //         // Submit the form
    //         await formPage.submitForm();

    //         // Validate the form submission using data from the fixture
    //         await formPage.validateFormSubmission([
    //             formData.firstName,
    //             formData.lastName,
    //             formData.email,
    //             formData.gender,
    //             formData.mobileNumber,
    //             formData.dateOfBirth,
    //             formData.subject,
    //             formData.hobby,
    //             formData.address,
    //             `${formData.state} ${formData.city}`
    //         ]);
    //     });
    // });


})