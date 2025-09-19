import { ICalculatedIngredient } from "../recipe-calculator/recipe-calculator";

export default function Ingredient({ ingredient, amountInGrams }: ICalculatedIngredient) {
    return (
      <div className="w-full flex justify-between">
        <span className="text-base">{ingredient}</span>
        <span className="text-base">{amountInGrams}g</span>
      </div>
    );
  }