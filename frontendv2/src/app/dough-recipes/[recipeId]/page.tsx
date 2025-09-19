'use client'

import { IDoughRecipe } from "@/api/dough-recipes/types/doughRecipe";
import Title from "@/components/title/title";
import { useEffect, useState } from "react";
import RecipeDetailSteps from "./recipe-detail-steps/recipe-detail-steps";
import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";
import { getDoughRecipe, setDoughRecipe } from '@/api/dough-recipes/handler'; 
import { useParams } from "next/navigation";
import { IRecipeStep } from "@/api/dough-recipes/types/recipeStep";

export default function DoughRecipeDetail() {
  const { recipeId } = useParams<{ recipeId: string }>()
  const [recipe, setRecipe] = useState<IDoughRecipe>();

  useEffect(() => {
    getDoughRecipe(recipeId).then((recipe) => {
      setRecipe(recipe as IDoughRecipe);
    });
  }, [recipeId]);

  const handleStepsChanged = (steps: IRecipeStep[]) => {
    setRecipe(prev => ({id: recipeId, ...prev, steps} as IDoughRecipe));
  };

  const handleNotesChanged = (notes?: string) => {
    setRecipe(prev => ({id: recipeId, ...prev, notes} as IDoughRecipe));
  };

  const handleTitleChanged = (title: string) => {
    setRecipe(prev => ({ id: recipeId, ...prev, title } as IDoughRecipe));
  };

  useEffect(() => {
    if (!recipe) return;

    setDoughRecipe(recipe)
  }, [recipe]);

    return (
      <>
        {recipe && (
          <div className="w-full flex flex-col items-center gap-4">
            <Title className="w-full" titleTemplate={
              <FormInvisibleInput
                name='title'
                type="text"
                defaultValue={recipe.title}
                onChange={(ev) => handleTitleChanged(ev.target.value)}/>
            } />
            <RecipeDetailSteps steps={recipe.steps} notes={recipe.notes} stepsChanged={handleStepsChanged} notesChanged={handleNotesChanged}/>
          </div>
        )}
        {!recipe && <span>Loading...</span>}
      </>
    );
}

