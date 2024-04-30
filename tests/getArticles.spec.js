const { test } = require('@playwright/test');

test('get articles', async ({ page }) => {
    try {
        await page.goto('https://www.foodnetwork.com/recipes');

        // Wait for and click the "Load More" button
        const loadMoreButton = await page.waitForSelector('button.o-Capsule__a-Button[data-type="load-more-btn"]');
        await loadMoreButton.click({ timeout: 60000 });

        // Wait for the "Load More" button to disappear
        await page.waitForSelector('button.o-Capsule__a-Button[data-type="load-more-btn"][style="display: none;"]', { state: 'hidden' });

        // Extract article links
        const articleLinks = await page.$$eval('.l-List u-LoadMoreDest', links =>
            links.map(link => link.getAttribute('href'))
        );

        console.log(articleLinks);
    } catch (error) {
        console.error('Error during test:', error);
    }
});