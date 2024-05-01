const { test, expect } = require('@playwright/test');


test('getSpecific', async ({ page }) => {
  await page.goto('https://www.foodnetwork.com/recipes/michael-chiarello/super-tuscan-white-bean-soup-recipe-1947697');

  // get author
  const authorElement = await page.$('span.o-Attribution__a-Name');  
  const authorName = (await authorElement.textContent()).split('of ')[1];
 
    // get ingredients
  const ingredients = await page.$$eval('.o-Ingredients__a-Ingredient--CheckboxLabel', ingredientsList => {
    return ingredientsList.map(ingredient => ingredient.textContent.trim());
});

  // get instructions
const instructions = await page.$$eval('.o-Method__m-Step', instructionsList => {
  return instructionsList.map(instruction => instruction.textContent.trim());
});

const recipeData = [authorName, ...ingredients, ...instructions];  
// console.log(recipeData)
return recipeData;
});

