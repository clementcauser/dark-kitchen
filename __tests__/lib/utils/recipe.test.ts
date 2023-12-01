import { RecipeSheet } from "@/lib/types/recipe";
import {
  getAllIngredientsTotalPrice,
  getIngredientTotalPrice,
  getRecipeIngredientsTotalCost,
  getRecipeMargin,
  getRecipeTags,
  getSellingPriceWithTaxes,
  getSellingPriceWithoutTaxes,
} from "@/lib/utils/recipes";

const RECIPE: RecipeSheet = {
  title: "Test recipe",
  description: "This is my test recipe description",
  equipment: "Saucepan",
  timeToAchieve: 12,
  ingredients: [
    {
      name: "tomatoes",
      provider: "Walmart",
      quantity: 2,
      unit: "kg",
      unitPrice: 1.3,
      totalPrice: 2.6,
    },
    {
      name: "pasta",
      provider: "Barilla",
      quantity: 0.3,
      unit: "kg",
      unitPrice: 3.3,
      totalPrice: 0.99,
    },
  ],
  ingredientsTotalPrice: 3.59,
  fixedCosts: 0.45,
  seasoning: 0.5,
  totalRecipeCost: 4.54,
  marginRate: 50,
  margin: 2.27,
  taxRate: 10,
  sellingPriceWithoutTaxes: 6.81,
  sellingPriceWithTaxes: 7.49,
  tags: ["tomatoes", "pasta"],
};

describe("utils/recipes", () => {
  test("getIngredientTotalPrice should multiply unitPrice and quantity", () => {
    const { quantity, unitPrice, totalPrice } = RECIPE.ingredients[0];

    const ingredientTotalPrice = getIngredientTotalPrice(unitPrice, quantity);

    const expectedResult = 2.6;
    expect(ingredientTotalPrice).toBe(expectedResult);

    // 1.3 * 2 = 2.6
    expect(expectedResult).toBe(totalPrice);
  });

  test("getAllIngredientsTotalPrice should be equal to the sum of all ingredients total price", () => {
    const { ingredients } = RECIPE;

    const expectedResult = ingredients.reduce((prev, curr) => {
      return prev + curr.totalPrice;
    }, 0);

    expect(getAllIngredientsTotalPrice(RECIPE.ingredients)).toBe(
      expectedResult
    );
  });

  test("getRecipeIngredientsTotalCost should be equal to ingredientTotalPrice + fixedCosts + seasoning", () => {
    const { fixedCosts, seasoning, totalRecipeCost, ingredientsTotalPrice } =
      RECIPE;

    const recipeTotalCost = getRecipeIngredientsTotalCost(RECIPE);

    const expectedResult = ingredientsTotalPrice + fixedCosts + seasoning;

    expect(recipeTotalCost).toBe(expectedResult);
    expect(recipeTotalCost).toBe(totalRecipeCost);
  });

  test("getRecipeMargin should return the margin depending on ingredients cost + margin rate", () => {
    const { marginRate, totalRecipeCost, margin } = RECIPE;

    const expectedResult = totalRecipeCost * (marginRate / 100);

    expect(expectedResult).toBe(margin);
    expect(getRecipeMargin(RECIPE)).toBe(expectedResult);
  });

  test("getSellingPriceWithoutTaxes should return recipeTotalCost with margin", () => {
    const { sellingPriceWithoutTaxes, totalRecipeCost, margin } = RECIPE;

    const expectedResult = +(totalRecipeCost + margin).toFixed(2);

    expect(expectedResult).toBe(sellingPriceWithoutTaxes);
    expect(sellingPriceWithoutTaxes).toBe(
      +getSellingPriceWithoutTaxes(RECIPE).toFixed(2)
    );
  });

  test("getSellingPriceWithTaxes should return the sellingPriceWithoutTaxes + taxes", () => {
    const { sellingPriceWithTaxes, taxRate, sellingPriceWithoutTaxes } = RECIPE;

    const expectedResult = +(
      sellingPriceWithoutTaxes *
      (1 + taxRate / 100)
    ).toFixed(2);

    expect(expectedResult).toBe(sellingPriceWithTaxes);
    expect(sellingPriceWithTaxes).toBe(
      +getSellingPriceWithTaxes(RECIPE).toFixed(2)
    );
  });

  test("getRecipeTags should return an array of all ingredients names", () => {
    const { tags, ingredients } = RECIPE;

    const expectedResult = ingredients.map(({ name }) => name);

    expect(getRecipeTags(RECIPE)).toEqual(expectedResult);
  });
});
