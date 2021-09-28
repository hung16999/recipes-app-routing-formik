import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Recipe } from "../constants/interfaceRecipe";
import { recipes } from "../constants/recipes";
import FormEdit from "./FormEdit";

const RecipeDetail = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe>();
  const history = useHistory();

  const getRecipe = () => {
    const recipeFinded = recipes.find((recipe) => recipe.id === recipeId);
    if (recipeFinded) {
      setRecipe(recipeFinded);
    }
  };

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const deleteRecipe = () => {
    const recipeIndex = recipes.findIndex((item) => item.id === recipeId);
    recipes.splice(recipeIndex, 1);
    history.push("/recipes");
  };

  return (
    <>
      {recipe && (
        <div>
          <img
            width="300px"
            className="img-thumbnail"
            src={recipe.imageUrl}
            alt=""
          />
          <h3>{recipe.name}</h3>
          <div className="mb-3">{recipe.description}</div>

          <div className="d-flex mb-3">
            <button
              onClick={() => {
                history.push("/shopping-list");
              }}
            >
              Go to Shopping list
            </button>
            <button>Edit</button>
            <button onClick={deleteRecipe}>Delete</button>
          </div>

          {recipe.ingredients.map((ingredient) => (
            <div
              className="border border-dark bg-light p-2 m-2"
              style={{ width: "250px" }}
            >
              {ingredient.name} - {ingredient.quantity}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
