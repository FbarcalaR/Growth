import BlockSection from "@/components/block-section/block-section";
import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";
import RecipeDetailIngredientsList from "../recipe-detail-ingredients-list/recipe-detail-ingredients-list";
import RecipeDetailRestingTime from "../recipe-detail-resting-time/recipe-detail-resting-time";
import RecipeDetailNotes from "../recipe-detail-notes/recipe-detail-notes";
import { IIngredient } from "@/api/dough-recipes/types/ingredient";
import { IRecipeStep } from "@/api/dough-recipes/types/recipeStep";

type IProps = {
  steps?: IRecipeStep[];
  notes?: string;
  stepsChanged?: (steps: IRecipeStep[]) => void;
  notesChanged?: (notes?: string) => void;
};

export default function RecipeDetailSteps({ steps, notes, stepsChanged, notesChanged }: IProps) {
  const handleAddStep = () => {
    if (!steps)
      steps = [];
    steps.push({
      ingredients: [],
      title: "new step",
    });
    stepsChanged && stepsChanged(steps!)
  };

  const handleIngredientsChanged = (index: number, ingredients: IIngredient[]) => {
    if (!steps)
      steps = [];
    steps[index].ingredients = ingredients;
    stepsChanged && stepsChanged(steps!)
  }

  const handleHoursChanged = (index: number, hours: number) => {
    if (!steps)
      steps = [];
    steps[index].restInHours = hours;
    stepsChanged && stepsChanged(steps!)
  }

  const handleStepTitleChanged = (index: number, title: string) => {
    if (!steps)
      steps = [];
    steps[index].title = title;
    stepsChanged && stepsChanged(steps!)
  }

  const handleStepRemoval = (indexToRemove: number) => {
    if (!steps)
      steps = [];
    steps = steps.filter((_, index) => index !== indexToRemove);
    stepsChanged && stepsChanged(steps!)
  }

  return (
    <>
    <div className="w-full flex flex-col gap-4">
      {steps?.map((step, i) => (
        <BlockSection
          key={step.title}
          bodyClassName="flex flex-col gap-1"
          onRemove={() => handleStepRemoval(i)}
          titleTemplate={
            <FormInvisibleInput
              name='title'
              type="text"
              defaultValue={step.title}
              onClick={(e) => e.stopPropagation()}
              onBlur={(e) => handleStepTitleChanged(i, e.target.value)}
            />
          }
          className="w-full flex flex-col gap-2"
        >
            <RecipeDetailIngredientsList step={step} ingredientsChanged={(ingredients) => handleIngredientsChanged(i, ingredients)}/>
            <RecipeDetailRestingTime initialRestInHours={step.restInHours} hoursChanged={(hours) => handleHoursChanged(i, hours)}/>
        </BlockSection>
      ))}

      <div className="w-full flex justify-center cursor-pointer"
          onClick={() => handleAddStep()}
      >
          <span className="opacity-60 text-base italic">
          + Add step
          </span>
      </div>

      <RecipeDetailNotes
        initialNotes={notes}
        notesChanged={(newNotes) => notesChanged && notesChanged(newNotes)}
      />
    </div>
    </>
  );
}
