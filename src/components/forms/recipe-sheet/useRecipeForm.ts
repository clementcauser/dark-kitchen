import {
  getAllIngredientsTotalPrice,
  getIngredientTotalPrice,
  getRecipeIngredientsTotalCost,
  getRecipeMargin,
  getSellingPriceWithTaxes,
  getSellingPriceWithoutTaxes,
} from "@/lib/utils/recipes";
import { useCallback, useEffect } from "react";
import { UseFormGetValues, UseFormReturn } from "react-hook-form";
import { RecipeFormValues } from ".";
import { RecipeSheet } from "@/lib/types/recipe";

function roundAmount(amount: number) {
  return +amount.toFixed(2);
}

function convertGetValuesTypes(
  getValues: UseFormGetValues<RecipeFormValues>
): RecipeSheet {
  const values = getValues() as RecipeSheet & {
    seasoning: string;
    fixedCosts: string;
    marginRate: string;
  };

  return {
    ...values,
    seasoning: +values.seasoning,
    fixedCosts: +values.fixedCosts,
    marginRate: +values.marginRate,
    taxRate: +values.taxRate as 5.5 | 10 | 20,
  };
}

export default function useRecipeForm(form: UseFormReturn<RecipeFormValues>) {
  const { getValues, setValue, watch } = form;

  const [
    ingredients,
    ingredientsTotalPrice,
    seasoning,
    fixedCosts,
    marginRate,
    margin,
    sellingPriceWithoutTaxes,
    totalRecipeCost,
    taxRate,
  ] = watch([
    "ingredients",
    "ingredientsTotalPrice",
    "seasoning",
    "fixedCosts",
    "marginRate",
    "margin",
    "sellingPriceWithoutTaxes",
    "totalRecipeCost",
    "taxRate",
  ]);

  const getFormAllIngredientsTotalPrice = useCallback(
    () => getAllIngredientsTotalPrice(ingredients ?? []),
    [ingredients]
  );

  const setFormIngredientTotalPrice = useCallback(
    (index: number) => {
      const unitPrice = getValues(`ingredients.${index}.unitPrice`);
      const quantity = getValues(`ingredients.${index}.quantity`);

      const ingredientTotalPrice = getIngredientTotalPrice(unitPrice, quantity);
      const roundedIngredientTotalPrice = roundAmount(ingredientTotalPrice);

      setValue(`ingredients.${index}.totalPrice`, roundedIngredientTotalPrice);
      setValue("ingredientsTotalPrice", getFormAllIngredientsTotalPrice());
    },
    [getValues, setValue, getFormAllIngredientsTotalPrice]
  );

  const getFormRecipeIngredientsTotalCost = useCallback(() => {
    const values = getValues() as RecipeSheet & {
      fixedCosts: string;
      seasoning: string;
    };

    const recipe = {
      ...values,
      fixedCosts: parseInt(values.fixedCosts, 10),
      seasoning: parseInt(values.seasoning, 10),
    };

    const sellingPriceWithoutTaxes = getRecipeIngredientsTotalCost(recipe);

    return roundAmount(sellingPriceWithoutTaxes);
  }, [getValues]);

  useEffect(() => {
    setValue("totalRecipeCost", getFormRecipeIngredientsTotalCost());
  }, [
    ingredientsTotalPrice,
    seasoning,
    fixedCosts,
    setValue,
    getFormRecipeIngredientsTotalCost,
  ]);

  const getFormRecipeMargin = useCallback(() => {
    const recipe = convertGetValuesTypes(getValues);
    const margin = getRecipeMargin(recipe);

    return roundAmount(margin);
  }, [getValues]);

  const getFormSellingPriceWithoutTaxes = useCallback(() => {
    const recipe = convertGetValuesTypes(getValues);
    const margin = getSellingPriceWithoutTaxes(recipe);

    return roundAmount(margin);
  }, [getValues]);

  const getFormSellingPriceWithTaxes = useCallback(() => {
    const recipe = convertGetValuesTypes(getValues);
    const margin = getSellingPriceWithTaxes(recipe);

    return roundAmount(margin);
  }, [getValues]);

  useEffect(() => {
    setValue(
      "ingredientsTotalPrice",
      getAllIngredientsTotalPrice(ingredients ?? [])
    );
  }, [ingredients, setValue]);

  useEffect(() => {
    setValue("margin", getFormRecipeMargin());
  }, [marginRate, totalRecipeCost, setValue, getFormRecipeMargin]);

  useEffect(() => {
    setValue("sellingPriceWithoutTaxes", getFormSellingPriceWithoutTaxes());
  }, [margin, setValue, getFormSellingPriceWithoutTaxes]);

  useEffect(() => {
    setValue("sellingPriceWithTaxes", getFormSellingPriceWithTaxes());
  }, [
    sellingPriceWithoutTaxes,
    taxRate,
    setValue,
    getFormSellingPriceWithTaxes,
  ]);

  return {
    getAllIngredientsTotalPrice: getFormAllIngredientsTotalPrice,
    setIngredientTotalPrice: setFormIngredientTotalPrice,
    getRecipeIngredientsTotalCost: getFormRecipeIngredientsTotalCost,
  };
}
