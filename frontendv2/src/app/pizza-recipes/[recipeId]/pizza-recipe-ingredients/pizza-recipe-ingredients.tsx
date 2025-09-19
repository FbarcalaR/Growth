"use client";

import BlockSection from "@/components/block-section/block-section";
import FormInvisibleTextArea from "@/components/form-invisible-text-area/form-invisible-text-area";

type IProps = {
    ingredients?: string;
};

export default function PizzaRecipeIngredients({ ingredients }: IProps) {
    return (
        <BlockSection className="w-full" title="Ingredients" >
            <FormInvisibleTextArea
                name='ingredients'
                withAutoHeight={true}
                className="w-full"
                defaultValue={ingredients}
            />
        </BlockSection>
    );
}
