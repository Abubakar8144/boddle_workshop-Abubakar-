import test, { expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { DragAndDropPage } from "../pages/DragAndDropPage";

test("drag and drop using dragTo function", async ({ page }) => {
    const homePage = new HomePage(page)
    const dragAndDropPage = new DragAndDropPage(page)

    //Navigating to Droppable Page
    await page.goto("/")
    await homePage.naviagteToPage("Interactions", "Droppable")

    //Drag and Drop
    await dragAndDropPage.dragLocator.dragTo(dragAndDropPage.dropLocator)

    //Validating Drag and Drop through the text inside the Drop box
    await expect(await dragAndDropPage.dropLocator).toHaveText("Dropped!")
    await expect(dragAndDropPage.dropContainerColor).toBeVisible()

})

test("drag and drop manually", async ({ page }) => {
    const homePage = new HomePage(page)
    const dragAndDropPage = new DragAndDropPage(page)

    //Navigating to Droppable Page
    await page.goto("/")
    await homePage.naviagteToPage("Interactions", "Droppable")

    //Drag and Drop manually
    await dragAndDropPage.dragLocator.hover();
    await page.mouse.down();
    await dragAndDropPage.dropLocator.hover();
    await page.mouse.up();

    //Validating Drag and Drop through the text inside the Drop box
    await expect(await dragAndDropPage.dropLocator).toHaveText("Dropped!")
    await expect(dragAndDropPage.dropContainerColor).toBeVisible()

})