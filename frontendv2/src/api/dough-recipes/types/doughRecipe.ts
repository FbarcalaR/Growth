import { IRecipeStep } from "./recipeStep";

export type IDoughRecipe = {
  id: string,
  title: string;
  doughBallWeightInGrams: number;
  steps: IRecipeStep[];
  notes?: string;
};