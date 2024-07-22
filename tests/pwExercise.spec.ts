import test, { expect } from "@playwright/test";
import { HomePage } from "../fixtures/pages/HomePage";
import { WebTables } from "../fixtures/pages/WebTablesPage";
import { faker } from '@faker-js/faker';

const fixturesFileData = require("../fixtures/fixtures.json")

test("including a new register in table using faker", async({page})=>{
    const homePage=new HomePage(page)
    const webTablesPage = new WebTables(page)

    //navigating to web tables page
    await homePage.naviagteToWebTablesPage()

    //validating the navigation
    await webTablesPage.validateNavigationToWebTablesPage()

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const email = faker.internet.email()
    const age = String(faker.number.int({min:18, max:50})) //Here age is passing as a string because the age field excepts the number as a string
    const salary = faker.finance.amount({min:25000, max: 100000, dec:0}) //dec:0 is used to avoid decimal values such as "67000.38"
    const department = faker.commerce.department() 

    await webTablesPage.addingNewRegister(
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
        department
    )


})
test("including a new register in table using fixtures files", async({page})=>{
    const homePage=new HomePage(page)
    const webTablesPage = new WebTables(page)

    //navigating to web tables page
    await homePage.naviagteToWebTablesPage()

    //validating the navigation
    await webTablesPage.validateNavigationToWebTablesPage()

    await webTablesPage.addingNewRegister(
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
        fixturesFileData.department
    )


})