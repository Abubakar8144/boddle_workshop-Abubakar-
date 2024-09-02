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

    //Setting a timeout so that the progress-bar loads 100% 
    await page.waitForTimeout(10000);   // 10s timeout
    const progressValue = await progressBar.progressBarText.getAttribute("aria-valuenow") //storing the progress bar's value 
    await expect(progressValue).toBe("100") // Validating the Progress Bar's va;ue to be 100%

    //Validating that the stop button is transitioned to Reset button
    await expect(progressBar.resetButton).toHaveText("Reset")

    //Clicking and Validating that the Reset button is transitioned to Start button
    await progressBar.resetButton.click()
    await expect(progressBar.startStopButton).toHaveText("Start")

})