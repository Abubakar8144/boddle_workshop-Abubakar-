import {test, expect} from '@playwright/test'

//
test('double clicking', async({page})=>{

    await page.setViewportSize({width: 2560, height:1080})
    
    await page.goto("https://demoqa.com/buttons")  //Redirecting to the url
    await page.locator("button#doubleClickBtn").dblclick()   //Finding the button and double clicking on it

    await expect(await page.locator("p#doubleClickMessage")).toHaveText("You have done a double click") //Checking if the double click has worked

    const doubleclicktext = await page.locator("p#doubleClickMessage").innerText()
    expect(doubleclicktext).toBe("You have done a double click")

})

test('right clicking', async({page})=>{

    await page.setViewportSize({width:2560, height:1080})

    await page.goto("https://demoqa.com/buttons")   //Redirecting to the url
    await page.locator("button#rightClickBtn").click({button:"right"})  //Finding the button and right clicking on it

    await expect(await page.locator("p#rightClickMessage")).toHaveText("You have done a right click") //Checking if the right click has worked 

    const rightClickText = await page.locator("p#rightClickMessage").innerText()
    expect(rightClickText).toBe("You have done a right click")
})

test('basic click', async({page})=>{
    
    await page.setViewportSize({width:2560, height:1080})

    await page.goto("https://demoqa.com/buttons")  //Redirecting to the url

    /*
    The reason for using xpath is that the the id for 'Click Me' button is dynamic and changes every 
    time after refreshing, So we have to use the xpath by using the inside text of the button
    */
    await page.locator('xpath=//button[text()="Click Me"]').click()
    await expect(await page.locator("p#dynamicClickMessage")).toHaveText("You have done a dynamic click") //Checking if the left click has worked 


    const clickText = await page.locator("p#dynamicClickMessage").innerText()
    expect(clickText).toBe("You have done a dynamic click")
})