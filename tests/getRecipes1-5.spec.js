const { test } = require('@playwright/test');
const filterRecipesWithSoup = require('./regex');

test('get links 1-5', async ({ page }) => {
    async function scraper() {
        try {
            // Wait for the recipe links to be available
            await page.waitForSelector('.m-PromoList__a-ListItem');
    
            // Extract recipe links from the current page
            const recipeLinks = await page.$$eval('.m-PromoList__a-ListItem a', links => {
                return links.map(link => link.href);
            });
    
            return recipeLinks;
        } catch (error) {
            console.error('Error scraping recipe links:', error);
            return [];
        }
    }

    // Array to store all recipe links from the first 5 pages
    const allRecipeLinks = [];

    // Helper function to navigate to the next page
    async function goToNextPage() {
        try {
            // Wait for the "Next" button to become available
            await page.waitForSelector('.o-Pagination__a-NextButton');
    
            // Get the "Next" button element
            const nextButton = await page.$('.o-Pagination__a-NextButton');
    
            if (nextButton) {
                // Use JavaScript click instead of Playwright's click
                await nextButton.evaluate(button => button.click());
                // await nextButton.click();
                return true;
            } else {
                console.error('Next button not found');
                return false;
            }
        } catch (error) {
            console.error('Error navigating to next page:', error);
            return false;
        }
    }
    // Initial page load
    await page.goto('https://www.foodnetwork.com/recipes/recipes-a-z/s', { timeout: 60000 });
    
    let currentPage = 1;
    while (currentPage <= 5) {
        // Scrape recipe links from the current page
        const recipeLinksOnPage = await scraper();
        allRecipeLinks.push(...recipeLinksOnPage);

        // Navigate to the next page if available
        const nextPageExists = await goToNextPage();
        if (!nextPageExists) {
            console.log(`No more pages available after page ${currentPage}`);
            break;
        }

        currentPage++;
    }

    // console.log('All recipe links:', allRecipeLinks);
    filterRecipesWithSoup(allRecipeLinks);
});