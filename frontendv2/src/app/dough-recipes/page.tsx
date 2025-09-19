"use client";
import { IDoughRecipe } from "@/api/dough-recipes/types/doughRecipe";
import { getAllDoughRecipes, removeDoughRecipe, setDoughRecipe } from "@/api/dough-recipes/handler";
import Title from "@/components/title/title";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import MainButton from "@/components/main-button/main-button";

export default function DoughRecipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<IDoughRecipe[]>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleRemoveRecipe = (event: MouseEvent, recipeId: string) => {
    event.stopPropagation();
    
    removeDoughRecipe(recipeId).then(() => fetchRecipes());
  };

  const handleNewRecipe = () => {
    const id = Math.max(0, ...recipes?.map(r => +r.id));
    setDoughRecipe({ id: (id+1).toString(), title: 'new recipe' })
      .then(() => fetchRecipes());
  };

  const fetchRecipes = () => {
    getAllDoughRecipes().then(recipes => {
      setRecipes(recipes as IDoughRecipe[]);
    });
  }

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
            onClick={() => router.push(`/dough-recipes/${recipe.id}`)}
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
