const { test } = require('@playwright/test');
const filterRecipesWithSoup = require('./regex');

test('get articles', async ({ page }) => {
    try {
        await page.goto('https://www.foodnetwork.com/recipes');

        // Wait for and click the "Load More" button
        const loadMoreButton = await page.waitForSelector('button.o-Capsule__a-Button[data-type="load-more-btn"]', { state: 'visible' });
        await loadMoreButton.evaluate(button => button.click());
        // Wait for the "Load More" button to disappear
        await page.waitForSelector('button.o-Capsule__a-Button[data-type="load-more-btn"][style="display: none;"]', { state: 'hidden' });
        await page.waitForSelector('div#internationalModal', { state: 'hidden', timeout: 10000 }).catch(() => {});

        // Extract article links
        const articleLinks = await page.$$eval('.m-MediaBlock__a-Headline a', links =>
        links.map(link => link.getAttribute('href'))
    );
    
    filterRecipesWithSoup(articleLinks);

    } catch (error) {
        console.error('Error during test:', error);
    }
});