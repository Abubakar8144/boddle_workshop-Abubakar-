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

    await page.goto("/")

    await page.locator(".card-body").getByText("Elements").click()
    await page.locator(".text").getByText("Radio Button").click()
    
    await page.waitForLoadState("domcontentloaded")
    await expect(await page.locator(".text-center")).toBeVisible()
    await expect(page.url()).toContain('https://demoqa.com/radio-button')

    async function selectRadioButtonDynamically(index) {
        const locator = `//div[@class="custom-control custom-radio custom-control-inline"][${index}]`
        const label = await page.locator(`${locator}/label`).innerText()

        await page.locator(`${locator}/input`).check({force:true})

        const isChecked = await page.locator(`${locator}/input`).isChecked()

        expect(isChecked).toBeTruthy()

        return label
   }

//    const labelValue1 = await selectRadioButtonDynamically("1")

//    await expect(await page.locator("p.mt-3")).toHaveText(`You have selected `+labelValue1)

//    const labelValue2 = await selectRadioButtonDynamically("2")

//    await expect(await page.locator("p.mt-3")).toHaveText(`You have selected `+labelValue2)

  

  for(let i=1; i<3; i++){
    const label1 = await selectRadioButtonDynamically(i)
    await expect(await page.locator('.mt-3')).toHaveText('You have selected '+label1)

  }
   
})