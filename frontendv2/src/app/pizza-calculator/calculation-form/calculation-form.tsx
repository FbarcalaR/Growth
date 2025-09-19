import FormInput from "@/components/form-input/form-input";
import { Option, FormSelect } from "@/components/form-select/form-select";

type IProps = {
    recipeOptions: Option[];
    onFormChange: (values: {doughBallsAmount?: any, recipeId?: any}) => void;
    defaultValues: {doughBallsAmount: number, recipeId: string}
};

export default function CalculationForm({ recipeOptions, onFormChange, defaultValues }: IProps) {
  return (
    <div className="w-full flex flex-col gap-2">
        <FormSelect label='Dough recipe' onChange={(recipeId) => onFormChange({recipeId})} options={recipeOptions} defaultValue={defaultValues.recipeId}/>
        <FormInput label='No. dough balls'onChange={(doughBallsAmount) => onFormChange({doughBallsAmount})} defaultValue={defaultValues.doughBallsAmount.toString()}/>
    </div>
  );
}
