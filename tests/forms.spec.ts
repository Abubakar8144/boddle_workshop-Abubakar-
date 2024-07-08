import test, { expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

const fixturesData = require("../fixtures/fixtures.json")

test("hard code input data", async({page})=>{

    await page.goto("https://demoqa.com/text-box")

    await page.locator("#userName").fill("Abubakar")
    await page.locator("#userEmail").fill("Abubakar@email.com")
    await page.locator("#currentAddress").fill("ABc 123")
    await page.locator("#permanentAddress").fill("abc 123")
    await page.locator("#submit").click()


    await expect(await page.locator("#name")).toHaveText("Name:Abubakar")
    await expect(await page.locator("#email")).toHaveText("Email:Abubakar@email.com")
    await expect(await page.locator("p#currentAddress")).toHaveText("Current Address :ABc 123")
    await expect(await page.locator("p#permanentAddress")).toHaveText("Permananet Address :abc 123")
})

test("Input data using Json variable", async({page})=>{

    const data ={
        "name":"Abubakar",
        "email": "Abubakar@email.com",
        "currentAddress": "ABc 123",
        "permanentAddress": "abc 123"
    }


    await page.goto("https://demoqa.com/text-box")
    await page.locator("#userName").fill(data.name)
    await page.locator("#userEmail").fill(data.email)
    await page.locator("#currentAddress").fill(data.currentAddress)
    await page.locator("#permanentAddress").fill(data.permanentAddress)
    await page.locator("#submit").click()

    await expect(await page.locator("#name")).toHaveText(`Name:${data.name}`)
    await expect(await page.locator("#email")).toHaveText(`Email:${data.email}`)
    await expect(await page.locator("p#currentAddress")).toHaveText(`Current Address :${data.currentAddress}`)
    await expect(await page.locator("p#permanentAddress")).toHaveText(`Permananet Address :${data.permanentAddress}`)

})

test("Input data using fixtures", async({page})=>{
    await page.goto("https://demoqa.com/text-box")
    await page.locator("#userName").fill(fixturesData.name)
    await page.locator("#userEmail").fill(fixturesData.email)
    await page.locator("#currentAddress").fill(fixturesData.currentAddress)
    await page.locator("#permanentAddress").fill(fixturesData.permanentAddress)
    await page.locator("#submit").click()

    await expect(await page.locator("#name")).toHaveText(`Name:${fixturesData.name}`)
    await expect(await page.locator("#email")).toHaveText(`Email:${fixturesData.email}`)
    await expect(await page.locator("p#currentAddress")).toHaveText(`Current Address :${fixturesData.currentAddress}`)
    await expect(await page.locator("p#permanentAddress")).toHaveText(`Permananet Address :${fixturesData.permanentAddress}`)
    

})

test("generate random data using faker.json", async({page})=>{


    const name = faker.person.fullName()
    const email = faker.internet.email()
    const currentAddress = faker.location.streetAddress()
    const permanentAddress = faker.location.streetAddress()

    console.log(name)
    console.log(email)
    console.log(currentAddress)
    console.log(permanentAddress)

    await page.goto("https://demoqa.com/text-box")
    await page.locator("#userName").fill(name)
    await page.locator("#userEmail").fill(email)
    await page.locator("#currentAddress").fill(currentAddress)
    await page.locator("#permanentAddress").fill(permanentAddress)
    await page.locator("#submit").click()

    await expect(await page.locator("#name")).toHaveText(`Name:${name}`)
    await expect(await page.locator("#email")).toHaveText(`Email:${email}`)
    await expect(await page.locator("p#currentAddress")).toHaveText(`Current Address :${currentAddress}`)
    await expect(await page.locator("p#permanentAddress")).toHaveText(`Permananet Address :${permanentAddress}`)


})


test("generate random data using faker.json using json object", async({page})=>{

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
    await page.locator("#userName").fill(jsonData.name)
    await page.locator("#userEmail").fill(jsonData.email)
    await page.locator("#currentAddress").fill(jsonData.currentAddress)
    await page.locator("#permanentAddress").fill(jsonData.permanentAddress)
    await page.locator("#submit").click()

    await expect(await page.locator("#name")).toHaveText(`Name:${jsonData.name}`)
    await expect(await page.locator("#email")).toHaveText(`Email:${jsonData.email}`)
    await expect(await page.locator("p#currentAddress")).toHaveText(`Current Address :${jsonData.currentAddress}`)
    await expect(await page.locator("p#permanentAddress")).toHaveText(`Permananet Address :${jsonData.permanentAddress}`)


})


