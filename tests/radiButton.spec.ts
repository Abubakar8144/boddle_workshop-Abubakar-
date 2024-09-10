import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RadioButtonClass } from '../pages/RadioButtonPage';


test.beforeEach("Navigation to Radio Button Page", async({page})=>{
  const homePage = new HomePage(page)
  await page.goto("/")
  await homePage.naviagteToPage("Elements","Radio Button")
})

test("radio buttons workshop", async({page})=>{
    
    const radioButtonClass = new RadioButtonClass(page)
    await radioButtonClass.yesRadio.check({force:true})
    await expect(await radioButtonClass.resultLabel).toHaveText("You have selected Yes")

    await radioButtonClass.impressiveRadio.check({force:true})
    await expect(await radioButtonClass.resultLabel).toHaveText("You have selected Impressive")
    
})

test("radio buttons", async({page})=>{

  const radioButtonClass = new RadioButtonClass(page)

  //Using 'for' loop for iterating the code for index 1(Yes) and 2(Impressive)
  for(let i=1; i<3; i++){
    const label = await radioButtonClass.selectRadioButtonDynamically(page,i)
    await expect(await radioButtonClass.resultLabel).toHaveText('You have selected '+label)
  }
   
})