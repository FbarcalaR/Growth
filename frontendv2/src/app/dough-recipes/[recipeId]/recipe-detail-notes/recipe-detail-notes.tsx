import FormInvisibleTextArea from "@/components/form-invisible-text-area/form-invisible-text-area";
import { useState } from "react";

type IProps = {
  initialNotes?: string;
  notesChanged: (notes?: string) => void;
};

export default function RecipeDetailNotes({ initialNotes, notesChanged }: IProps) {
  let [notes, setNotes] = useState(initialNotes);
  
  const handleAddNotes = () => {
    setNotes('New note');
    notesChanged(notes);
  };

  const handleNotesChanged = (notes: string) => {
    notesChanged(notes);
  };

  return (
    <>
        {notes && (
        <div className="w-full flex justify-center">
            <FormInvisibleTextArea
                name="notes"
                withAutoHeight={true}
                className="w-full"
                defaultValue={notes}
                onClick={(e) => e.stopPropagation()}
                onBlur={(e) => handleNotesChanged(e.target.value)}
              />
        </div>
        )}
        {!notes && (
        <div className="w-full flex justify-center cursor-pointer"
            onClick={() => handleAddNotes()}
        >
            <span className="opacity-60 text-base italic">
            + Add notes
            </span>
        </div>
        )}
    </>
  );
}
