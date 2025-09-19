import { IRecipeStep } from "@/api/dough-recipes/types/recipeStep";
import { useState } from "react";
import RecipeDetailIngredient from "../recipe-detail-ingredient/recipe-detail-ingredient";
import { IIngredient } from "@/api/dough-recipes/types/ingredient";

type IProps = {
    step: IRecipeStep;
    ingredientsChanged: (ingredients: IIngredient[]) => void
  };

export default function RecipeDetailIngredientsList({ step, ingredientsChanged }: IProps) {
  let [ingredients, setIngredients] = useState(step.ingredients);

  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { ingredient: "new ingredient", amountPercentage: 0 },
    ]);
    ingredientsChanged(ingredients);
  };

  const handleIngredientChange = (index: number, updatedIngredient: IIngredient) => {
    setIngredients(prev => {
      prev[index] = updatedIngredient;
      return [...prev];
    });
    ingredientsChanged(ingredients);
  }

  return (
    <>
      {ingredients.map((ingredient, i) => (
        <RecipeDetailIngredient
          key={step.title + ingredient.ingredient + i}
          ingredient={ingredient}
          ingredientChanged={(updatedIngredient) => handleIngredientChange(i, updatedIngredient)}
        />
      ))}

      <div
        className="w-full flex justify-between opacity-60 italic cursor-pointer"
        onClick={() => handleAddIngredient()}
      >
        <span className="text-base">+ Add ingredient</span>
        <span className="text-base">100%</span>
      </div>
    </>
  );
}
