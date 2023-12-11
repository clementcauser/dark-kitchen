"use client";

import RecipeSheetForm from "@/components/forms/recipe-sheet";
import { getTextStyle } from "@/components/ui/text";

export default function Page() {
  return (
    <div className="bg-card p-4 rounded-md">
      <div className="mb-6">
        <h1 className={getTextStyle("h1")}>Fiche de recette</h1>
        <p className="text-sm text-muted-foreground w-2/3">
          Cet outil vous permet de concevoir vos recettes et définir le prix de
          vente qui vous semble le plus pertinent. Pour ce faire, ajoutez des
          ingrédients, définissez une marge et la TVA applicable.
        </p>
      </div>

      <RecipeSheetForm onSubmitSuccess={() => console.log("SUBMITTED")} />
    </div>
  );
}
