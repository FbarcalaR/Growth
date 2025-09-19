import { IIngredient } from "./ingredient";

export type IRecipeStep = {
  title: string;
  ingredients: IIngredient[];
  restInHours?: number;
};
