import FormInvisibleInput from "@/components/form-invisible-input/form-invisible-input";
import { FormEvent, useState } from "react";

type IProps = {
  initialRestInHours?: number;
  hoursChanged?: (hours: number) => void;
};

export default function RecipeDetailRestingTime({initialRestInHours, hoursChanged}: IProps) {
  let [restInHours, setRestInHours] = useState(initialRestInHours);

  const handleAddRestingTime = () => {
    setRestInHours(1);
  };
  
  const handleForm = (ev: FormEvent<HTMLFormElement>) => {
    const rawFormData = new FormData(ev.currentTarget);
    const formData = Object.fromEntries(rawFormData) as any;

    hoursChanged && hoursChanged(formData.restInHours);
  };

  return (
    <>
      {restInHours && (
        <form className="w-full flex justify-center" onChange={(ev) => handleForm(ev)}>
          <span className="text-base italic">
            Rest for about{" "}
            <FormInvisibleInput
              name={`restInHours`}
              className="italic w-5 text-center"
              type="text"
              defaultValue={restInHours.toString()}
              onClick={(e) => e.stopPropagation()}
            />
            h
          </span>
        </form>
      )}
      {!restInHours && (
        <div
          className="w-full flex justify-center cursor-pointer"
          onClick={() => handleAddRestingTime()}
        >
          <span className="opacity-60 text-base italic">
            + Add resting time
          </span>
        </div>
      )}
    </>
  );
}
