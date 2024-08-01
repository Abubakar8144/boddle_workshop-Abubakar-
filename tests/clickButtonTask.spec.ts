import {test, expect} from '@playwright/test'

import { ClickButtonClass } from '../pages/ClickButtonsPage'

test.beforeEach("Run before every test", async({page})=>{
    await page.setViewportSize({width: 2560, height:1080})
    
    await page.goto("https://demoqa.com/buttons")  //Redirecting to the url
})

test('double clicking', async({page})=>{

    const clickButtonobj = new ClickButtonClass(page)
    await clickButtonobj.doubleClickBtn.dblclick()   //Finding the button and double clicking on it

    await expect(await clickButtonobj.doubleClickMsg).toHaveText("You have done a double click") //Checking if the double click has worked

    const doubleclicktext = await clickButtonobj.doubleClickMsg.innerText()
    expect(doubleclicktext).toBe("You have done a double click")

})

test('right clicking', async({page})=>{
    const clickButtonobj = new ClickButtonClass(page)
    await clickButtonobj.rightBtn.click({button:"right"})  //Finding the button and right clicking on it

    await expect(await clickButtonobj.rightClickMsg).toHaveText("You have done a right click") //Checking if the right click has worked 

    const rightClickText = await clickButtonobj.rightClickMsg.innerText()
    expect(rightClickText).toBe("You have done a right click")
})

test('basic click', async({page})=>{
    const clickButtonobj = new ClickButtonClass(page)
    /*
    The reason for using xpath is that the the id for 'Click Me' button is dynamic and changes every 
    time after refreshing, So we have to use the xpath by using the inside text of the button
    */
    await clickButtonobj.dynamicClickBtn.click()
    await expect(await clickButtonobj.dynamicClickMsg).toHaveText("You have done a dynamic click") //Checking if the left click has worked 


    const clickText = await clickButtonobj.dynamicClickMsg.innerText()
    expect(clickText).toBe("You have done a dynamic click")
})