import { test, expect } from '@playwright/test';

test("radio buttons workshop", async({page})=>{
    
    await page.goto("https://demoqa.com/")

    await page.locator(".card-body").getByText("Elements").click()
    await page.locator(".text").getByText("Radio Button").click()
    
    await page.waitForLoadState("domcontentloaded")
    await expect(await page.locator(".text-center")).toBeVisible()
    await expect(page.url()).toContain('https://demoqa.com/radio-button')

    await page.locator("#yesRadio").check({force:true})
    await expect(await page.locator(".mt-3")).toHaveText("You have selected Yes")

    await page.locator("#impressiveRadio").check({force:true})
    await expect(await page.locator(".mt-3")).toHaveText("You have selected Impressive")
    
    //await page.locator("#noRadio").check({force:true})
    
    // const checked = await page.locator("#noRadio").isChecked()
    // await expect(checked).toBeTruthy()

})

test("radio buttons", async({page})=>{

    //Redirecting to the URL
    await page.goto("/")

    //First Clicking on Elements Card and Then Radio Button Tab
    await page.locator(".card-body").getByText("Elements").click()
    await page.locator(".text").getByText("Radio Button").click()
    
    //Validating that the URL and text(heading) of the page
    await page.waitForLoadState("domcontentloaded")
    await expect(await page.locator(".text-center")).toBeVisible()
    await expect(page.url()).toContain('https://demoqa.com/radio-button')

    //Function for selecting radio buttons and validating the results
    async function selectRadioButtonDynamically(index) {
        //Defining an xpath to identify the radio buttons using their indexes
        const locator = `//div[@class="custom-control custom-radio custom-control-inline"][${index}]`
        const mainLabel = await page.locator(`${locator}/label`).innerText()

        //Selecting the radio button
        await page.locator(`${locator}/input`).check({force:true})

        //Validating the results
        const isChecked = await page.locator(`${locator}/input`).isChecked()
        expect(isChecked).toBeTruthy()

        return mainLabel
   }

//    const labelValue1 = await selectRadioButtonDynamically("1")

//    await expect(await page.locator("p.mt-3")).toHaveText(`You have selected `+labelValue1)

//    const labelValue2 = await selectRadioButtonDynamically("2")

//    await expect(await page.locator("p.mt-3")).toHaveText(`You have selected `+labelValue2)

  
  //Using 'for' loop for iterating the code for index 1 and 2
  for(let i=1; i<3; i++){
    const label = await selectRadioButtonDynamically(i)
    await expect(await page.locator('.mt-3')).toHaveText('You have selected '+label)
  }
   
})