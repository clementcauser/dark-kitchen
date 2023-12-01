import { RecipeIngredient, RecipeSheet } from "../types/recipe";

/**
 * Get ingredient total price
 * @param unitPrice number
 * @param quantity number
 * @returns ingredient's unit price * quantity
 */
const getIngredientTotalPrice = (unitPrice: number, quantity: number): number =>
  unitPrice * quantity;

/**
 *  Get recipe cost
 * @param recipeSheet
 * @returns sum of all ingredients + seasoning + fixedCosts
 */
const getRecipeIngredientsTotalCost = (recipeSheet: RecipeSheet): number => {
  const { seasoning, fixedCosts } = recipeSheet;

  const totalIngredients = getAllIngredientsTotalPrice(recipeSheet.ingredients);

  return totalIngredients + seasoning + fixedCosts;
};

/**
 * Get recipe selling price with taxes
 * @param recipeSheet
 * @returns total recipe cost * coefficient
 */
const getSellingPriceWithTaxes = (recipeSheet: RecipeSheet) => {
  const { taxRate } = recipeSheet;

  return getSellingPriceWithoutTaxes(recipeSheet) * (1 + taxRate / 100);
};

/**
 * Get recipe selling price without taxes
 * @param recipeSheet
 * @returns recipe selling price without taxes
 */
const getSellingPriceWithoutTaxes = (recipeSheet: RecipeSheet) => {
  return (
    getRecipeMargin(recipeSheet) + getRecipeIngredientsTotalCost(recipeSheet)
  );
};

/**
 * Get the recipe margin amount
 * @param recipeSheet
 * @returns recipe margin amount
 */
const getRecipeMargin = (recipeSheet: RecipeSheet) => {
  const { marginRate } = recipeSheet;

  return getRecipeIngredientsTotalCost(recipeSheet) * (marginRate / 100);
};

/**
 *  Get recipe array of unique tags
 * @param recipeSheet
 * @returns unique tags based on ingredients names
 */
const getRecipeTags = (recipeSheet: RecipeSheet) => {
  const { ingredients, tags } = recipeSheet;

  const ingredientsNames = ingredients.map((ingredient) => ingredient.name);

  const tagsSet = new Set([...tags, ...ingredientsNames]);

  return Array.from(tagsSet);
};

/**
 * Get the raw cost of all ingredients (without seasoning + fixed costs)
 * @param recipeSheet
 * @returns sum of all ingredients prices
 */
const getAllIngredientsTotalPrice = (ingredients: RecipeIngredient[]) => {
  return ingredients.reduce((prev, curr) => {
    return prev + getIngredientTotalPrice(curr.unitPrice, curr.quantity);
  }, 0);
};

export {
  getIngredientTotalPrice,
  getRecipeMargin,
  getRecipeIngredientsTotalCost,
  getSellingPriceWithTaxes,
  getSellingPriceWithoutTaxes,
  getRecipeTags,
  getAllIngredientsTotalPrice,
};
