import test, { expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { FormsPage } from "../pages/FormPage";
import { HomePage } from "../pages/HomePage";

const fixturesData = require("../fixtures/fixtures.json")

test.beforeEach("Navigation to Text-Box page", async ({ page }) => {

    const homePage = new HomePage(page)
    await page.goto("/")
    await page.setViewportSize({ width: 2560, height: 1080 })
    await homePage.naviagteToPage("Elements", "Text Box")

})

test("hard code input data", async ({ page }) => {

    const formsPage = new FormsPage(page)
    await formsPage.currentAddressField.waitFor({ state: "attached" })

    await formsPage.fillFormRegistration(
        "Abubakar",
        "Abubakar@email.com",
        "ABc 123",
        "abc 123"
    )

    await formsPage.validateInputedValues(
        "Abubakar",
        "Abubakar@email.com",
        "ABc 123",
        "abc 123")
})

test("Input data using Json variable", async ({ page }) => {

    const formsPage = new FormsPage(page)
    const data = {
        "name": "Abubakar",
        "email": "Abubakar@email.com",
        "currentAddress": "ABc 123",
        "permanentAddress": "abc 123"
    }

    await formsPage.fillFormRegistration(data.name, data.email, data.currentAddress, data.permanentAddress)

    await formsPage.validateInputedValues(data.name, data.email, data.currentAddress, data.permanentAddress)

})

test("Input data using fixtures", async ({ page }) => {
    const formsPage = new FormsPage(page)

    await formsPage.fillFormRegistration(fixturesData.name, fixturesData.email, fixturesData.currentAddress, fixturesData.permanentAddress)

    await formsPage.validateInputedValues(
        fixturesData.name,
        fixturesData.email,
        fixturesData.currentAddress,
        fixturesData.permanentAddress
    )

})

test("generate random data using faker.json", async ({ page }) => {

    const formsPage = new FormsPage(page)

    const name = faker.person.fullName()
    const email = faker.internet.email()
    const currentAddress = faker.location.streetAddress()
    const permanentAddress = faker.location.streetAddress()

    await formsPage.fillFormRegistration(
        name,
        email,
        currentAddress,
        permanentAddress)

    await formsPage.validateInputedValues(
        name,
        email,
        currentAddress,
        permanentAddress
    )


})


test("generate random data using faker.json using json object", async ({ page }) => {

    const formsPage = new FormsPage(page)

    const jsonData = {
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "currentAddress": faker.location.streetAddress(),
        "permanentAddress": faker.location.streetAddress()
    }

    await formsPage.fillFormRegistration(
        jsonData.name,
        jsonData.email,
        jsonData.currentAddress,
        jsonData.permanentAddress)

    await formsPage.validateInputedValues(
        jsonData.name,
        jsonData.email,
        jsonData.currentAddress,
        jsonData.permanentAddress
    )


})


