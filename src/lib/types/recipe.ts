import * as yup from "yup";
import { formErrorMessages } from "../utils/forms";

export interface RecipeIngredient {
  name: string;
  provider: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export const ingredientSchema = yup.object().shape({
  name: yup
    .string()
    .required(formErrorMessages.required("Nom de l'ingrédient")),
  provider: yup.string().required(formErrorMessages.required("Fournisseur")),
  unit: yup.string().required(formErrorMessages.required("Unité")),
  unitPrice: yup
    .number()
    .required(formErrorMessages.required("Coût unitaire HT")),
  quantity: yup.number().required(formErrorMessages.required("Quantité")),
  totalPrice: yup
    .number()
    .required(formErrorMessages.required("Coût de l'ingrédient")),
});

export const TAX_RATES = [5.5, 10, 20];

export interface RecipeSheet {
  title: string;
  ingredients: RecipeIngredient[];
  // sum of all ingredients costs
  ingredientsTotalPrice: number;
  // ingredientsTotalPrice + seasoning + fixedCosts
  totalRecipeCost: number;
  seasoning: number;
  // all the costs extra-food (bags, sauces, etc.)
  fixedCosts: number;
  taxRate: 5.5 | 10 | 20;
  // amount of margin
  margin: number;
  // rate of margin
  marginRate: number;
  // totalRecipeCost * coefficient
  sellingPriceWithoutTaxes: number;
  // totalRecipeCost * coefficient + taxes
  sellingPriceWithTaxes: number;
  // description of the recipe steps
  description?: string;
  // equipment required for the recipe
  equipment?: string;
  // time in seconds
  timeToAchieve?: number;
  // tags for recipes filtering/searching
  tags: string[];
}

export const recipeSchema = yup.object().shape({
  title: yup
    .string()
    .required(formErrorMessages.required("Titre de la recette")),
  fixedCosts: yup
    .number()
    .default(0)
    .required(formErrorMessages.required("Frais fixes")),
  seasoning: yup
    .number()
    .default(0)
    .required(formErrorMessages.required("Coût de l'assaisonnement")),
  totalRecipeCost: yup
    .number()
    .default(0)
    .required(formErrorMessages.required("Coût total de la recette HT")),
  taxRate: yup
    .number()
    .oneOf(TAX_RATES)
    .default(10)
    .required(formErrorMessages.required("TVA")),
  description: yup.string(),
  equipment: yup.string(),
  timeToAchieve: yup.number(),
  ingredients: yup.array().of(ingredientSchema),
  ingredientsTotalPrice: yup
    .number()
    .default(0)
    .required(formErrorMessages.required("Coût total des ingrédients HT")),
  margin: yup
    .number()
    .default(0)
    .required(formErrorMessages.required("Marge brute")),
  marginRate: yup
    .number()
    .default(0)
    .required(formErrorMessages.required("Taux de marge")),
  sellingPriceWithoutTaxes: yup
    .number()
    .default(0)
    .required(formErrorMessages.required("Prix de vente HT")),
  sellingPriceWithTaxes: yup
    .number()
    .default(0)
    .required(formErrorMessages.required("Prix de vente TTC")),
  tags: yup.array().of(yup.string()).default([]),
});
