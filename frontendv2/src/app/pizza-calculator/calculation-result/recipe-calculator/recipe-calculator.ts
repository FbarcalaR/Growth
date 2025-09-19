import { IIngredient } from "@/api/dough-recipes/types/ingredient";
import { IDoughRecipe } from "@/api/dough-recipes/types/doughRecipe";
import { IRecipeStep } from "@/api/dough-recipes/types/recipeStep";

export class RecipeCalculator {
  public recipe: ICalculatedRecipe;

  private defaultBallWeight = 280;

  constructor(recipe: IDoughRecipe, amountOfDoughBalls: number) {
    const allIngredientPercentages = recipe.steps
      ?.flatMap((step) => step.ingredients.map((i) => i.amountPercentage))
      .reduce((p, c) => p + c, 0)
      / 100;

    const ballWeight = recipe.doughBallWeightInGrams ?? this.defaultBallWeight;
    const totalFlourInGrams = (ballWeight * amountOfDoughBalls) / allIngredientPercentages;

    this.recipe = this.mapToCalculatedRecipe(recipe, totalFlourInGrams);
    this.recipe.doughBallWeightInGrams = ballWeight;
  }

  private mapToCalculatedRecipe(
    recipe: IDoughRecipe,
    totalFlourInGrams: number
  ): ICalculatedRecipe {
    return {
      title: recipe.title,
      doughBallWeightInGrams: recipe.doughBallWeightInGrams,
      steps: recipe.steps?.map((s) =>
        this.mapToCalculatedStep(s, totalFlourInGrams)
      ),
    };
  }

  private mapToCalculatedStep(
    step: IRecipeStep,
    totalFlour: number
  ): ICalculatedRecipeStep {
    return {
      title: step.title,
      restInHours: step.restInHours,
      ingredients: step.ingredients.map((i) =>
        this.mapToCalculatedRecipeIngredient(i, totalFlour)
      ),
    };
  }

  private mapToCalculatedRecipeIngredient(
    ingredient: IIngredient,
    totalFlour: number
  ): ICalculatedIngredient {
    const amountInGrams = totalFlour * (ingredient.amountPercentage / 100);
    let roundedAmount = amountInGrams;
    if (amountInGrams > 850)
      roundedAmount = Math.round(amountInGrams / 10) * 10;
    else if (amountInGrams > 100) roundedAmount = Math.round(amountInGrams);
    else roundedAmount = Math.round(amountInGrams * 10) / 10;

    return {
      ingredient: ingredient.ingredient,
      amountInGrams: roundedAmount,
    };
  }
}

export type ICalculatedRecipe = {
  title: string;
  doughBallWeightInGrams: number;
  steps: ICalculatedRecipeStep[];
};

export type ICalculatedRecipeStep = {
  title: string;
  ingredients: ICalculatedIngredient[];
  restInHours?: number;
};

export type ICalculatedIngredient = {
  ingredient: string;
  amountInGrams: number;
};
