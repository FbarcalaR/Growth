"use client";

import BlockSection from "@/components/block-section/block-section";
import FormInvisibleTextArea from "@/components/form-invisible-text-area/form-invisible-text-area";

type IProps = {
    notes?: string;
};

export default function PizzaRecipeNotes({ notes }: IProps) {
    return (
        <BlockSection className="w-full" title="Notes">
            <FormInvisibleTextArea
                name="notes"
                withAutoHeight={true}
                className="w-full"
                defaultValue={notes}
            />
        </BlockSection>
    );
}
