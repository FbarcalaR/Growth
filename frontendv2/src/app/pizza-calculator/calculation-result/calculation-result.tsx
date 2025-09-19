import BlockSection from "@/components/block-section/block-section";
import Ingredient from "./ingredient/ingredient";
import { ICalculatedRecipe } from "./recipe-calculator/recipe-calculator";

type IProps = {
  recipe: ICalculatedRecipe;
};

export default function CalculationResult({ recipe }: IProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      {recipe.steps?.map((step) => (
        <BlockSection key={step.title} title={step.title} className="w-full flex flex-col gap-1">
          {step.ingredients.map((ingredient) => (
            <Ingredient
              key={step.title + ingredient.ingredient}
              ingredient={ingredient.ingredient}
              amountInGrams={ingredient.amountInGrams}
            />
            ))}
          {step.restInHours &&
            <div className="w-full flex justify-center">
              <span className="text-base italic">Rest for about {step.restInHours}h</span>
            </div>
          }
        </BlockSection>
      ))}
    </div>
  );
}
