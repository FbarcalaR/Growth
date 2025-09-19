import { IIngredient } from "@/api/dough-recipes/types/ingredient";
import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";

type IProps = {
    ingredient: IIngredient,
    className?: string;
    ingredientChanged?: (ingredient: IIngredient) => void;
}

export default function RecipeDetailIngredient({ ingredient, className, ingredientChanged }: IProps) {
  const handleIngredientChange = (name: string) => {
    ingredientChanged && ingredientChanged({...ingredient, ingredient: name});
  };
  const handleAmountChange = (amountPercentage: string) => {
    ingredientChanged && ingredientChanged({...ingredient, amountPercentage: +amountPercentage});
  };

    return (
      <div className={`w-full flex justify-between ${className}`}>
        <span className="text-base">
            <FormInvisibleInput
              name={`ingredient`}
              type="text"
              defaultValue={ingredient.ingredient}
              onBlur={(ev) => handleIngredientChange(ev.target.value)}
            />
        </span>
        <span className="text-base">
            <FormInvisibleInput
              name={`amountPercentage`}
              className="text-end w-8"
              type="text"
              defaultValue={ingredient.amountPercentage.toString()}
              onBlur={(ev) => handleAmountChange(ev.target.value)}
            />
            %
        </span>
      </div>
    );
  }
