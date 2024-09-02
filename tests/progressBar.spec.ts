import test, { expect } from "@playwright/test";
import { ProgressBarPage } from "../pages/ProgressBarPage";
import { HomePage } from "../pages/HomePage";

test("Progress Bar Test", async ({ page }) => {

    const homePage = new HomePage(page)
    const progressBar = new ProgressBarPage(page)

    //Navigating to Progress-Bar page
    await page.goto("/")
    await homePage.naviagteToPage("Widgets","Progress Bar")

    //Clicking on start button and validating that the button's text is changed to 'Stop'
    await progressBar.startStopButton.click()
    await expect(progressBar.startStopButton).toHaveText("Stop")

    //Validating the progress bar value using 'toHaveAtrribute' function
    await expect(await progressBar.progressBarText).toHaveAttribute("aria-valuenow", "100", {timeout: 60000 })

    //Validating that the stop button is transitioned to Reset button
    await expect(progressBar.resetButton).toHaveText("Reset")

    //Clicking and Validating that the Reset button is transitioned to Start button
    await progressBar.resetButton.click()
    await expect(progressBar.startStopButton).toHaveText("Start")

})