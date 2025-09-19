"use client";
import MainButton from "@/components/main-button/main-button";
import CalculationForm from "./calculation-form/calculation-form";
import CalculationResult from "./calculation-result/calculation-result";
import { useEffect, useState } from "react";
import { IDoughRecipe } from "@/api/dough-recipes/types/doughRecipe";
import { RecipeCalculator, ICalculatedRecipe } from "./calculation-result/recipe-calculator/recipe-calculator";
import { getAllDoughRecipes } from "@/api/dough-recipes/handler";
import { Option } from "@/components/form-select/form-select";
import { useRouter } from "next/navigation";
import { saveNewDiaryEntryFromCalculator } from "@/api/diary/handler";

export default function PizzaCalculator() {
  const router = useRouter();
  const [calculatedRecipe, setCalculatedRecipe] = useState<ICalculatedRecipe | undefined>();
  const [doughRecipeOptions, setDoughRecipeOptions] = useState<Option[]>([]);
  const [doughRecipes, setDoughRecipes] = useState<IDoughRecipe[]>([]);
  const [formValues, setFormValues] = useState({
    doughBallsAmount: 1,
    recipeId: doughRecipes ? doughRecipes[0]?.id : undefined,
  });

  const handleFormChanged = (newValues: {
    doughBallsAmount?: any;
    recipeId?: any;
  }) => {
    setFormValues((prevValues) => ({...prevValues, ...newValues}));    
  };

  const handleNewDiaryEntry = () => {
    let body = `${calculatedRecipe?.title} - ${calculatedRecipe?.doughBallWeightInGrams}g balls\n`;
    calculatedRecipe?.steps.forEach(step => {
      body += `${step.title}\n`
      step.ingredients.forEach(ingredient => {
        body += `${ingredient.ingredient}    ${ingredient.amountInGrams}g\n`
      });
      if (step.restInHours)
        body += `Rest for ${step.restInHours} hours\n`;
      body += '\n';
    });
    saveNewDiaryEntryFromCalculator(body)
      .then((id) => router.push(`/diary/${id}`));
  };

  useEffect(() => {
    const recipe = doughRecipes?.find(recipe => recipe.id === formValues.recipeId);
    if(!recipe) return;
    const calculatedRecipe = new RecipeCalculator(recipe, +formValues.doughBallsAmount);
    setCalculatedRecipe(calculatedRecipe.recipe);
  }, [doughRecipes, formValues]);

  useEffect(() => {
    getAllDoughRecipes().then(recipes => {
      setDoughRecipes(recipes as IDoughRecipe[]);
      setDoughRecipeOptions((recipes ?? []).map(r => ({
        value: r.id,
        label: r.title,
      })));
      setFormValues({
        doughBallsAmount: 1,
        recipeId: recipes ? recipes[0]?.id : undefined,
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-7">
      <CalculationForm
        recipeOptions={doughRecipeOptions}
        onFormChange={handleFormChanged}
        defaultValues={{doughBallsAmount: 1, recipeId: doughRecipes ? doughRecipes[0]?.id : '0' }}
      ></CalculationForm>

      {calculatedRecipe && <CalculationResult recipe={calculatedRecipe} />}

      <div className="pt-4 w-1/3 min-w-min">
        <MainButton onClick={() => handleNewDiaryEntry()}>
          <span className="text-nowrap">Add new diary entry</span>
        </MainButton>
      </div>

    </div>
  );
}
