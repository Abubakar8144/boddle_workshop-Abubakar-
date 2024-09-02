import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { WebTables } from "../pages/WebTablesPage";
import { faker } from '@faker-js/faker';

const fixturesFileData = require("../fixtures/fixtures.json")

test("including a new register in table using faker", async ({ page }) => {
    const homePage = new HomePage(page)
    const webTablesPage = new WebTables(page)

    await page.goto("/")
    //navigating to web tables page
    await homePage.naviagteToPage("Elements","Web Tables")

    //validating the navigation
    await webTablesPage.validateNavigationToWebTablesPage()

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email()
    const age = String(faker.number.int({ min: 18, max: 50 })) //Here age is passing as a string because the age field excepts the number as a string
    const salary = faker.finance.amount({ min: 25000, max: 100000, dec: 0 }) //dec:0 is used to avoid decimal values such as "67000.38"
    const department = faker.commerce.department()

    await webTablesPage.clickAddButton()
    await webTablesPage.fillRegisterEntries(
        firstName,
        lastName,
        email,
        age,
        salary,
        department
    )

    await webTablesPage.validatingRegisteredEntry(
        firstName,
        lastName,
        email,
        age,
        salary,
        department,
        "4",//Here we have entered 4 because the new entry will be registerd on 4th row
        page
    )


})
test("including a new register in table using fixtures files", async ({ page }) => {
    const homePage = new HomePage(page)
    const webTablesPage = new WebTables(page)

    await page.goto("/")
    //navigating to web tables page
    await homePage.naviagteToPage("Elements","Web Tables")

    //validating the navigation
    await webTablesPage.validateNavigationToWebTablesPage()

    await webTablesPage.clickAddButton()

    await webTablesPage.fillRegisterEntries(
        fixturesFileData.firstName,
        fixturesFileData.lastName,
        fixturesFileData.email,
        fixturesFileData.age,
        fixturesFileData.salary,
        fixturesFileData.department
    )


    await webTablesPage.validatingRegisteredEntry(
        fixturesFileData.firstName,
        fixturesFileData.lastName,
        fixturesFileData.email,
        fixturesFileData.age,
        fixturesFileData.salary,
        fixturesFileData.department,
        "4", //Here we have entered 4 because the new entry will be registerd on 4th row
        page
    )


})

test("Editing the registerd entry", async ({ page }) => {
    const homePage = new HomePage(page)
    const webTablesPage = new WebTables(page)

    await page.goto("/")
    //navigating to web tables page
    await homePage.naviagteToPage("Elements","Web Tables")

    //validating the navigation
    await webTablesPage.validateNavigationToWebTablesPage()

    await webTablesPage.editEntry(2,page)//Passing the entry number for editing that entry, Here '2' means that we are editing 2nd entry
    await webTablesPage.fillRegisterEntries(
        fixturesFileData.firstName,
        fixturesFileData.lastName,
        fixturesFileData.email,
        fixturesFileData.age,
        fixturesFileData.salary,
        fixturesFileData.department
    )

    //
    await webTablesPage.locatorsForRegisterationValidation(2,page)//Locators for validation of registered entries, Here '2' means that we are validating 2nd row entries
    await webTablesPage.validatingRegisteredEntry(
        fixturesFileData.firstName,
        fixturesFileData.lastName,
        fixturesFileData.email,
        fixturesFileData.age,
        fixturesFileData.salary,
        fixturesFileData.department,
        "2",
        page
    )


})