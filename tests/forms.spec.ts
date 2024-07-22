import test, { expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { FormsPage } from "../fixtures/pages/FormPage";

const fixturesData = require("../fixtures/fixtures.json")

test("hard code input data", async({page})=>{

    await page.setViewportSize({width: 2560, height:1080})
    await page.goto("https://demoqa.com/text-box")
    const formsPage = new FormsPage(page)
    await page.waitForLoadState("domcontentloaded")
    await formsPage.currentAddressField.waitFor({state:"attached"})

    // await formsPage.username.fill("Abubakar")
    // await formsPage.userEmail.fill("Abubakar@email.com")
    // await formsPage.currentAddress.fill("ABc 123")
    // await formsPage.permanentAddress.fill("abc 123")
    // await formsPage.submitBtn.click()

    await formsPage.fillFormRegistration(
        "Abubakar",
        "Abubakar@email.com",
        "ABc 123",
        "abc 123"
    )

    // await expect(await formsPage.nameResult).toHaveText("Name:Abubakar")
    // await expect(await formsPage.emailResult).toHaveText("Email:Abubakar@email.com")
    // await expect(await formsPage.currentAddressResult).toHaveText("Current Address :ABc 123")
    // await expect(await formsPage.permanentAddressResult).toHaveText("Permananet Address :abc 123")

    await formsPage.validateInputedValues(
        "Abubakar",
        "Abubakar@email.com",
        "ABc 123",
        "abc 123")
})

test("Input data using Json variable", async({page})=>{

    const formsPage = new FormsPage(page)
    const data ={
        "name":"Abubakar",
        "email": "Abubakar@email.com",
        "currentAddress": "ABc 123",
        "permanentAddress": "abc 123"
    }


    // await page.goto("https://demoqa.com/text-box")
    // await formsPage.username.fill(data.name)
    // await formsPage.userEmail.fill(data.email)
    // await formsPage.currentAddress.fill(data.currentAddress)
    // await formsPage.permanentAddress.fill(data.permanentAddress)
    // await formsPage.submitBtn.click()
    formsPage.fillFormRegistration(data.name,data.email, data.currentAddress, data.permanentAddress)

    // await expect(await formsPage.nameResult).toHaveText(`Name:${data.name}`)
    // await expect(await formsPage.emailResult).toHaveText(`Email:${data.email}`)
    // await expect(await formsPage.currentAddressResult).toHaveText(`Current Address :${data.currentAddress}`)
    // await expect(await formsPage.permanentAddressResult).toHaveText(`Permananet Address :${data.permanentAddress}`)

    formsPage.validateInputedValues(data.name,data.email, data.currentAddress, data.permanentAddress)

})

test("Input data using fixtures", async({page})=>{
    const formsPage = new FormsPage(page)

    await page.goto("https://demoqa.com/text-box")
    // await formsPage.username.fill(fixturesData.name)
    // await formsPage.userEmail.fill(fixturesData.email)
    // await formsPage.currentAddress.fill(fixturesData.currentAddress)
    // await formsPage.permanentAddress.fill(fixturesData.permanentAddress)
    // await formsPage.submitBtn.click()

    formsPage.fillFormRegistration(fixturesData.name, fixturesData.email, fixturesData.currentAddress,fixturesData.permanentAddress)

    // await expect(await formsPage.nameResult).toHaveText(`Name:${fixturesData.name}`)
    // await expect(await formsPage.emailResult).toHaveText(`Email:${fixturesData.email}`)
    // await expect(await formsPage.currentAddressResult).toHaveText(`Current Address :${fixturesData.currentAddress}`)
    // await expect(await formsPage.permanentAddressResult).toHaveText(`Permananet Address :${fixturesData.permanentAddress}`)
    
    formsPage.validateInputedValues(
        fixturesData.name, 
        fixturesData.email, 
        fixturesData.currentAddress,
        fixturesData.permanentAddress
    )

})

test("generate random data using faker.json", async({page})=>{

    const formsPage = new FormsPage(page)

    const name = faker.person.fullName()
    const email = faker.internet.email()
    const currentAddress = faker.location.streetAddress()
    const permanentAddress = faker.location.streetAddress()

    console.log(name)
    console.log(email)
    console.log(currentAddress)
    console.log(permanentAddress)

    await page.goto("https://demoqa.com/text-box")
    // await formsPage.username.fill(name)
    // await formsPage.userEmail.fill(email)
    // await formsPage.currentAddress.fill(currentAddress)
    // await formsPage.permanentAddress.fill(permanentAddress)
    // await formsPage.submitBtn.click()

    formsPage.fillFormRegistration(name,email,currentAddress,permanentAddress)
    // await expect(await formsPage.nameResult).toHaveText(`Name:${name}`)
    // await expect(await formsPage.emailResult).toHaveText(`Email:${email}`)
    // await expect(await formsPage.currentAddressResult).toHaveText(`Current Address :${currentAddress}`)
    // await expect(await formsPage.permanentAddressResult).toHaveText(`Permananet Address :${permanentAddress}`)

    formsPage.validateInputedValues(name,
        email,
        currentAddress,
        permanentAddress
    )


})


test("generate random data using faker.json using json object", async({page})=>{

    const formsPage = new FormsPage(page)

    const jsonData = {
        "name":faker.person.fullName(),
        "email":faker.internet.email(),
        "currentAddress":faker.location.streetAddress(),
        "permanentAddress":faker.location.streetAddress()
    }


    console.log(jsonData.name)
    console.log(jsonData.email)
    console.log(jsonData.currentAddress)
    console.log(jsonData.permanentAddress)

    await page.goto("https://demoqa.com/text-box")
    // await formsPage.username.fill(jsonData.name)
    // await formsPage.userEmail.fill(jsonData.email)
    // await formsPage.currentAddress.fill(jsonData.currentAddress)
    // await formsPage.permanentAddress.fill(jsonData.permanentAddress)
    // await formsPage.submitBtn.click()

    formsPage.fillFormRegistration(jsonData.name, jsonData.email, jsonData.currentAddress, jsonData.permanentAddress)

    // await expect(await formsPage.nameResult).toHaveText(`Name:${jsonData.name}`)
    // await expect(await formsPage.emailResult).toHaveText(`Email:${jsonData.email}`)
    // await expect(await formsPage.currentAddressResult).toHaveText(`Current Address :${jsonData.currentAddress}`)
    // await expect(await formsPage.permanentAddressResult).toHaveText(`Permananet Address :${jsonData.permanentAddress}`)

    formsPage.validateInputedValues(
        jsonData.name, 
        jsonData.email, 
        jsonData.currentAddress, 
        jsonData.permanentAddress
    )


})


