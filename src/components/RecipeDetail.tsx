import React from "react";
import { useParams } from "react-router";

const RecipeDetail = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  console.log(recipeId);

  return (
    <>
      <h3>đây là {recipeId}</h3>
    </>
  );
};

export default RecipeDetail;
