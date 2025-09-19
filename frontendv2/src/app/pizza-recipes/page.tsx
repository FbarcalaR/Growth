"use client";
import { getAllPizzaRecipes, removePizzaRecipe, setPizzaRecipe } from "@/api/pizza-recipes/handler";
import { IPizzaRecipe } from "@/api/pizza-recipes/types/pizzaRecipe";
import MainButton from "@/components/main-button/main-button";
import Title from "@/components/title/title";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";

export default function PizzaRecipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<IPizzaRecipe[]>([]);

  const handleRemoveRecipe = (event: MouseEvent, recipeId: string) => {
    event.stopPropagation();
    
    removePizzaRecipe(recipeId).then(() => fetchRecipes());
  };

  const handleNewRecipe = () => {
    const id = (recipes.length +1).toString();
    setPizzaRecipe({ id, title: 'new recipe' })
      .then(() => fetchRecipes());
  };

  const fetchRecipes = () => {
    getAllPizzaRecipes().then(recipes => {
      setRecipes(recipes as IPizzaRecipe[]);
    });
  }

  useEffect(() => fetchRecipes(), []);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {recipes && recipes.map((recipe) => (
        <div key={recipe.id} className="w-full flex flex-col gap-4">
          <Title
            className="cursor-pointer"
            title={recipe.title}
            icon={
              <BiTrash
                onClick={(e) => handleRemoveRecipe(e, recipe.id)}
                className="absolute top-0 right-1 mt-auto mb-auto cursor-pointer"
              />
            }
            onClick={() => router.push(`/pizza-recipes/${recipe.id}`)}
          />
        </div>
      ))}

      <div className="pt-4 w-1/3 min-w-min">
        <MainButton onClick={() => handleNewRecipe()}>
          <span className="text-nowrap">Add new recipe</span>
        </MainButton>
      </div>
    </div>
  );
}
