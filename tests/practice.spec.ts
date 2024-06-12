import { test, expect } from '@playwright/test';

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




// test("workshop clicking on buttons", async({page})=>{

// })
