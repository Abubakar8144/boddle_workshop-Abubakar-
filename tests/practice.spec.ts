import { test, expect } from '@playwright/test';
import { url } from 'inspector';

//all tests follows the same pattern
test("workshop clicking on buttons", async({page})=>{
   await page.goto("https://demoqa.com/buttons")
   //await page.locator("button#FqBeV").scrollIntoViewIfNeeded()
   //await page.locator("button#FqBeV").click()

   await page.locator("button#doubleClickBtn").dblclick()
  // await expect(await page.locator("p#doubleClickMessage")).toHaveText("You have done a double click")

    
    //Using a constant variable 'text' which stores the double click button locator in it
    const text = await page.locator("p#doubleClickMessage").innerText()

    //Comparing value of variable text with the string in toBe function
    expect(text).toBe("You have done a double click")

    //await page.pause()

})


//  test("workshop clicking on buttonss", async({page})=>{

//     await page.goto("https://demoqa.com/buttons")
//    //await page.locator("button#FqBeV").scrollIntoViewIfNeeded()
//    //await page.locator("button#FqBeV").click()

//    await page.locator("button#rightClickBtn").click({ button: "right" })
//    await expect(await page.locator("p#rightClickMessage")).toHaveText("You have done a right click")
   
   
//    //await page.pause()

// })

test("radio buttons practice", async({page})=>{

  await page.goto("/")
  await page.locator(".card-body").getByText('Elements').click()
  await page.locator('.text').getByText('Radio Button').click()

  await page.waitForLoadState("domcontentloaded")
  await expect(await page.locator(".text-center")).toBeVisible()
  await expect(page.url()).toContain("https://demoqa.com/radio-button")

  async function selectingRadioButton(index){

    const locator = `//div[@class="custom-control custom-radio custom-control-inline"][${index}]`
    const label = await page.locator(`${locator}/label`).innerText()

    await page.locator(`${locator}/input`).check({force:true})
    const isChecked = await page.locator(`${locator}/input`).isChecked()
    expect(isChecked).toBeTruthy()

    return label

  }

  // const label1 = await selectingRadioButton(1)
  // await expect(await page.locator('.mt-3')).toHaveText('You have selected '+label1)

  // const label2 = await selectingRadioButton("2")
  // await expect(await page.locator('.mt-3')).toHaveText('You have selected '+label2)

  for(let i=1; i<3; i++){
    const label1 = await selectingRadioButton(i)
    await expect(await page.locator('.mt-3')).toHaveText('You have selected '+label1)

  }

 })


